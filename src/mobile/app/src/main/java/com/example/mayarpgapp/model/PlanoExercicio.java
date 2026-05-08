package com.example.mayarpgapp.model;

import com.google.gson.annotations.SerializedName;
import java.util.List;

public class PlanoExercicio {

    @SerializedName("id")
    private String id;

    @SerializedName("nome")
    private String nome; // Ex: "Quiropraxia"

    @SerializedName("duracao_total")
    private String duracaoTotal; // Ex: "10.00 mins"

    @SerializedName("nivel")
    private String nivel; // Ex: "Leve"

    @SerializedName("exercicios")
    private List<Exercise> exercicios;

    public String getId() { return id; }
    public String getNome() { return nome; }
    public String getDuracaoTotal() { return duracaoTotal; }
    public String getNivel() { return nivel; }
    public List<Exercise> getExercicios() { return exercicios; }

    public boolean temExercicios() {
        return exercicios != null && !exercicios.isEmpty();
    }
}