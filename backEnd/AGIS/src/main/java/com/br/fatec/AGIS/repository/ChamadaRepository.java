package com.br.fatec.AGIS.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.br.fatec.AGIS.model.Chamada;
import com.br.fatec.AGIS.model.pk.ChamadaPk;

public interface ChamadaRepository extends JpaRepository<Chamada, ChamadaPk> {

}
