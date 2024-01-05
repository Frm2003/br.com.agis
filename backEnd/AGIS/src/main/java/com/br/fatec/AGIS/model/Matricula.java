package com.br.fatec.AGIS.model;

import java.math.BigDecimal;

import com.br.fatec.AGIS.model.pk.MatriculaPk;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@lombok.Data
@Entity
@Table
@Inheritance(strategy = InheritanceType.JOINED)
@IdClass(MatriculaPk.class)
public class Matricula {
	@Id
	@ManyToOne(cascade = CascadeType.ALL, targetEntity = Aluno.class, fetch = FetchType.LAZY)
	@JoinColumn(nullable = false, name = "alunoRa")
	private Aluno aluno;
	
	@Id
	@ManyToOne(cascade = CascadeType.ALL, targetEntity = Turma.class, fetch = FetchType.LAZY)
	@JoinColumn(nullable = false, name = "codTurma")
	private Turma turma;
	
	@Id
	@Column(nullable = false)
	private int ano; 
	
	@Id
	@Column(nullable = false)
	private int semestre; 
	
	@Column(nullable = false, length = 20)
	private String situacao;
	
	@Column(nullable = false, precision = 3, scale = 2)
	private BigDecimal notaFinal;
}
