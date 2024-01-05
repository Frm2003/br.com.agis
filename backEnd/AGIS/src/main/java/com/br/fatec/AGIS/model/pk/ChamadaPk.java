package com.br.fatec.AGIS.model.pk;

import java.io.Serializable;
import java.time.LocalDate;

import com.br.fatec.AGIS.model.Aluno;
import com.br.fatec.AGIS.model.Turma;

import jakarta.persistence.Embeddable;

@lombok.Data
@Embeddable
public class ChamadaPk implements Serializable {
	private static final long serialVersionUID = 1L;
	private Aluno aluno;
	private Turma turma;
	private LocalDate dataChamada;
}
