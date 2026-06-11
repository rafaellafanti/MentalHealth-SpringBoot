package com.example.MentalHealth2.models;

public enum TipoUsuarioModel {
    CIDADAO("Cidadão"),
    ATENDENTE("Atendente"),
    GESTOR("Gestor");

    private final String descricao;

    TipoUsuarioModel(String descricao) {
        this.descricao = descricao;
    }

    public String getDescricao() {
        return descricao;
    }

    @Override
    public String toString() {
        return descricao;
    }
}