package com.ioanrobertscumpu.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.ioanrobertscumpu.backend.model.Produs;
import java.util.UUID;

@Repository
public interface ProduseRepository extends JpaRepository<Produs, UUID> {
}
