package com.example.demo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "rapportini")
public class RapportiniEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String data;

	@Column(name = "commissionato_da")
	private String commissionatoDa;

	private String cliente;

	private String telefono;

	private String localita;

	private String descrizione;

	private int ore;

	@Column(name = "ore_notturne")
	private int oreNotturne;

	@Column(name = "ore_viaggio")
	private int oreViaggio;

	private String annotazioni;

	@ManyToOne
	@JoinColumn(name = "utente_id")
	private UtenteEntity utente;

	private Boolean letto;

	private Boolean notturno;

	private int straordinari;

}
