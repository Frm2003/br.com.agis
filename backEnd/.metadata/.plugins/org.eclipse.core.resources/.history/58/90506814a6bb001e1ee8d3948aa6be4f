package com.br.fatec.AGIS.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.br.fatec.AGIS.dto.AlunoDto;
import com.br.fatec.AGIS.model.Aluno;
import com.br.fatec.AGIS.service.AlunoService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/aluno")
@CrossOrigin(origins = "http://127.0.0.1:5500")
public class AlunoController {
	@Autowired
	private AlunoService alunoService;
	
	@GetMapping
	public ResponseEntity<List<Aluno>> getAll() {
		return ResponseEntity.status(HttpStatus.OK).body(alunoService.selectAll());
	}
	
	@GetMapping("/{ra}")
	public ResponseEntity<Object> getId(@PathVariable("ra") String ra) {
		try {
			return ResponseEntity.status(HttpStatus.OK).body(alunoService.selectId(ra));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
	}
	
	@PostMapping
	public ResponseEntity<Aluno> insert(@RequestBody @Valid AlunoDto alunoDto) {
		return ResponseEntity.status(HttpStatus.OK).body(alunoService.insert(alunoDto));
	}
	
	@DeleteMapping("/{ra}")
	public ResponseEntity<Object> delete(@PathVariable("ra") String ra) {
		try {
			return ResponseEntity.status(HttpStatus.OK).body(alunoService.delete(ra));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
	}
	
	@PatchMapping("/{ra}")
	public ResponseEntity<Aluno> trancar(@PathVariable("ra") String ra) {
		return ResponseEntity.status(HttpStatus.OK).body(alunoService.trancar(ra));
	}
}
