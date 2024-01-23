package com.br.fatec.AGIS.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.br.fatec.AGIS.dto.MatriculaDto;
import com.br.fatec.AGIS.model.Matricula;
import com.br.fatec.AGIS.service.MatriculaService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/matricula")
@CrossOrigin(origins = "http://127.0.0.1:5500")
public class MatriculaController {
	@Autowired
	private MatriculaService matriculaService;
	
	@GetMapping("/{ra}")
	public ResponseEntity<List<Matricula>> getAllByRa(@PathVariable("ra") String ra) {
		return ResponseEntity.status(HttpStatus.OK).body(matriculaService.selectAllByRa(ra));
	}
	
	@PatchMapping
	public ResponseEntity<Matricula> dispensar(@Valid @RequestBody MatriculaDto matriculaDto) {
		return ResponseEntity.status(HttpStatus.OK).body(matriculaService.dispensar(matriculaDto));
	}
}