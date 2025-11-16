package com.ioanrobertscumpu.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.ioanrobertscumpu.backend.model.Produs;
import java.util.UUID;

import org.springframework.data.repository.query.Param;

@Repository
public interface ProdusRepository extends JpaRepository<Produs, UUID> {
    @Modifying
    @Query("UPDATE Produs p SET " +
        "p.nume = COALESCE(:nume, p.nume), " +
        "p.descriere = COALESCE(:descriere, p.descriere), " +
        "p.categorie = COALESCE(:categorie, p.categorie), " +
        "p.subcategorie = COALESCE(:subcategorie, p.subcategorie), " +
        "p.numeVanzator = COALESCE(:numeVanzator, p.numeVanzator)," +
        "p.pret = COALESCE(:pret, p.pret), " +
        "p.cantitate = COALESCE(:cantitate, p.cantitate) " +
        "WHERE p.id = :id"
    )
    public int updateById(
        @Param("id") UUID id,
        @Param("nume") String nume,
        @Param("descriere") String descriere,
        @Param("categorie") String categorie,
        @Param("subcategorie") String subcategorie,
        @Param("numeVanzator") String numeVanzator,
        @Param("pret") Double pret,
        @Param("cantitate") Integer cantitate
        );
}
