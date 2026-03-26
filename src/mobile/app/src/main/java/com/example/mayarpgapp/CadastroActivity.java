package com.example.mayarpgapp;

import com.example.mayarpgapp.api.ApiService;
import com.example.mayarpgapp.api.RetrofitClient;
import com.example.mayarpgapp.model.User;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

import android.content.Intent;
import android.os.Bundle;
import android.widget.ArrayAdapter;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.AppCompatButton;

public class CadastroActivity extends AppCompatActivity {

    EditText etNome, etCpf, etTelefone, etAno, etEmail, etSenha;
    Spinner spinnerDia, spinnerMes;
    AppCompatButton btnCriarConta;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_cadastro);

        etNome = findViewById(R.id.etNome);
        etCpf = findViewById(R.id.etCpf);
        etTelefone = findViewById(R.id.etTelefone);
        etAno = findViewById(R.id.etAno);
        etEmail = findViewById(R.id.etEmail);
        etSenha = findViewById(R.id.etSenha);

        spinnerDia = findViewById(R.id.spinnerDia);
        spinnerMes = findViewById(R.id.spinnerMes);

        btnCriarConta = findViewById(R.id.btnCriarConta);

        configurarSpinners();

        btnCriarConta.setOnClickListener(v -> cadastrar());

        AppCompatButton btnLogin = findViewById(R.id.btnLogin1);

        btnLogin.setOnClickListener(view -> {
            Intent intent = new Intent(CadastroActivity.this,LoginActivity.class);
            startActivity(intent);
        });
    }

    private void configurarSpinners() {

        String[] meses = {"Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
                "Jul", "Ago", "Set", "Out", "Nov", "Dez"};

        ArrayAdapter<String> mesesAdapter = new ArrayAdapter<>(
                this,
                android.R.layout.simple_spinner_item,
                meses
        );

        mesesAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        spinnerMes.setAdapter(mesesAdapter);

        ArrayAdapter<Integer> diasAdapter = new ArrayAdapter<>(
                this,
                android.R.layout.simple_spinner_item
        );

        for (int i = 1; i <= 31; i++) {
            diasAdapter.add(i);
        }

        diasAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        spinnerDia.setAdapter(diasAdapter);
    }

    private void cadastrar() {

        String nome = etNome.getText().toString().trim();
        String cpf = etCpf.getText().toString().trim();
        String telefone = etTelefone.getText().toString().trim();
        String dia = spinnerDia.getSelectedItem().toString();
        String mes = spinnerMes.getSelectedItem().toString();
        String ano = etAno.getText().toString().trim();
        String email = etEmail.getText().toString().trim();
        String senha = etSenha.getText().toString().trim();

        if (nome.isEmpty() || email.isEmpty() || senha.isEmpty()) {
            Toast.makeText(this, "Preencha nome, email e senha", Toast.LENGTH_SHORT).show();
            return;
        }

        if (senha.length() < 6) {
            Toast.makeText(this, "Senha deve ter pelo menos 6 caracteres", Toast.LENGTH_SHORT).show();
            return;
        }

        if (ano.isEmpty() || ano.length() < 4) {
            Toast.makeText(this, "Ano inválido", Toast.LENGTH_SHORT).show();
            return;
        }

        String dataNascimento = dia + "/" + mes + "/" + ano;

        User user = new User(nome, cpf, telefone, dataNascimento, email, senha);

        ApiService api = RetrofitClient.getInstance().create(ApiService.class);

        api.register(user).enqueue(new Callback<Object>() {
            @Override
            public void onResponse(Call<Object> call, Response<Object> response) {

                if (response.isSuccessful()) {
                    Toast.makeText(CadastroActivity.this, "Cadastro realizado!", Toast.LENGTH_SHORT).show();
                    finish(); // volta pra tela anterior (login)
                } else {
                    Toast.makeText(CadastroActivity.this, "Erro no cadastro", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<Object> call, Throwable t) {
                Toast.makeText(CadastroActivity.this, "Erro: " + t.getMessage(), Toast.LENGTH_LONG).show();
            }
        });
    }
}