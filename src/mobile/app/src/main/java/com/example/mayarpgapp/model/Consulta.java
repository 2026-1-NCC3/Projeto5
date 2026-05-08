package com.example.mayarpgapp.model;

import com.google.gson.annotations.SerializedName;

public class Consulta {

    @SerializedName("id")
    private String id;

    @SerializedName("tipo")
    private String tipo; // Ex: "Fisioterapia"

    @SerializedName("medico")
    private String medico; // Ex: "Dra. Maya"

    @SerializedName("data")
    private String data; // Ex: "2025-05-15"

    @SerializedName("horario_inicio")
    private String horarioInicio; // Ex: "14:00"

    @SerializedName("horario_fim")
    private String horarioFim; // Ex: "15:00"

    @SerializedName("status")
    private String status; // Ex: "agendada", "concluida", "cancelada"

    public String getId() { return id; }
    public String getTipo() { return tipo; }
    public String getMedico() { return medico; }
    public String getData() { return data; }
    public String getHorarioInicio() { return horarioInicio; }
    public String getHorarioFim() { return horarioFim; }
    public String getStatus() { return status; }

    public boolean isConcluida() {
        return "concluida".equalsIgnoreCase(status);
    }
}