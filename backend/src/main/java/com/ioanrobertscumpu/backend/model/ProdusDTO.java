package com.ioanrobertscumpu.backend.model;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class ProdusDTO {
    @NotBlank
    private String nume;
    private String descriere;
    @Size(max = 128)
    private String categorie;
    @Size(max = 128)
    private String subcategorie;
    @Size(max = 128)
    private String numeVanzator;
    @Min(0)
    private Double pret;
    @Min(0)
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
