class Produs {
    private id: string;
    private nume: string;
    private descriere: string;
    private categorie: string;
    private subcategorie: string;
    private numeVanzator: string;
    private pret: number;
    private cantitate: number;

    public constructor(
        id: string,
        nume: string,
        descriere: string,
        categorie: string,
        subcategorie: string,
        numeVanzator: string,
        pret: number,
        cantitate: number
    ) {
        this.id = id;
        this.nume = nume;
        this.descriere = descriere;
        this.categorie = categorie;
        this.subcategorie = subcategorie;
        this.numeVanzator = numeVanzator;
        this.pret = pret;
        this.cantitate = cantitate;
    }

    public getId(): string {
        return this.id;
    }

    public getNume(): string {
        return this.nume;
    }

    public getDescriere(): string {
        return this.descriere;
    }

    public getCategorie(): string {
        return this.categorie;
    }

    public getSubcategorie(): string {
        return this.subcategorie;
    }

    public getNumeVanzator(): string {
        return this.numeVanzator;
    }

    public getPret(): number {
        return this.pret;
    }

    public getCantitate(): number {
        return this.cantitate;
    }

    public toString(): string {
        return (
            this.nume +
            " " +
            this.descriere +
            " " +
            this.categorie +
            " " +
            this.subcategorie +
            " " +
            this.numeVanzator +
            " " +
            this.pret +
            " " +
            this.cantitate +
            "\n"
        );
    }
}

export default Produs;
