import { Dialog } from "@mui/material";

import Produs from "../model/Produs";

import { useEffect } from "react";

import { useState } from "react";

import { Button, TextField } from "@mui/material";

import { Stack } from "@mui/material";

import { DialogActions, DialogContent, DialogTitle } from "@mui/material";

interface UpdateProdusFormProps {
    open: boolean;
    produs: Produs | null;
    onUpdate: (updatedProdus: Produs) => Promise<void>;
    onClose: () => void;
}

function UpdateProdusForm({
    open,
    produs,
    onUpdate,
    onClose,
}: UpdateProdusFormProps) {
    const [nume, setNume] = useState(produs?.getNume() || "");
    const [descriere, setDescriere] = useState(produs?.getDescriere() || "");
    const [categorie, setCategorie] = useState(produs?.getCategorie() || "");
    const [subcategorie, setSubcategorie] = useState(
        produs?.getSubcategorie() || ""
    );
    const [numeVanzator, setNumeVanzator] = useState(
        produs?.getNumeVanzator || ""
    );
    const [pret, setPret] = useState(produs?.getPret() || "0");
    const [cantitate, setCantitate] = useState(produs?.getCantitate() || "1");

    useEffect(() => {
        if (produs) {
            setNume(produs.getNume());
            setDescriere(produs.getDescriere());
            setCategorie(produs.getCategorie());
            setSubcategorie(produs.getSubcategorie());
            setNumeVanzator(produs.getNumeVanzator());
            setPret(produs.getPret());
            setCantitate(produs.getCantitate());
        }
    }, [produs]);

    const handleSubmit = async () => {
        if (produs) {
            const updated = new Produs(
                produs.getId(),
                nume,
                descriere,
                categorie,
                subcategorie,
                numeVanzator,
                Number(pret),
                Number(cantitate)
            );
            await onUpdate(updated);
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            sx={{
                "& .MuiDialog-paper": {
                    width: 450,
                    maxWidth: "90vw",
                },
            }}
        >
            <DialogTitle>Update Produs</DialogTitle>

            <DialogContent dividers>
                <Stack spacing={2} mt={1}>
                    <TextField
                        label="Nume"
                        value={nume}
                        onChange={(e) => setNume(e.target.value)}
                        fullWidth
                        required
                        size="small"
                    />

                    <TextField
                        label="Descriere"
                        value={descriere}
                        onChange={(e) => setDescriere(e.target.value)}
                        multiline
                        rows={3}
                        fullWidth
                        size="small"
                    />

                    <TextField
                        label="Categorie"
                        value={categorie}
                        onChange={(e) => setCategorie(e.target.value)}
                        fullWidth
                        size="small"
                    ></TextField>

                    <TextField
                        label="Subcategorie"
                        value={subcategorie}
                        onChange={(e) => setSubcategorie(e.target.value)}
                        fullWidth
                        size="small"
                    ></TextField>

                    <TextField
                        label="Nume vanzator"
                        value={numeVanzator}
                        onChange={(e) => setNumeVanzator(e.target.value)}
                        fullWidth
                        size="small"
                    ></TextField>

                    <TextField
                        label="Pret"
                        type="number"
                        value={pret}
                        onChange={(e) => setPret(e.target.value)}
                        fullWidth
                        size="small"
                    />

                    <TextField
                        label="Cantitate"
                        type="number"
                        value={cantitate}
                        onChange={(e) => setCantitate(e.target.value)}
                        fullWidth
                        size="small"
                    />
                </Stack>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button variant="contained" onClick={handleSubmit}>
                    Update
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default UpdateProdusForm;
