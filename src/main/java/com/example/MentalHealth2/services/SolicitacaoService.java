package com.example.MentalHealth2.services;

import com.example.MentalHealth2.models.*;
import com.example.MentalHealth2.repositories.SolicitacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class SolicitacaoService {

    @Autowired
    private SolicitacaoRepository repository;

    public SolicitacaoModel salvar(SolicitacaoModel solicitacao) {

        solicitacao.setStatus(StatusModel.ABERTO);
        solicitacao.setPrazo(LocalDate.now().plusDays(solicitacao.getPrioridade().getSlaDias()));

        return repository.save(solicitacao);
    }

    public List<SolicitacaoModel> listar() {
        return repository.findAll();
    }

    public SolicitacaoModel buscar(Long id) {
        return repository.findById(id).orElseThrow();
    }

    public SolicitacaoModel atualizar(Long id, SolicitacaoModel solicitacaoAtualizada) {

        SolicitacaoModel solicitacao = repository.findById(id).orElseThrow();

        solicitacao.setCategoria(solicitacaoAtualizada.getCategoria());
        solicitacao.setDescricao(solicitacaoAtualizada.getDescricao());
        solicitacao.setLocalizacao(solicitacaoAtualizada.getLocalizacao());
        solicitacao.setPrioridade(solicitacaoAtualizada.getPrioridade());
        solicitacao.setStatus(solicitacaoAtualizada.getStatus());
        return repository.save(solicitacao);
    }

    public void deletar(Long id) {
        repository.findById(id).orElseThrow();
        repository.deleteById(id);
    }

    // quase toda lógica do service da versão antiga está nessa nova
}