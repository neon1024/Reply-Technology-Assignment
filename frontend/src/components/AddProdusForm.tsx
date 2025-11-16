import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    TextField,
} from "@mui/material";
import { useState } from "react";

interface AddProdusFormProps {
    open: boolean;
    onClose: () => void;
    onAdd: (
        nume: string,
        descriere: string,
        categorie: string,
        subcategorie: string,
        numeVanzator: string,
        pret: number,
        cantitate: number
    ) => Promise<void>;
}

export default function AddProdusForm({
    open,
    onClose,
    onAdd,
}: AddProdusFormProps) {
    const [nume, setNume] = useState("");
    const [descriere, setDescriere] = useState("");
    const [categorie, setCategorie] = useState("");
    const [subcategorie, setSubcategorie] = useState("");
    const [numeVanzator, setNumeVanzator] = useState("");
    const [pret, setPret] = useState("");
    const [cantitate, setCantitate] = useState("1");

    const handleSubmit = async () => {
        await onAdd(
            nume,
            descriere,
            categorie,
            subcategorie,
            numeVanzator,
            Number(pret),
            Number(cantitate)
        );

        setNume("");
        setDescriere("");
        setCategorie("");
        setSubcategorie("");
        setNumeVanzator("");
        setPret("");
        setCantitate("1");
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
            <DialogTitle>Add Produs</DialogTitle>

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
                        required
                        size="small"
                    ></TextField>

                    <TextField
                        label="Subcategorie"
                        value={subcategorie}
                        onChange={(e) => setSubcategorie(e.target.value)}
                        fullWidth
                        required
                        size="small"
                    ></TextField>

                    <TextField
                        label="Nume vanzator"
                        value={numeVanzator}
                        onChange={(e) => setNumeVanzator(e.target.value)}
                        fullWidth
                        required
                        size="small"
                    ></TextField>

                    <TextField
                        label="Pret"
                        type="number"
                        value={pret}
                        onChange={(e) => setPret(e.target.value)}
                        fullWidth
                        required
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
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    );
}
