package com.br.fatec.AGIS.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.br.fatec.AGIS.model.Matricula;
import com.br.fatec.AGIS.model.pk.MatriculaPk;

public interface MatriculaRepository extends JpaRepository<Matricula, MatriculaPk> {

}
