import { useState } from "react";
import "./App.css";

import {
    Button,
    Stack,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";

import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";

import Slider from "@mui/material/Slider";

import Box from "@mui/material/Box";

import Produs from "./model/Produs";

import { useEffect } from "react";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { Checkbox } from "@mui/material";
import AddProdusForm from "./components/AddProdusForm";

function App() {
    const [produse, setProduse] = useState<Produs[]>([]);
    const [filteredProduse, setFilteredProduse] = useState<Produs[]>([]);

    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(1000);
    const [priceRange, setPriceRange] = useState<number[]>([0, 1000]);

    async function getProduse() {
        const response = await fetch("http://localhost:8080/produse", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
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
        setFilteredProduse(produse);

        let minPrice = 9999999999;
        let maxPrice = 0;

        for (const produs of produse) {
            const price = produs.getPret();

            minPrice = price < minPrice ? price : minPrice;
            maxPrice = price > maxPrice ? price : maxPrice;
        }

        setMinPrice(minPrice);
        setMaxPrice(maxPrice);
        setPriceRange([minPrice, maxPrice]);
    }

    const MIN_DISTANCE = 25;
    const MIN_PRICE_INDEX = 0;
    const MAX_PRICE_INDEX = 1;

    const handlePriceRangeChange = (
        event: Event,
        newPriceRange: number[],
        activeThumb: number
    ) => {
        let [low, high] = newPriceRange;

        if (activeThumb === 0) {
            // left thumb
            low = Math.min(low, high - MIN_DISTANCE);
        } else {
            // right thumb
            high = Math.max(high, low + MIN_DISTANCE);
        }

        setPriceRange([low, high]);
    };

    function valuetext(value: number) {
        return `${value}°C`;
    }

    function filterProduseByPriceRange() {
        const filteredProduse: Produs[] = produse.filter(
            (produs) =>
                produs.getPret() >= priceRange[MIN_PRICE_INDEX] &&
                produs.getPret() <= priceRange[MAX_PRICE_INDEX]
        );

        setFilteredProduse(filteredProduse);
    }

    useEffect(() => {
        getProduse();
    }, []);

    const [selectedProduseIds, setSelectedProduseIds] = useState<string[]>([]);

    const handleSelectRow = (id: string) => {
        setSelectedProduseIds((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    };

    const handleSelectAllRows = (checked: boolean) => {
        if (checked) {
            setSelectedProduseIds(
                filteredProduse.map((produs) => produs.getId())
            );
        } else {
            setSelectedProduseIds([]);
        }
    };

    async function postProdus(
        nume: string,
        descriere: string,
        categorie: string,
        subcategorie: string,
        numeVanzator: string,
        pret: number,
        cantitate: number
    ) {
        const response = await fetch("http://localhost:8080/produse", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nume: nume,
                descriere: descriere,
                categorie: categorie,
                subcategorie: subcategorie,
                numeVanzator: numeVanzator,
                pret: pret,
                cantitate: cantitate,
            }),
        });

        const data = response.json;

        console.log(data);

        getProduse();
    }

    const [addProdusFormVisibility, setAddProdusFormVisibility] =
        useState(false);

    function toggleProdusFormVisibility() {
        setAddProdusFormVisibility(!addProdusFormVisibility);
    }

    return (
        <>
            <AddProdusForm
                open={addProdusFormVisibility}
                onAdd={postProdus}
                onClose={toggleProdusFormVisibility}
            />
            <Stack direction={"column"} spacing={8}>
                <Box
                    sx={{
                        width: "100%",
                        display: "inline-flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Button variant="contained" startIcon={<DeleteIcon />}>
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
                        display: "inline-flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Typography>Pret</Typography>
                    <Slider
                        min={minPrice}
                        max={maxPrice}
                        getAriaLabel={() => "Price range"}
                        value={priceRange}
                        onChange={handlePriceRangeChange}
                        valueLabelDisplay="on"
                        getAriaValueText={valuetext}
                        disableSwap
                        sx={{ width: "80%" }}
                    />
                    <Button onClick={filterProduseByPriceRange}>Filter</Button>
                </Box>
            </Stack>
            <TableContainer
                sx={{
                    mt: 4,
                    borderRadius: 2,
                    boxShadow: 3,
                    maxHeight: "60vh", // keeps table scrollable if too many rows
                    overflowY: "auto",
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
                                    // indeterminate={
                                    //     selectedProduseIds.length > 0 &&
                                    //     selectedProduseIds.length <
                                    //         filteredProduse.length
                                    // }
                                    onChange={(e) =>
                                        handleSelectAllRows(e.target.checked)
                                    }
                                />
                            </TableCell>
                            <TableCell
                                align="center"
                                sx={{ fontWeight: "bold", color: "#000" }}
                            >
                                Nume
                            </TableCell>
                            <TableCell
                                align="center"
                                sx={{ fontWeight: "bold", color: "#000" }}
                            >
                                Descriere
                            </TableCell>
                            <TableCell
                                align="center"
                                sx={{ fontWeight: "bold", color: "#000" }}
                            >
                                Categorie
                            </TableCell>
                            <TableCell
                                align="center"
                                sx={{ fontWeight: "bold", color: "#000" }}
                            >
                                Subcategorie
                            </TableCell>
                            <TableCell
                                align="center"
                                sx={{ fontWeight: "bold", color: "#000" }}
                            >
                                Nume Vanzator
                            </TableCell>
                            <TableCell
                                align="center"
                                sx={{ fontWeight: "bold", color: "#000" }}
                            >
                                Pret
                            </TableCell>
                            <TableCell
                                align="center"
                                sx={{ fontWeight: "bold", color: "#000" }}
                            >
                                Cantitate
                            </TableCell>
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
                                    cursor: "pointer",
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
