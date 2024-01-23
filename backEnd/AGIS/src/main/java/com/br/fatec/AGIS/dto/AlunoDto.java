package com.br.fatec.AGIS.dto;

import java.time.LocalDate;
import java.time.Period;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record AlunoDto(
		@NotBlank @Size(max = 11) String cpf,
		@NotBlank @Size(max = 100)String nome,
		@NotBlank @Size(max = 100)String nomeSocial, 
		@NotNull LocalDate dataNasc,
		@NotNull LocalDate dataConc2grau,
		@NotBlank @Size(max = 100) String instConc2grau,
		@NotBlank String emailPessoal,
		@NotNull int ptVestibular,
		@NotNull int posVestibular,
		@NotNull Long codCurso
) {
	public AlunoDto {
		 Period periodo = Period.between(dataNasc, LocalDate.now());
		
		 if (periodo.getYears() < 18) {
			 throw new IllegalArgumentException("Data Inválida");
		 }
	}
}
