package com.example.mayarpgapp.model;

import com.google.gson.annotations.SerializedName;

public class Progresso {

    @SerializedName("percentual")
    private int percentual; // Ex: 56 (para 56%)

    @SerializedName("em_progresso")
    private int emProgresso; // Ex: 2

    @SerializedName("completo")
    private int completo; // Ex: 3

    @SerializedName("proximos")
    private int proximos; // Ex: 2

    public int getPercentual() { return percentual; }
    public int getEmProgresso() { return emProgresso; }
    public int getCompleto() { return completo; }
    public int getProximos() { return proximos; }

    public boolean temDados() {
        return percentual > 0 || completo > 0 || emProgresso > 0;
    }
}