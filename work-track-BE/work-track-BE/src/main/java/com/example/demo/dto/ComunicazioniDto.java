package com.example.demo.dto;

import com.example.demo.entity.UtenteEntity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ComunicazioniDto {

	private Long id;
	private String data;
	private String titolo;
	private String descrizione;
    private UtenteDto utente;
}
