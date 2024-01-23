package com.br.fatec.AGIS.model.pk;

import java.io.Serializable;

import com.br.fatec.AGIS.model.Aluno;
import com.br.fatec.AGIS.model.Turma;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@lombok.Data
@Embeddable
@NoArgsConstructor
public class MatriculaPk implements Serializable {
	private static final long serialVersionUID = 1L;
	private Aluno aluno;
	private Turma turma;
	private int ano; 
	private int semestre; 
}
