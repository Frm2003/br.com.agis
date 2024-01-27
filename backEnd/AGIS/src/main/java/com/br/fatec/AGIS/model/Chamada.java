package com.br.fatec.AGIS.model;

import java.time.LocalDate;

import com.br.fatec.AGIS.dto.ChamadaDto;
import com.br.fatec.AGIS.model.pk.ChamadaPk;

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
@IdClass(ChamadaPk.class)
public class Chamada {
	@Id
	@ManyToOne(cascade = CascadeType.ALL, targetEntity = Aluno.class, fetch = FetchType.LAZY)
	@JoinColumn(nullable = false, name = "aluno_ra")
	private Aluno aluno;
	
	@Id
	@ManyToOne(cascade = CascadeType.ALL, targetEntity = Turma.class, fetch = FetchType.LAZY)
	@JoinColumn(nullable = false, name = "cod_turma")
	private Turma turma;
	
	@Id
	@Column(nullable = false, columnDefinition = "DATE")
	private LocalDate dataChamada;
	
	@Column(nullable = false, name = "qtd_faltas")
	private int qtdFaltas;

	public Chamada(ChamadaDto chamadaDto, Turma turma, Aluno aluno) {
		this.aluno = aluno;
		this.turma = turma;
		this.dataChamada = chamadaDto.data();
		this.qtdFaltas = chamadaDto. qtdFaltas();
	}
	
	
}
