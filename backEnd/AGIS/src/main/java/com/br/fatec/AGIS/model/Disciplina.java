package com.br.fatec.AGIS.model;

import com.br.fatec.AGIS.dto.DisciplinaDto;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.NoArgsConstructor;

@lombok.Data
@Entity
@Table
@Inheritance(strategy = InheritanceType.JOINED)
@NoArgsConstructor
public class Disciplina {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(nullable = false)
	private Long cod;
	
	@Column(nullable = false, length = 100)
	private String nome;
	
	@Column(nullable = false, name = "qtd_aulas")
	private int qtdAulas; 
	
	@Column(nullable = false)
	private int semestre; 
	
	@JsonIgnoreProperties(value = {"applications", "hibernateLazyInitializer"})
	@ManyToOne(cascade = CascadeType.REMOVE, targetEntity = Curso.class, fetch = FetchType.LAZY)
	@JoinColumn(nullable = false, name = "cod_curso")
	private Curso curso;
	
	public Disciplina(DisciplinaDto disciplinaDto, Curso curso) {
		this.nome = disciplinaDto.nome();
		this.qtdAulas = disciplinaDto.qtdAulas();
		this.semestre = disciplinaDto.semestre();
		this.curso = curso;
	}
	
	public Disciplina(Long cod, DisciplinaDto disciplinaDto, Curso curso) {
		this.cod = cod;
		this.nome = disciplinaDto.nome();
		this.qtdAulas = disciplinaDto.qtdAulas();
		this.semestre = disciplinaDto.semestre();
		this.curso = curso;
	}
}
