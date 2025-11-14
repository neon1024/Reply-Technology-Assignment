package com.ioanrobertscumpu.backend.model;

public class ProdusDTO {
    private String nume;
    private String descriere;
    private String categorie;
    private String subcategorie;
    private String numeVanzator;
    private Double pret;
    private Integer cantitate;

    public String getNume() {
        return nume;
    }

    public void setNume(String nume) {
        this.nume = nume;
    }

    public String getDescriere() {
        return descriere;
    }

    public void setDescriere(String descriere) {
        this.descriere = descriere;
    }

    public String getCategorie() {
        return categorie;
    }

    public void setCategorie(String categorie) {
        this.categorie = categorie;
    }

    public String getSubcategorie() {
        return subcategorie;
    }

    public void setSubcategorie(String subcategorie) {
        this.subcategorie = subcategorie;
    }

    public String getNumeVanzator() {
        return numeVanzator;
    }

    public void setNumeVanzator(String numeVanzator) {
        this.numeVanzator = numeVanzator;
    }

    public Double getPret() {
        return pret;
    }

    public void setPret(Double pret) {
        this.pret = pret;
    }

    public Integer getCantitate() {
        return cantitate;
    }

    public void setCantitate(Integer cantitate) {
        this.cantitate = cantitate;
    }
}
