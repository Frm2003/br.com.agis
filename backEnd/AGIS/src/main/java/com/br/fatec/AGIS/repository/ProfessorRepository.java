package com.br.fatec.AGIS.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.br.fatec.AGIS.model.Professor;

@Repository
public interface ProfessorRepository extends JpaRepository<Professor, Long> {
	
	// PARTE MAIS BAIXA DO SISTEMA DE "LOGIN"
	@Query(value = "select p.cod, p.titulacao, u.* from Professor p inner join Usuario u on p.cpf = u.cpf where p.cpf = ? and u.senha = ?", nativeQuery = true)
	Professor selectByCpfAndSenha(@Param("cpf") String cpf, @Param("senha") String senha);
}	
