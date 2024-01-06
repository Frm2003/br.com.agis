package com.br.fatec.AGIS.dto;

import java.time.LocalDate;
import java.time.Period;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record ProfessorDto(
		@NotBlank @Size(max = 11) String cpf,
		@NotBlank @Size(max = 100)String nome, 
		@NotNull LocalDate dataNasc,
		@NotBlank String emailPessoal,
		@NotBlank @Size(max = 30) String titulacao
) {
	public ProfessorDto {
		 Period periodo = Period.between(dataNasc, LocalDate.now());
		
		 if (periodo.getYears() < 18) {
			 throw new IllegalArgumentException("Data Inválida");
		 }
	}
}
