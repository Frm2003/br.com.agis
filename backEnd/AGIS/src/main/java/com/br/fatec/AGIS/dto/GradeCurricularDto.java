package com.br.fatec.AGIS.dto;

import jakarta.validation.constraints.NotNull;

public record GradeCurricularDto(
		@NotNull Long codCurso,
		@NotNull int semestre,
		@NotNull int ano
) {

}
