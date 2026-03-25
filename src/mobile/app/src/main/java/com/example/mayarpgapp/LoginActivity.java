package com.example.mayarpgapp;

import android.os.Bundle;
import android.widget.ArrayAdapter;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.AppCompatButton;
import com.example.mayarpgapp.api.ApiService;
import com.example.mayarpgapp.api.RetrofitClient;
import com.example.mayarpgapp.model.User;
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
        String nome = etNome.getText().toString().trim();
        String cpf = etCpf.getText().toString().trim();
        String email = etEmail.getText().toString().trim();
        String senha = etSenha.getText().toString().trim();

        // Pegando os valores dos Spinners para montar a data
        String dia = spinnerDia.getSelectedItem().toString();
        String mes = spinnerMes.getSelectedItem().toString();
        String ano = spinnerAno.getSelectedItem().toString();
        String dataNascimento = dia + "/" + mes + "/" + ano;


        if (nome.isEmpty() || cpf.isEmpty() || email.isEmpty() || senha.isEmpty() ||
                dia.equals("Dia") || mes.equals("Mês") || ano.equals("Ano")) {
            Toast.makeText(this, "Preencha todos os campos corretamente!", Toast.LENGTH_SHORT).show();
            return;
        }

        // AGORA SIM: Criando o User com o construtor completo que fizemos
        User user = new User(nome, cpf, dataNascimento, email, senha);

        ApiService api = RetrofitClient.getInstance().create(ApiService.class);

        api.login(user).enqueue(new Callback<Object>() {
            @Override
            public void onResponse(Call<Object> call, Response<Object> response) {
                if (response.isSuccessful()) {
                    Toast.makeText(LoginActivity.this, "Login realizado com sucesso!", Toast.LENGTH_SHORT).show();
                    // Aqui você pode abrir a próxima tela (Home)
                } else {
                    Toast.makeText(LoginActivity.this, "Dados não conferem!", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<Object> call, Throwable t) {
                Toast.makeText(LoginActivity.this, "Erro de rede: " + t.getMessage(), Toast.LENGTH_LONG).show();
            }
        });
    }
}