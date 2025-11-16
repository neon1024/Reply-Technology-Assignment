package com.ioanrobertscumpu.backend.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import jakarta.validation.Valid;

import com.ioanrobertscumpu.backend.model.ProdusDTO;
import com.ioanrobertscumpu.backend.model.Produs;
import com.ioanrobertscumpu.backend.service.ProdusService;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/produse")
public class ProdusController {
    private ProdusService produseService;

    public ProdusController(ProdusService produseService) {
        this.produseService = produseService;
    }

    @GetMapping
    public ResponseEntity<List<Produs>> getProduse() {
        List<Produs> produse = produseService.getProduse();
        return ResponseEntity.ok(produse);
    }

    @PostMapping
    public ResponseEntity<Produs> postProdus(@Valid @RequestBody Produs produs) {
        Produs savedProdus = produseService.addProdus(produs);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedProdus);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProdus(@PathVariable UUID id) {
        produseService.deleteProdus(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Integer> putProdus(@PathVariable UUID id, @Valid @RequestBody ProdusDTO dto) {        
        int affectedRows = produseService.updateProdus(id, dto);

        if(affectedRows != 0) {
            return ResponseEntity.ok(affectedRows);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Integer> patchProdus(@PathVariable UUID id, @Valid @RequestBody ProdusDTO dto) {
        int affectedRows = produseService.updateProdus(id, dto);
        
        if(affectedRows != 0) {
            return ResponseEntity.ok(affectedRows);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
