package com.example.mayarpgapp;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.AppCompatButton;
import com.example.mayarpgapp.api.ApiService;
import com.example.mayarpgapp.api.RetrofitClient;
import com.example.mayarpgapp.model.AuthResponse;
import com.example.mayarpgapp.model.User;
import com.example.mayarpgapp.model.LoginRequest;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class LoginActivity extends AppCompatActivity {
    EditText etNome,etCpf,etEmail, etSenha;
    Spinner spinnerDia, spinnerMes, spinnerAno;
    AppCompatButton btnLogin;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        etNome = findViewById(R.id.etNome);
        etCpf = findViewById(R.id.etCpf);
        etEmail = findViewById(R.id.etEmail);
        etSenha = findViewById(R.id.etSenha);

        spinnerDia = findViewById(R.id.spinnerDia);
        spinnerMes = findViewById(R.id.spinnerMes);
        spinnerAno = findViewById(R.id.spinnerAno);

        btnLogin = findViewById(R.id.btnLogin);

        configurarSpinners();
        btnLogin.setOnClickListener(v -> logar());

        AppCompatButton btnCadastro = findViewById(R.id.btnCadastro);

        btnCadastro.setOnClickListener(view -> {
            Intent intent = new Intent(LoginActivity.this,CadastroActivity.class);
            startActivity(intent);
        });
    }

    private void configurarSpinners() {
        String[] meses = {"Mês", "Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"};
        spinnerMes.setAdapter(new ArrayAdapter<>(this, android.R.layout.simple_spinner_item, meses));

        List<String> dias = new ArrayList<>(); dias.add("Dia");
        for (int i = 1; i <= 31; i++) dias.add(String.valueOf(i));
        spinnerDia.setAdapter(new ArrayAdapter<>(this, android.R.layout.simple_spinner_item, dias));

        List<String> anos = new ArrayList<>(); anos.add("Ano");
        int anoAtual = Calendar.getInstance().get(Calendar.YEAR);
        for (int i = anoAtual; i >= 1930; i--) anos.add(String.valueOf(i));
        spinnerAno.setAdapter(new ArrayAdapter<>(this, android.R.layout.simple_spinner_item, anos));
    }

    private void logar() {
        String email = etEmail.getText().toString().trim();
        String senha = etSenha.getText().toString().trim();

        // aqui pega os valores da data de nascimento mas não vamos usar agora, só na segunda entrega
        // String dia = spinnerDia.getSelectedItem().toString();
       // String mes = spinnerMes.getSelectedItem().toString();
        //String ano = spinnerAno.getSelectedItem().toString();
       // String dataNascimento = dia + "/" + mes + "/" + ano;


        if (email.isEmpty() || senha.isEmpty()) {
            Toast.makeText(this, "Preencha email e senha", Toast.LENGTH_SHORT).show();
            return;
        }

        ApiService api = RetrofitClient.getInstance().create(ApiService.class);
        LoginRequest login = new LoginRequest(email, senha);

        api.login(login).enqueue(new Callback<AuthResponse>() {
            @Override
            public void onResponse(Call<AuthResponse> call, Response<AuthResponse> response) {

                if (response.isSuccessful()) {
                    String nome = response.body().getUser().getName();
                    String token = response.body().getToken();
                    RetrofitClient.setToken(token);
                    getSharedPreferences("APP", MODE_PRIVATE)
                            .edit()
                            .putString("TOKEN", token)
                            .putString("USER_NAME", nome)
                            .apply();
                    Toast.makeText(LoginActivity.this, "Login realizado com sucesso!", Toast.LENGTH_SHORT).show();
                    Intent intent = new Intent(LoginActivity.this, HomeActivity.class);
                    intent.putExtra("USER_NAME", nome);
                    startActivity(intent);
                    finish(); // vai direto pra home depois do login
                } else {
                    Toast.makeText(LoginActivity.this, "Email ou senha inválidos", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<AuthResponse> call, Throwable t) {
                Toast.makeText(LoginActivity.this, "Erro: " + t.getMessage(), Toast.LENGTH_LONG).show();
            }
        });
    }
}