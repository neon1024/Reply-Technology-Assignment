package com.ioanrobertscumpu.backend.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.ioanrobertscumpu.backend.model.Produs;
import com.ioanrobertscumpu.backend.service.ProduseService;

import java.util.List;

@RestController
@RequestMapping("/produse")
public class ProduseController {
    private ProduseService produseService;

    public ProduseController(ProduseService produseService) {
        this.produseService = produseService;
    }

    @GetMapping
    public List<Produs> getProduse() {
        return produseService.getProduse();
    }

    @PostMapping
    public Produs postMethodName(@RequestBody Produs produs) {
        return produseService.addProdus(produs);
    }
}
