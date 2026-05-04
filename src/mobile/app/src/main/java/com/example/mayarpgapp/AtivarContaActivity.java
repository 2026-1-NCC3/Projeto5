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

import okhttp3.MediaType;
import okhttp3.RequestBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class AtivarContaActivity extends AppCompatActivity {

    EditText etNome, etNascimento, etCpf, etEmail;
    AppCompatButton btnContinuar;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_ativar_conta);

        etNome       = findViewById(R.id.etNome);
        etNascimento = findViewById(R.id.etNascimento);
        etCpf        = findViewById(R.id.etCpf);
        etEmail      = findViewById(R.id.etEmail);
        btnContinuar = findViewById(R.id.btnContinuar);

        findViewById(R.id.ivVoltar).setOnClickListener(v -> finish());
        btnContinuar.setOnClickListener(v -> verificarPaciente());
    }

    private void verificarPaciente() {
        String nome       = etNome.getText().toString().trim();
        String nascimento = etNascimento.getText().toString().trim();
        String cpf        = etCpf.getText().toString().trim();
        String email      = etEmail.getText().toString().trim();

        if (nome.isEmpty() || nascimento.isEmpty() || cpf.isEmpty() || email.isEmpty()) {
            Toast.makeText(this, "Preencha todos os campos", Toast.LENGTH_SHORT).show();
            return;
        }

        btnContinuar.setEnabled(false);
        btnContinuar.setText("Verificando...");

        JsonObject body = new JsonObject();
        body.addProperty("nome",       nome);
        body.addProperty("birth_date", nascimento);
        body.addProperty("cpf",        cpf);
        body.addProperty("email",      email);

        ApiService api = RetrofitClient.getInstance().create(ApiService.class);

        api.verificarPaciente(body).enqueue(new Callback<JsonObject>() {
            @Override
            public void onResponse(Call<JsonObject> call, Response<JsonObject> response) {
                btnContinuar.setEnabled(true);
                btnContinuar.setText("Continuar");

                if (response.isSuccessful() && response.body() != null) {
                    int pacienteId = response.body().get("paciente_id").getAsInt();
                    String emailResp = response.body().get("email").getAsString();

                    Intent intent = new Intent(AtivarContaActivity.this, CriarSenhaActivity.class);
                    intent.putExtra("PACIENTE_ID", pacienteId);
                    intent.putExtra("EMAIL", emailResp);
                    startActivity(intent);
                } else {
                    try {
                        String erro = response.errorBody().string();
                        Toast.makeText(AtivarContaActivity.this, "Paciente não encontrado. Contate a clínica.", Toast.LENGTH_LONG).show();
                    } catch (Exception e) {
                        Toast.makeText(AtivarContaActivity.this, "Erro ao verificar dados.", Toast.LENGTH_SHORT).show();
                    }
                }
            }

            @Override
            public void onFailure(Call<JsonObject> call, Throwable t) {
                btnContinuar.setEnabled(true);
                btnContinuar.setText("Continuar");
                Toast.makeText(AtivarContaActivity.this, "Erro de conexão", Toast.LENGTH_SHORT).show();
            }
        });
    }
    private String formatarData(String dataBr) {
        try {
            String[] partes = dataBr.split("/");
            String dia = partes[0];
            String mes = partes[1];
            String ano = partes[2];

            return dia + "-" + mes + "-" + ano; // DD-MM-AAAA
        } catch (Exception e) {
            return dataBr;
        }
    }
}