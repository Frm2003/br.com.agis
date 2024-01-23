package com.br.fatec.AGIS.model;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.Table;

@lombok.Data
@Entity
@Table
@Inheritance(strategy = InheritanceType.JOINED)
public class Curso {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(nullable = false)
	private Long cod;
	
	@Column(nullable = false, length = 100)
	private String nome;

	@Column(nullable = false, name = "carga_horaria")
	private int cargaHorario; 
	
	@Column(nullable = false, length = 10)
	private String sigla; 
	
	@Column(nullable = false, precision = 3, scale = 2)
	private BigDecimal enade;
	
	@Column(nullable = false, length = 10)
	private String turno;
	
}
