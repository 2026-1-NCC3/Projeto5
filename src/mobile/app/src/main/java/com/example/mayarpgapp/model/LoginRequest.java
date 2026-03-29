package com.example.mayarpgapp.model;
import com.google.gson.annotations.SerializedName;
public class LoginRequest {
    @SerializedName("email")
    private String email;
    @SerializedName("password")
    private String senha;
    public LoginRequest (String email, String senha) {
        this.email = email;
        this.senha = senha;
    }
}
