package com.br.fatec.AGIS.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record MatriculaDto(
		@NotBlank String ra, 
		@NotNull Long codTurma,
		@NotNull int ano,
		@NotNull int semestre
) {

}
