package com.ioanrobertscumpu.backend.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ioanrobertscumpu.backend.repository.ProdusRepository;
import com.ioanrobertscumpu.backend.model.Produs;
import com.ioanrobertscumpu.backend.model.ProdusDTO;
import java.util.List;
import java.util.UUID;

@Service
@Transactional
public class ProdusService {
    private ProdusRepository produseRepository;

    public ProdusService(ProdusRepository produseRepository) {
        this.produseRepository = produseRepository;
    }

    public List<Produs> getProduse() {
        return produseRepository.findAll();
    }

    public Produs addProdus(Produs produs) {
        return produseRepository.save(produs);
    }

    public void deleteProdus(UUID id) {
        produseRepository.deleteById(id);
    }

    public int updateProdus(UUID id, ProdusDTO dto) {
        return produseRepository.updateById(
            id,
            dto.getNume(),
            dto.getDescriere(),
            dto.getCategorie(),
            dto.getSubcategorie(),
            dto.getNumeVanzator(),
            dto.getPret(),
            dto.getCantitate()
            );
    }
}
