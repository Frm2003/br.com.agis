package com.br.fatec.AGIS.dto;

import java.math.BigDecimal;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record CursoDto(
		@NotBlank @Size(max = 100) String nome,
		@NotNull int cargaHorario,
		@NotBlank @Size(max = 10) String sigla,
		@DecimalMin(value = "0.00", inclusive = false) BigDecimal enade,
		@NotBlank @Size(max = 10) String turno) {
}
