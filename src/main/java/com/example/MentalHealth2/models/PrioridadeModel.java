package com.example.MentalHealth2.models;

public enum PrioridadeModel {
    BAIXA(7),
    MEDIA(5),
    ALTA(3),
    URGENTE(1);

    private int slaDias;

    PrioridadeModel(int slaDias) {
        this.slaDias = slaDias;
    }

    public int getSlaDias() {
        return slaDias;
    }
}
