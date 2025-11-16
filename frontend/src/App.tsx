import { useState } from "react";
import "./App.css";

import {
    Button,
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

    return (
        <>
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
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
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
                        {filteredProduse.map((produs) => (
                            <TableRow key={produs.getId()}>
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
