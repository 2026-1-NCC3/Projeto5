package com.example.mayarpgapp;

import android.content.Intent;
import android.os.Bundle;
import android.widget.EditText;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.AppCompatButton;

import com.example.mayarpgapp.api.ApiService;
import com.example.mayarpgapp.api.RetrofitClient;
import com.google.gson.JsonObject;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class CriarSenhaActivity extends AppCompatActivity {

    EditText etSenha, etConfirmar;
    AppCompatButton btnContinuar;
    int pacienteId;
    String email;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_criar_senha);

        pacienteId = getIntent().getIntExtra("PACIENTE_ID", -1);
        email      = getIntent().getStringExtra("EMAIL");

        etSenha    = findViewById(R.id.etSenha);
        etConfirmar = findViewById(R.id.etConfirmar);
        btnContinuar = findViewById(R.id.btnContinuar);

        findViewById(R.id.ivVoltar).setOnClickListener(v -> finish());
        btnContinuar.setOnClickListener(v -> criarSenha());
    }

    private void criarSenha() {
        String senha     = etSenha.getText().toString().trim();
        String confirmar = etConfirmar.getText().toString().trim();

        if (senha.isEmpty() || confirmar.isEmpty()) {
            Toast.makeText(this, "Preencha todos os campos", Toast.LENGTH_SHORT).show();
            return;
        }

        if (!senha.equals(confirmar)) {
            Toast.makeText(this, "As senhas não coincidem", Toast.LENGTH_SHORT).show();
            return;
        }

        if (senha.length() < 6) {
            Toast.makeText(this, "Senha deve ter pelo menos 6 caracteres", Toast.LENGTH_SHORT).show();
            return;
        }

        btnContinuar.setEnabled(false);
        btnContinuar.setText("Criando conta...");

        JsonObject body = new JsonObject();
        body.addProperty("paciente_id", pacienteId);
        body.addProperty("email",       email);
        body.addProperty("senha",       senha);

        ApiService api = RetrofitClient.getInstance().create(ApiService.class);

        api.ativarConta(body).enqueue(new Callback<JsonObject>() {
            @Override
            public void onResponse(Call<JsonObject> call, Response<JsonObject> response) {
                btnContinuar.setEnabled(true);
                btnContinuar.setText("Continuar");

                if (response.isSuccessful()) {
                    startActivity(new Intent(CriarSenhaActivity.this, SucessoActivity.class));
                    finish();
                } else {
                    try {
                        Toast.makeText(CriarSenhaActivity.this,
                                "Erro ao criar conta. Tente novamente.", Toast.LENGTH_SHORT).show();
                    } catch (Exception e) {
                        Toast.makeText(CriarSenhaActivity.this, "Erro desconhecido.", Toast.LENGTH_SHORT).show();
                    }
                }
            }

            @Override
            public void onFailure(Call<JsonObject> call, Throwable t) {
                btnContinuar.setEnabled(true);
                btnContinuar.setText("Continuar");
                Toast.makeText(CriarSenhaActivity.this, "Erro de conexão", Toast.LENGTH_SHORT).show();
            }
        });
    }
}