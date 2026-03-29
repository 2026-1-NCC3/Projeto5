package com.example.mayarpgapp.model;

import com.google.gson.annotations.SerializedName;
import java.util.List;


public class HistoricoResponse {

    @SerializedName("historico")
    private List<String> historico;

    @SerializedName("total")
    private int total;

    public List<String> getHistorico() { return historico; }
    public int getTotal() { return total; }
}