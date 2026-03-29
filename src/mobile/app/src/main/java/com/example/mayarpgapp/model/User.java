package com.example.mayarpgapp.model;
import com.google.gson.annotations.SerializedName;

public class User {
    // campos do cadastro e do login do usuário
    @SerializedName("name")
    String nome;
    private String cpf; // não vai pro backend por enquanto
    private String telefone; // não vai também
    private String dataNascimento; // vai pro backend mas mais tarde
    @SerializedName("email")
    private String email;
    @SerializedName("password")
    private String senha;

    public User(String nome, String cpf, String telefone, String dataNascimento, String email, String senha) {
        this.nome = nome;
        this.cpf = cpf;
        this.telefone = telefone;
        this.dataNascimento = dataNascimento;
        this.email = email;
        this.senha = senha;
    }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getCpf() { return cpf; }
    public void setCpf(String cpf) { this.cpf = cpf; }

    public String getTelefone() { return telefone; }
    public void setTelefone(String telefone) { this.telefone = telefone; }

    public String getDataNascimento() { return dataNascimento; }
    public void setDataNascimento(String dataNascimento) { this.dataNascimento = dataNascimento; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getSenha() { return senha; }
    public void setSenha(String senha) { this.senha = senha; }
}