CREATE TABLE IF NOT EXISTS produse (
    id SERIAL PRIMARY KEY,
    nume VARCHAR(128) NOT NULL,
    descriere TEXT,
    categorie VARCHAR(128),
    subcategorie VARCHAR(128),
    nume_vanzator VARCHAR(128),
    pret NUMERIC(10, 2) CHECK (pret >= 0),
    cantitate INTEGER CHECK (cantitate >= 0)
);
