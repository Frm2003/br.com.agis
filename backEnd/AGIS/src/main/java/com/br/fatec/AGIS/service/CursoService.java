package com.br.fatec.AGIS.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.br.fatec.AGIS.dto.CursoDto;
import com.br.fatec.AGIS.model.Curso;
import com.br.fatec.AGIS.repository.CursoRepository;

@Service
public class CursoService {
	@Autowired
	private CursoRepository cursoRepository;

	public List<Curso> selectAll() {
		return cursoRepository.findAll();
	}
	
	public Curso selectId(Long id) throws Exception {
		Optional<Curso> curso = cursoRepository.findById(id);
		if (curso.isEmpty()) {
			throw new Exception("Curso não registrado");
		}

		return curso.get();
	}

	public Curso insert(CursoDto cursoDto) {
		var cursoModel = new Curso();
		BeanUtils.copyProperties(cursoDto, cursoModel);
		return cursoRepository.save(cursoModel);
	}

	public Curso update(Long id, CursoDto cursoDto) throws Exception {
		Optional<Curso> curso = cursoRepository.findById(id);
		if (curso.isEmpty()) {
			throw new Exception("Curso não registrado");
		}

		var cursoModel = curso.get();
		BeanUtils.copyProperties(cursoDto, cursoModel);

		return cursoRepository.save(cursoModel);
	}

	public Curso delete(Long id) throws Exception {
		Optional<Curso> curso = cursoRepository.findById(id);
		if (curso.isEmpty()) {
			throw new Exception("Curso não registrado");
		}

		var cursoModel = curso.get();
		cursoRepository.delete(cursoModel);

		return cursoModel;
	}
}
