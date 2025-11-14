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
    public List<Produs> getProduse() {
        return produseService.getProduse();
    }

    @PostMapping
    public Produs postProdus(@RequestBody Produs produs) {
        return produseService.addProdus(produs);
    }

    // TODO add codes (404)
    @DeleteMapping("/{id}")
    public void deleteProdus(@PathVariable UUID id) {
        produseService.deleteProdus(id);
    }

    // TODO make update return updated entity
    @PutMapping("/{id}")
    public void putProdus(@PathVariable UUID id, @RequestBody ProdusDTO dto) {        
        produseService.updateProdus(id, dto);
    }

    @PatchMapping("/{id}")
    public void patchProdus(@PathVariable UUID id, @RequestBody ProdusDTO dto) {
        produseService.updateProdus(id, dto);
    }
}
