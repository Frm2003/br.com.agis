package com.br.fatec.AGIS.dto;

import java.time.LocalDate;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record ChamadaDto(
		@NotNull Long codTurma,
		@NotBlank String ra,
		@NotNull LocalDate data,
		@NotNull int qtdFaltas
) {

}
