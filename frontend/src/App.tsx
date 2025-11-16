import { useEffect, useState } from "react";
import "./App.css";

import {
    Box,
    Button,
    Checkbox,
    Slider,
    Stack,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";

import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

import AddProdusForm from "./components/AddProdusForm";
import Produs from "./model/Produs";

function App() {
    const MIN_DISTANCE = 25;
    const MIN_PRICE_INDEX = 0;
    const MAX_PRICE_INDEX = 1;

    const [produse, setProduse] = useState<Produs[]>([]);
    const [filteredProduse, setFilteredProduse] = useState<Produs[]>([]);

    const [numeFilter, setNumeFilter] = useState("");
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(1000);
    const [priceRange, setPriceRange] = useState<number[]>([0, 1000]);

    const [selectedProduseIds, setSelectedProduseIds] = useState<string[]>([]);
    const [addProdusFormVisibility, setAddProdusFormVisibility] =
        useState(false);

    async function getProduse() {
        const response = await fetch("http://localhost:8080/produse", {
            method: "GET",
            headers: { Accept: "application/json" },
        });
        const data = await response.json();

        const produse: Produs[] = data.map(
            (item: any) =>
                new Produs(
                    item.id,
                    item.nume,
                    item.descriere,
                    item.categorie,
                    item.subcategorie,
                    item.numeVanzator,
                    item.pret,
                    item.cantitate
                )
        );

        setProduse(produse);

        // Calculate min/max price
        let min = produse.length
            ? Math.min(...produse.map((p) => p.getPret()))
            : 0;
        let max = produse.length
            ? Math.max(...produse.map((p) => p.getPret()))
            : 0;

        setMinPrice(min);
        setMaxPrice(max);
    }

    // TODO put inside an useEffect and erase all other filterProduse calls
    // Filter products by name and price
    function filterProduse(
        list: Produs[] = produse,
        name: string = numeFilter,
        range: number[] = priceRange
    ) {
        const filteredProduse = list.filter(
            (produs) =>
                (name === "" ||
                    produs
                        .getNume()
                        .toLowerCase()
                        .includes(name.toLowerCase())) &&
                produs.getPret() >= range[MIN_PRICE_INDEX] &&
                produs.getPret() <= range[MAX_PRICE_INDEX]
        );

        setFilteredProduse(filteredProduse);
    }

    const handlePriceRangeChange = (
        event: Event,
        newPriceRange: number[],
        activeThumb: number
    ) => {
        let [low, high] = newPriceRange;

        if (activeThumb === 0) low = Math.min(low, high - MIN_DISTANCE);
        else high = Math.max(high, low + MIN_DISTANCE);

        setPriceRange([low, high]);
    };

    const handleNumeFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNumeFilter(e.target.value);
    };

    const valuetext = (value: number) => `${value} RON`;

    const handleSelectRow = (id: string) => {
        setSelectedProduseIds((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    };

    const handleSelectAllRows = (checked: boolean) => {
        if (checked)
            setSelectedProduseIds(filteredProduse.map((p) => p.getId()));
        else setSelectedProduseIds([]);
    };

    const toggleProdusFormVisibility = () =>
        setAddProdusFormVisibility(!addProdusFormVisibility);

    async function postProdus(
        nume: string,
        descriere: string,
        categorie: string,
        subcategorie: string,
        numeVanzator: string,
        pret: number,
        cantitate: number
    ) {
        await fetch("http://localhost:8080/produse", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nume,
                descriere,
                categorie,
                subcategorie,
                numeVanzator,
                pret,
                cantitate,
            }),
        });

        await getProduse();
    }

    async function deleteProdus(id: string) {
        try {
            const res = await fetch(`http://localhost:8080/produse/${id}`, {
                method: "DELETE",
            });
            if (!res.ok) throw new Error(`Failed to delete product ${id}`);
        } catch (err) {
            console.error(err);
        }
    }

    async function deleteSelectedRows() {
        await Promise.all(selectedProduseIds.map((id) => deleteProdus(id)));
        await getProduse();
        setSelectedProduseIds([]);
    }

    useEffect(() => {
        getProduse();
    }, []);

    useEffect(() => {
        filterProduse();
    }, [numeFilter, priceRange, produse]);

    return (
        <>
            <AddProdusForm
                open={addProdusFormVisibility}
                onAdd={postProdus}
                onClose={toggleProdusFormVisibility}
            />

            <Stack direction="column" spacing={8}>
                <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Button
                        variant="contained"
                        startIcon={<DeleteIcon />}
                        onClick={deleteSelectedRows}
                    >
                        Delete
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={toggleProdusFormVisibility}
                    >
                        Add
                    </Button>
                </Box>

                <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mt: 2,
                    }}
                >
                    <input
                        type="text"
                        placeholder="Filter by name..."
                        value={numeFilter}
                        onChange={handleNumeFilterChange}
                        style={{ padding: "6px", fontSize: "16px" }}
                    />

                    <Typography>Pret</Typography>
                    <Typography sx={{ opacity: 0.5 }}>{minPrice}</Typography>
                    <Slider
                        min={minPrice}
                        max={maxPrice}
                        value={priceRange}
                        onChange={handlePriceRangeChange}
                        valueLabelDisplay="on"
                        getAriaValueText={valuetext}
                        disableSwap
                        sx={{ width: "50%" }}
                    />
                    <Typography sx={{ opacity: 0.5 }}>{maxPrice}</Typography>
                </Box>
            </Stack>

            <TableContainer
                sx={{
                    mt: 4,
                    borderRadius: 2,
                    boxShadow: 3,
                    maxHeight: "60vh",
                    overflowY: "auto",
                    overflowX: "auto",
                }}
            >
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Checkbox
                                    checked={
                                        selectedProduseIds.length ===
                                            filteredProduse.length &&
                                        filteredProduse.length > 0
                                    }
                                    onChange={(e) =>
                                        handleSelectAllRows(e.target.checked)
                                    }
                                />
                            </TableCell>
                            <TableCell align="center">Nume</TableCell>
                            <TableCell align="center">Descriere</TableCell>
                            <TableCell align="center">Categorie</TableCell>
                            <TableCell align="center">Subcategorie</TableCell>
                            <TableCell align="center">Nume Vanzator</TableCell>
                            <TableCell align="center">Pret</TableCell>
                            <TableCell align="center">Cantitate</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredProduse.map((produs, index) => (
                            <TableRow
                                key={produs.getId()}
                                sx={{
                                    backgroundColor:
                                        index % 2 === 0 ? "grey.50" : "white",
                                    "&:hover": { backgroundColor: "grey.100" },
                                }}
                            >
                                <TableCell>
                                    <Checkbox
                                        checked={selectedProduseIds.includes(
                                            produs.getId()
                                        )}
                                        onChange={() =>
                                            handleSelectRow(produs.getId())
                                        }
                                    />
                                </TableCell>
                                <TableCell align="center">
                                    {produs.getNume()}
                                </TableCell>
                                <TableCell align="center">
                                    {produs.getDescriere()}
                                </TableCell>
                                <TableCell align="center">
                                    {produs.getCategorie()}
                                </TableCell>
                                <TableCell align="center">
                                    {produs.getSubcategorie()}
                                </TableCell>
                                <TableCell align="center">
                                    {produs.getNumeVanzator()}
                                </TableCell>
                                <TableCell align="center">
                                    {produs.getPret()}
                                </TableCell>
                                <TableCell align="center">
                                    {produs.getCantitate()}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default App;
