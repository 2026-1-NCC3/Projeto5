package com.example.mayarpgapp.model;

import com.google.gson.annotations.SerializedName;
import java.util.List;

public class ConsultaResponse {

    @SerializedName("proximas")
    private List<Consulta> proximas;

    @SerializedName("historico")
    private List<Consulta> historico;

    public List<Consulta> getProximas() { return proximas; }
    public List<Consulta> getHistorico() { return historico; }
}