import { useState } from "react";
import "./App.css";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";

import Produs from "./model/Produs";

import { useEffect } from "react";

function App() {
    const [count, setCount] = useState(0);

    const [produse, setProduse] = useState<Produs[]>([]);

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
    }

    useEffect(() => {
        getProduse();
    }, []);

    return (
        <>
            <div>
                <a href="https://vite.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                    <img
                        src={reactLogo}
                        className="logo react"
                        alt="React logo"
                    />
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
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
                        {produse.map((produs) => (
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
