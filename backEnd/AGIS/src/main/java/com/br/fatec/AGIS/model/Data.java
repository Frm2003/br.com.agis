package com.br.fatec.AGIS.model;

import java.time.LocalDate;

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
public class Data {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(nullable = false)
	private Long cod;
	
	@Column(nullable = false, columnDefinition = "DATE")
	private LocalDate data;
	
	@Column(nullable = false, length = 100)
	private String descricao;
	
	@Column(nullable = false, name = "eh_feriado")
	private boolean ehFeriado;
	
	@Column(nullable = false)
	private int ano;
}
