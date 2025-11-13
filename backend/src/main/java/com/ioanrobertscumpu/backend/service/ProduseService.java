package com.ioanrobertscumpu.backend.service;

import org.springframework.stereotype.Service;

import com.ioanrobertscumpu.backend.repository.ProduseRepository;

import java.util.List;
import com.ioanrobertscumpu.backend.model.Produs;

@Service
public class ProduseService {
    private ProduseRepository produseRepository;

    public ProduseService(ProduseRepository produseRepository) {
        this.produseRepository = produseRepository;
    }

    public List<Produs> getProduse() {
        return produseRepository.findAll();
    }

    public Produs addProdus(Produs produs) {
        return produseRepository.save(produs);
    }
}
