package com.example.demo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.UtenteEntity;

public interface UtenteRepository extends JpaRepository<UtenteEntity, Long> {
	// metodo che trova l utente tramite l email 
	Optional<UtenteEntity> findByEmail(String email);

	List<UtenteEntity> findByActive(boolean active);

}

