package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.ComunicazioniEntity;

@Repository
public interface ComunicazioniRepository extends JpaRepository<ComunicazioniEntity, Long>{

}
