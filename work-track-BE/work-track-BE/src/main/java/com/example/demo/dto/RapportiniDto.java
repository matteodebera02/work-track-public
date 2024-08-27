package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RapportiniDto {

	private Long id;

	private String data;

	private String commissionatoDa;

	private String cliente;

	private String telefono;

	private String localita;

	private String descrizione;

	private int ore;
	private int oreNotturne;

	private String annotazioni;

	private UtenteDto utente;

	private Boolean letto;

	private Boolean notturno;

	private int straordinari;

	private int oreViaggio;
}
