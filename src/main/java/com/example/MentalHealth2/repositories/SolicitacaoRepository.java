package com.example.MentalHealth2.repositories;

import com.example.MentalHealth2.models.SolicitacaoModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SolicitacaoRepository extends JpaRepository<SolicitacaoModel, Long> {
}
