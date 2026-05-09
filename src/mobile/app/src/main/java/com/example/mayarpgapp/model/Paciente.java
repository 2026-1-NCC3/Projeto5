package com.example.mayarpgapp.model;

import com.google.gson.annotations.SerializedName;

public class Paciente {

    @SerializedName("id")
    private String id;

    @SerializedName("name")
    private String name;

    @SerializedName("email")
    private String email;

    @SerializedName("phone")
    private String phone;

    @SerializedName("cpf")
    private String cpf;

    @SerializedName("birth_date")
    private String birthDate;

    @SerializedName("created_at")
    private String createdAt;

    public String getId() { return id; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public String getPhone() { return phone; }
    public String getCpf() { return cpf; }
    public String getBirthDate() { return birthDate; }
    public String getCreatedAt() { return createdAt; }
}