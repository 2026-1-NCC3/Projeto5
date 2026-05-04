package com.example.mayarpgapp;

import android.content.Intent;
import android.os.Bundle;
import android.text.SpannableString;
import android.text.Spanned;
import android.text.method.LinkMovementMethod;
import android.text.style.ClickableSpan;
import android.text.style.ForegroundColorSpan;
import android.view.View;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.AppCompatButton;
import androidx.core.content.ContextCompat;

import com.example.mayarpgapp.api.ApiService;
import com.example.mayarpgapp.api.RetrofitClient;
import com.example.mayarpgapp.model.AuthResponse;
import com.example.mayarpgapp.model.LoginRequest;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class LoginActivity extends AppCompatActivity {

    EditText etEmail, etSenha;
    AppCompatButton btnEntrar;
    TextView tvEsqueceuSenha, tvPrimeiroAcesso;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        etEmail          = findViewById(R.id.etEmail);
        etSenha          = findViewById(R.id.etSenha);
        btnEntrar        = findViewById(R.id.btnEntrar);
        tvEsqueceuSenha  = findViewById(R.id.tvEsqueceuSenha);
        tvPrimeiroAcesso = findViewById(R.id.tvPrimeiroAcesso);

        btnEntrar.setOnClickListener(v -> fazerLogin());

        tvEsqueceuSenha.setOnClickListener(v -> {
            Intent intent = new Intent(this, com.example.mayarpgapp.RecuperarSenhaActivity.class);
            startActivity(intent);
        });

        String texto = "Primeiro acesso?\nAtive sua conta";
        SpannableString ss = new SpannableString(texto);

        ClickableSpan clickSpan = new ClickableSpan() {
            @Override
            public void onClick(View widget) {
                startActivity(new Intent(LoginActivity.this, AtivarContaActivity.class));
            }
        };

        ForegroundColorSpan corSpan = new ForegroundColorSpan(
                ContextCompat.getColor(this, R.color.teal)
        );

        ss.setSpan(clickSpan, 17, texto.length(), Spanned.SPAN_EXCLUSIVE_EXCLUSIVE);
        ss.setSpan(corSpan,   17, texto.length(), Spanned.SPAN_EXCLUSIVE_EXCLUSIVE);

        tvPrimeiroAcesso.setText(ss);
        tvPrimeiroAcesso.setMovementMethod(LinkMovementMethod.getInstance());
    }

    private void fazerLogin() {
        String email = etEmail.getText().toString().trim();
        String senha = etSenha.getText().toString().trim();

        if (email.isEmpty() || senha.isEmpty()) {
            Toast.makeText(this, "Preencha email e senha", Toast.LENGTH_SHORT).show();
            return;
        }

        btnEntrar.setEnabled(false);
        btnEntrar.setText("Entrando...");

        ApiService api = RetrofitClient.getInstance().create(ApiService.class);
        LoginRequest login = new LoginRequest(email, senha);

        api.login(login).enqueue(new Callback<AuthResponse>() {
            @Override
            public void onResponse(Call<AuthResponse> call, Response<AuthResponse> response) {
                btnEntrar.setEnabled(true);
                btnEntrar.setText("Entrar");

                if (response.isSuccessful() && response.body() != null) {
                    String token = response.body().getToken();
                    String nome  = response.body().getUser().getName();

                    RetrofitClient.setToken(token);
                    getSharedPreferences("APP", MODE_PRIVATE)
                            .edit()
                            .putString("TOKEN", token)
                            .putString("USER_NAME", nome)
                            .apply();

                    Intent intent = new Intent(LoginActivity.this, HomeActivity.class);
                    intent.putExtra("USER_NAME", nome);
                    startActivity(intent);
                    finish();
                } else {
                    Toast.makeText(LoginActivity.this, "Email ou senha inválidos", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<AuthResponse> call, Throwable t) {
                btnEntrar.setEnabled(true);
                btnEntrar.setText("Entrar");
                Toast.makeText(LoginActivity.this, "Erro de conexão", Toast.LENGTH_SHORT).show();
            }
        });
    }
}