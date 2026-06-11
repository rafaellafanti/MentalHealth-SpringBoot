package com.example.MentalHealth2.controllers;

import com.example.MentalHealth2.models.SolicitacaoModel;
import com.example.MentalHealth2.models.StatusModel;
import com.example.MentalHealth2.services.SolicitacaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/solicitacoes")
public class SolicitacaoController {

    @Autowired
    private SolicitacaoService service;

    @GetMapping
    public List<SolicitacaoModel> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public SolicitacaoModel buscar(@PathVariable Long id) {
        return service.buscar(id);
    }

    @PostMapping
    public SolicitacaoModel salvar(@RequestBody SolicitacaoModel solicitacao) {
        return service.salvar(solicitacao);
    }

    @PutMapping("/{id}/status")
    public SolicitacaoModel atualizarStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
        SolicitacaoModel s = service.buscar(id);
        s.setStatus(StatusModel.valueOf(body.get("status")));
        return service.atualizar(id, s);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        service.deletar(id);
    }

    //crud está completo, mesmo as telas usando só get e post (put está parcial), pois assim fica mais completo

}
