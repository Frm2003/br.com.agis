package com.br.fatec.AGIS.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.br.fatec.AGIS.model.Matricula;
import com.br.fatec.AGIS.model.pk.MatriculaPk;

@Repository
public interface MatriculaRepository extends JpaRepository<Matricula, MatriculaPk> {
	
	@Query(value = "select * from Matricula where aluno_ra = ?", nativeQuery = true)
	List<Matricula> selectAllByRa(@Param("ra") String ra);
	
}
