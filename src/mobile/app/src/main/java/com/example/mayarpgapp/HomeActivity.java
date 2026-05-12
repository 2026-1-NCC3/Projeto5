package com.example.mayarpgapp;

import android.os.Bundle;
import android.widget.TextView;

import com.example.mayarpgapp.api.ApiService;
import com.example.mayarpgapp.api.RetrofitClient;
import com.example.mayarpgapp.model.Paciente;

import java.util.Calendar;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class HomeActivity extends BaseActivity {

    private TextView txtSaudacao;
    private ApiService apiService;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        String token = getSharedPreferences("APP", MODE_PRIVATE).getString("TOKEN", "");
        RetrofitClient.setToken(token);
        apiService = RetrofitClient.getInstance().create(ApiService.class);

        txtSaudacao = findViewById(R.id.txt_saudacao);

        // Mostra saudação genérica enquanto carrega o nome
        txtSaudacao.setText(saudacaoPorHora(""));

        carregarNomePaciente();
    }

    private void carregarNomePaciente() {
        apiService.getPerfil().enqueue(new Callback<Paciente>() {
            @Override
            public void onResponse(Call<Paciente> call, Response<Paciente> response) {
                if (response.isSuccessful() && response.body() != null) {
                    String nome = response.body().getName();
                    // Usa apenas o primeiro nome
                    if (nome != null && !nome.isEmpty()) {
                        String primeiroNome = nome.split(" ")[0];
                        txtSaudacao.setText(saudacaoPorHora(primeiroNome));
                    }
                }
            }

            @Override
            public void onFailure(Call<Paciente> call, Throwable t) {
                // Mantém a saudação sem nome em caso de falha
            }
        });
    }

    private String saudacaoPorHora(String nome) {
        int hora = Calendar.getInstance().get(Calendar.HOUR_OF_DAY);
        String cumprimento;
        if (hora >= 5 && hora < 12) {
            cumprimento = "Bom dia";
        } else if (hora >= 12 && hora < 18) {
            cumprimento = "Boa tarde";
        } else {
            cumprimento = "Boa noite";
        }
        return nome.isEmpty() ? cumprimento : cumprimento + ", " + nome;
    }

    @Override protected int getLayoutId()  { return R.layout.activity_home; }
    @Override protected int getNavItemId() { return R.id.nav_btn_home; }
}