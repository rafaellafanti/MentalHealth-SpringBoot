package com.example.MentalHealth2.models;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "solicitacoes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SolicitacaoModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long protocolo;

    @Enumerated(EnumType.STRING)
    private CategoriaModel categoria;

    private String descricao;

    private String localizacao;

    private boolean anonimo;

    @Enumerated(EnumType.STRING)
    private PrioridadeModel prioridade;

    @Enumerated(EnumType.STRING)
    private StatusModel status;

    private LocalDate prazo;

    @OneToMany(cascade = CascadeType.ALL)
    private List<HistoricoStatusModel> historico =
            new ArrayList<>();
}