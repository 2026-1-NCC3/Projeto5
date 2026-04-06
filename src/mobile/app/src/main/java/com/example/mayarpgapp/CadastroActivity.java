package com.example.mayarpgapp;

import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;
import android.text.SpannableString;
import android.text.style.ClickableSpan;
import android.text.Spanned;
import android.text.TextPaint;
import android.text.method.LinkMovementMethod;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.CheckBox;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.AppCompatButton;

import com.example.mayarpgapp.api.ApiService;
import com.example.mayarpgapp.api.RetrofitClient;
import com.example.mayarpgapp.model.AuthResponse;
import com.example.mayarpgapp.model.LoginRequest;
import com.example.mayarpgapp.model.UserRegister;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class CadastroActivity extends AppCompatActivity {
// campos que o usuário vai preencher e clicar
    EditText etNome, etEmail, etSenha;
    Spinner spinnerDia1, spinnerMes1, spinnerAno1;
    CheckBox cbTermos;
    AppCompatButton btnCriarConta;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_cadastro);
        // componentes dos campos do layout ligados a função

        etNome = findViewById(R.id.etNome);
        etEmail = findViewById(R.id.etEmail);
        etSenha = findViewById(R.id.etSenha);
        cbTermos = findViewById(R.id.cbTermos);

        spinnerDia1 = findViewById(R.id.spinnerDia1);
        spinnerMes1 = findViewById(R.id.spinnerMes1);
        spinnerAno1 = findViewById(R.id.spinnerAno1);

        btnCriarConta = findViewById(R.id.btnCriarConta);

        configurarLinkTermos();
        configurarSpinners();

        btnCriarConta.setOnClickListener(v -> cadastrar());
        // vai pra tela de login depois do cadastro
        AppCompatButton btnLogin = findViewById(R.id.btnLogin1);
        btnLogin.setOnClickListener(view -> {
            startActivity(new Intent(CadastroActivity.this, LoginActivity.class));
        });
    }

    private void configurarLinkTermos() {
        String texto = "Li e estou de acordo com os Termos de uso";
        SpannableString ss = new SpannableString(texto);

        ClickableSpan clickableSpan = new ClickableSpan() {
            @Override
            public void onClick(View widget) {
                startActivity(new Intent(CadastroActivity.this, TermosActivity.class));
            }

            @Override
            public void updateDrawState(TextPaint ds) {
                super.updateDrawState(ds);
                ds.setColor(Color.parseColor("#F27D6A"));
                ds.setUnderlineText(true);
            }
        };

        ss.setSpan(clickableSpan, 27, 40, Spanned.SPAN_EXCLUSIVE_EXCLUSIVE);
        cbTermos.setText(ss);
        cbTermos.setMovementMethod(LinkMovementMethod.getInstance());
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
        spinnerMes1.setAdapter(mesesAdapter);

        ArrayAdapter<Integer> diasAdapter = new ArrayAdapter<>(
                this,
                android.R.layout.simple_spinner_item
        );
        for (int i = 1; i <= 31; i++) diasAdapter.add(i);

        List<String> anos = new ArrayList<>();
        anos.add("Ano");
        int anoAtual = Calendar.getInstance().get(Calendar.YEAR);
        for (int i = anoAtual; i >= 1930; i--) anos.add(String.valueOf(i));

        spinnerAno1.setAdapter(new ArrayAdapter<>(this, android.R.layout.simple_spinner_item, anos));
        diasAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        spinnerDia1.setAdapter(diasAdapter);
    }

    private void cadastrar() {

        String nome = etNome.getText().toString().trim();
        String email = etEmail.getText().toString().trim();
        String senha = etSenha.getText().toString().trim();
        String ano = spinnerAno1.getSelectedItem().toString();
        // validação dos campos que foram preenchidos

        if (nome.isEmpty() || email.isEmpty() || senha.isEmpty()) {
            Toast.makeText(this, "Preencha nome, email e senha", Toast.LENGTH_SHORT).show();
            return;
        }

        if (!android.util.Patterns.EMAIL_ADDRESS.matcher(email).matches()) {
            Toast.makeText(this, "Email inválido", Toast.LENGTH_SHORT).show();
            return;
        }

        if (senha.length() < 6) {
            Toast.makeText(this, "Senha deve ter pelo menos 6 caracteres", Toast.LENGTH_SHORT).show();
            return;
        }

        if (ano.equals("Ano")) {
            Toast.makeText(this, "Selecione um ano válido", Toast.LENGTH_SHORT).show();
            return;
        }

        if (!cbTermos.isChecked()) {
            Toast.makeText(this, "Aceite os termos de uso", Toast.LENGTH_SHORT).show();
            return;
        }

        UserRegister userRegister = new UserRegister(nome, email, senha); // novo objeto que pede so email, nome e senha
        // chamada do cadastro na api  que envia pro backend pela retrofit
        ApiService api = RetrofitClient.getInstance().create(ApiService.class);
        btnCriarConta.setEnabled(false);

        api.register(userRegister).enqueue(new Callback<AuthResponse>() {
            @Override
            public void onResponse(Call<AuthResponse> call, Response<AuthResponse> response) {

                btnCriarConta.setEnabled(true);

                if (response.isSuccessful()) {


                    LoginRequest login = new LoginRequest(email, senha);

                    api.login(login).enqueue(new Callback<AuthResponse>() {
                        @Override
                        public void onResponse(Call<AuthResponse> call, Response<AuthResponse> response) {

                            if (response.isSuccessful()) {

                                String token = response.body().getToken();
                                RetrofitClient.setToken(token);
                                // token pra ficar salvo
                                getSharedPreferences("APP", MODE_PRIVATE)
                                        .edit()
                                        .putString("TOKEN", token)
                                        .apply();

                                Toast.makeText(CadastroActivity.this, "Cadastro e login realizados!", Toast.LENGTH_SHORT).show();

                                String nome = response.body().getUser().getName();
                                // redireciona pra home
                                Intent intent = new Intent(CadastroActivity.this, HomeActivity.class);
                                intent.putExtra("USER_NAME", nome);
                                startActivity(intent);
                                finish();

                            } else {
                                Toast.makeText(CadastroActivity.this, "Erro ao logar automaticamente", Toast.LENGTH_SHORT).show();
                            }
                        }

                        @Override
                        public void onFailure(Call<AuthResponse> call, Throwable t) {
                            Toast.makeText(CadastroActivity.this, "Erro: " + t.getMessage(), Toast.LENGTH_LONG).show();
                        }
                    });

                } else {
                    Toast.makeText(CadastroActivity.this, "Erro no cadastro", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<AuthResponse> call, Throwable t) {
                btnCriarConta.setEnabled(true);
                Toast.makeText(CadastroActivity.this, "Erro: " + t.getMessage(), Toast.LENGTH_LONG).show();
            }
        });
    }
}