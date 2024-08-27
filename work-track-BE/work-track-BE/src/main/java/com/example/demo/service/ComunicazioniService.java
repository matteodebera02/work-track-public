package com.example.demo.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.example.demo.dto.ComunicazioniDto;
import com.example.demo.entity.ComunicazioniEntity;
import com.example.demo.exception.WorkTrackServiceException;
import com.example.demo.mapper.ComunicazioniMapper;
import com.example.demo.repository.ComunicazioniRepository;

@Service
public class ComunicazioniService {

	@Autowired
	private ComunicazioniRepository comRepo;
	
	
	public ComunicazioniDto save(ComunicazioniDto newCom) {
		comRepo.save(ComunicazioniMapper.toDto(newCom));
		return newCom;
	}

	public List<ComunicazioniDto> findAll() {
        List<ComunicazioniEntity> listaEntity = comRepo.findAll();
        return listaEntity.stream()
                .map(ComunicazioniMapper::toDto) // Converti ogni entità in un DTO utilizzando il mapper
                .collect(Collectors.toList()); // Raccogli i risultati in una lista
    }

	  public ComunicazioniDto deleteById(Long id) {
	        ComunicazioniEntity entityToDelete = comRepo.findById(id)
	                .orElseThrow(() -> new WorkTrackServiceException("La comunicazione con ID " + id + " non è stata trovata", HttpStatus.NOT_FOUND));

	        comRepo.deleteById(id);
	        
	        return ComunicazioniMapper.toDto(entityToDelete);
	    }

}
