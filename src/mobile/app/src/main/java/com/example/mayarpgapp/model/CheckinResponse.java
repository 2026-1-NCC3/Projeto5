package com.example.mayarpgapp.model;

import com.google.gson.annotations.SerializedName;
import java.util.List;

public class CheckinResponse {

    @SerializedName("jaFez")
    private boolean jaFez;

    @SerializedName("mensagem")
    private String mensagem;

    public boolean isJaFez() { return jaFez; }
    public String getMensagem() { return mensagem; }
}
