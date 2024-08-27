package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.ComunicazioniDto;
import com.example.demo.service.ComunicazioniService;

@RestController
@RequestMapping("/comunicazioni")
public class ComunicazioniController {

	@Autowired
	private ComunicazioniService comService;

	@PostMapping("/save")
	public ResponseEntity<ComunicazioniDto> save(@RequestBody ComunicazioniDto newCom) {
		ComunicazioniDto savedComunicazione = comService.save(newCom);
		return new ResponseEntity<>(savedComunicazione, HttpStatus.CREATED);
	}

	@GetMapping("/find-all")
    public ResponseEntity<List<ComunicazioniDto>> findAll() {
        List<ComunicazioniDto> listaComunicazioni = comService.findAll();
        return new ResponseEntity<>(listaComunicazioni, HttpStatus.OK);
    }

	@GetMapping("/delete-by-id/{id}")
    public ResponseEntity<ComunicazioniDto> delete(@PathVariable Long id) {
        ComunicazioniDto comunicazioneDaCancellare = comService.deleteById(id);
        return new ResponseEntity<>(comunicazioneDaCancellare, HttpStatus.OK);
    }
}
