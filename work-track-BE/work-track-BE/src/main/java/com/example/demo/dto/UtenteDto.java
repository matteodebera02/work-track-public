package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UtenteDto {

	private Long id;

	private String nome;

	private String cognome;

	private String email;

	private String password;

	private boolean admin;

	private boolean active;
}
