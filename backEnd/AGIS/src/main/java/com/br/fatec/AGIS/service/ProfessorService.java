package com.br.fatec.AGIS.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.br.fatec.AGIS.dto.ProfessorDto;
import com.br.fatec.AGIS.model.Professor;
import com.br.fatec.AGIS.model.Usuario;
import com.br.fatec.AGIS.repository.ProfessorRepository;

@Service
public class ProfessorService {
	@Autowired
	private ProfessorRepository professorRepository;
	
	public List<Professor> selectAll() {
		return professorRepository.findAll();
	}
	
	// PARTE DO MEIO DO SISTEMA DE "LOGIN"
	public Professor selectByCpfAndSenha(String cpf, String senha) {
		return professorRepository.selectByCpfAndSenha(cpf, senha);
	}
	
	public Professor selectById(Long id) throws Exception {
		Optional<Professor> professor = professorRepository.findById(id);
		if (professor.isEmpty()) {
			throw new Exception("Curso não registrado");
		}

		return professor.get();
	}
	
	public Professor insert(ProfessorDto professorDto) {
		var professorModel = new Professor();
		Usuario user = new Usuario();
		
		user.setCpf(professorDto.cpf());
		user.setNome(professorDto.nome());
		user.setDataNasc(professorDto.dataNasc());
		user.setEmailPessoal(professorDto.emailPessoal());
		
		user.setEmailCorp(geraEmailCorp(professorDto.nome()));
		
		user.setSituacao("ativo");
		user.setSenha("123456");
		
		professorModel.setTitulacao(professorDto.titulacao());
		professorModel.setUsuario(user);
		
		return professorRepository.save(professorModel);
	}
	
	public Professor delete(Long id) throws Exception {
		Optional<Professor> professor = professorRepository.findById(id);
		if (professor.isEmpty()) {
			throw new Exception("Curso não registrado");
		}

		var professorModel = professor.get();
		professorRepository.delete(professorModel);

		return professorModel;
	}
	
	private String geraEmailCorp(String nome) {
		String email = nome;
		
		for (int i = 0; i < 4; i++) {
			email += (int) (Math.random() * 10);
		}	
		
		email += "@agis.com";
		
		return email.trim();
	}
}