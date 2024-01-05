package com.br.fatec.AGIS.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.br.fatec.AGIS.model.Curso;

@Repository
public interface CursoRepository extends JpaRepository<Curso, Long> {
	
}
