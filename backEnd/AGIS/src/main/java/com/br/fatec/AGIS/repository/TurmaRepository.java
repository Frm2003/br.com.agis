package com.br.fatec.AGIS.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.br.fatec.AGIS.model.Turma;

@Repository
public interface TurmaRepository extends JpaRepository<Turma, Long>{
	
	@Query(value = "select * from turma where cod_grade = ?", nativeQuery = true)
	List<Turma> selectAllfromGrade(@Param("cod") Long cod);
}
