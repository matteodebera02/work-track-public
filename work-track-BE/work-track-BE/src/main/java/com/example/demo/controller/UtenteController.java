package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.UtenteDto;
import com.example.demo.entity.UtenteEntity;
import com.example.demo.service.UtenteService;

@RestController
@RequestMapping("/utenti")
public class UtenteController {
	@Autowired
	UtenteService utenteService;

	@GetMapping("/find-all")
	public ResponseEntity<List<UtenteEntity>> findAll() {
		List<UtenteEntity> utenti = utenteService.findAll();
		return new ResponseEntity<>(utenti, HttpStatus.OK);
	}

	@GetMapping("find-by-id/{id}")
	public ResponseEntity<UtenteEntity> findById(@PathVariable Long id) {
		UtenteEntity utente = utenteService.findById(id);
		return new ResponseEntity<>(utente, HttpStatus.OK);
	}

	@PostMapping("save")
	public ResponseEntity<UtenteEntity> save(@RequestBody UtenteEntity utente) {
		UtenteEntity savedUtente = utenteService.save(utente);
		return new ResponseEntity<>(savedUtente, HttpStatus.CREATED);
	}

	@GetMapping("delete-by-id/{id}")
	public ResponseEntity<UtenteEntity> deleteById(@PathVariable Long id) {
		UtenteEntity entity =  utenteService.deleteById(id);
		return new ResponseEntity<UtenteEntity>(entity, HttpStatus.OK);
	}

	// metodo che al login controlla se l utente è registrato
	@PostMapping("/login")
	public ResponseEntity<UtenteDto> login(@RequestBody UtenteDto utente) {
		UtenteDto utenteDto = utenteService.login(utente);
		return new ResponseEntity<UtenteDto>(utenteDto, HttpStatus.OK);
	}
	
	// metodo di registrazione dell utente 
		@PostMapping("/register")
		public ResponseEntity<UtenteDto> register(@RequestBody UtenteDto utente) {
			UtenteDto utenteDto = utenteService.register(utente);
			return new ResponseEntity<UtenteDto>(utenteDto, HttpStatus.OK);
		}
		
		// metodo di edit dell utente 
				@PostMapping("/edit")
				public ResponseEntity<UtenteDto> edit(@RequestBody UtenteDto utente) {
					UtenteDto utenteDto = utenteService.updateProfile(utente);
					return new ResponseEntity<UtenteDto>(utenteDto, HttpStatus.OK);
				}
		
		// metodo che mi trova l utente dato l'email 
		@GetMapping("/find-by-email/{email}")
		public ResponseEntity<UtenteDto> findByEmail(@PathVariable String email) {
		    UtenteDto utente = utenteService.findByEmail(email);
		    if (utente != null) {
		        return new ResponseEntity<>(utente, HttpStatus.OK);
		    } else {
		        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		    }
		}
		
		// metodo che mi restiuisce tutti gli utenti che devono essere acettati ù
		@GetMapping("/find-all-not-acept-user")
		public ResponseEntity<List<UtenteDto>> getAllNotAceptUser(){
			List<UtenteDto> listaUtenti = utenteService.getAllNotAceptUser();
			return new ResponseEntity<List<UtenteDto>>(listaUtenti, HttpStatus.OK);
		}
		
		// metodo che mi setta l utente ad acettato 
		@GetMapping("/acept-user/{id}")
		public ResponseEntity<UtenteDto> aceptUser(@PathVariable Long id){
			UtenteDto utenteDto = utenteService.acceptUser(id);
			return new ResponseEntity<UtenteDto>(utenteDto, HttpStatus.OK);
		}
	
	
}
