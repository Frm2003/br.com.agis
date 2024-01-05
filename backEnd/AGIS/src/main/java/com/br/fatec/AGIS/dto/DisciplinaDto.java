package com.br.fatec.AGIS.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record DisciplinaDto(
		@NotBlank @Size(max = 100) String nome,
		@NotNull int qtdAulas,
		@NotNull int semestre,
		@NotNull Long codCurso
) {

}
