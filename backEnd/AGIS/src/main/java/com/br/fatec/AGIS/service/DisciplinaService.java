package com.br.fatec.AGIS.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.br.fatec.AGIS.dto.DisciplinaDto;
import com.br.fatec.AGIS.model.Curso;
import com.br.fatec.AGIS.model.Disciplina;
import com.br.fatec.AGIS.repository.CursoRepository;
import com.br.fatec.AGIS.repository.DisciplinaRepository;

@Service
public class DisciplinaService {
	@Autowired
	private CursoRepository cursoRepository;
	
	@Autowired
	private DisciplinaRepository disciplinaRepository;
	
	public List<Disciplina> selectAll() {
		return disciplinaRepository.findAll();
	}

	public Disciplina selectId(Long cod) throws Exception {
		Optional<Disciplina> disciplina = disciplinaRepository.findById(cod);
		
		if (disciplina.isEmpty()) {
			throw new Exception("Disciplina não registrada");
		}

		return disciplina.get();
	}

	public Disciplina insert(DisciplinaDto disciplinaDto) {
		Optional<Curso> curso = cursoRepository.findById(disciplinaDto.codCurso());
		Disciplina disciplinaModel = new Disciplina(disciplinaDto, curso.get());
		
		return disciplinaRepository.save(disciplinaModel);
	}

	public Disciplina update(Long cod, DisciplinaDto disciplinaDto) throws Exception {
		Optional<Disciplina> disciplina = disciplinaRepository.findById(cod);
		Optional<Curso> curso = cursoRepository.findById(disciplinaDto.codCurso());

		if (disciplina.isEmpty()) {
			throw new Exception("Disciplina não registrada");
		}
		
		Disciplina disciplinaModel = new Disciplina(cod, disciplinaDto, curso.get());

		return disciplinaRepository.save(disciplinaModel);
	}

	public Disciplina delete(Long cod) throws Exception {
		Optional<Disciplina> disciplina = disciplinaRepository.findById(cod);
		if (disciplina.isEmpty()) {
			throw new Exception("Disciplina não registrada");
		}

		var disciplinaModel = disciplina.get();
		disciplinaModel.setCurso(null);
		disciplinaRepository.delete(disciplinaModel);

		return disciplinaModel;
	}
}
