package com.example.mayarpgapp;

import android.os.Bundle;
import android.util.Log;
import android.widget.ImageView;
import android.widget.TextView;

import com.example.mayarpgapp.api.ApiService;
import com.example.mayarpgapp.api.RetrofitClient;
import com.example.mayarpgapp.model.Paciente;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class PerfilActivity extends BaseActivity {

    private ImageView ivFotoPerfil;
    private TextView tvNome, tvPacienteDesde;
    private TextView tvEmail, tvTelefone, tvCpf, tvNascimento;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        ivFotoPerfil    = findViewById(R.id.ivFotoPerfil);
        tvNome          = findViewById(R.id.tvNome);
        tvPacienteDesde = findViewById(R.id.tvPacienteDesde);
        tvEmail         = findViewById(R.id.tvEmail);
        tvTelefone      = findViewById(R.id.tvTelefone);
        tvCpf           = findViewById(R.id.tvCpf);
        tvNascimento    = findViewById(R.id.tvNascimento);

        // ✅ Restaura o token no RetrofitClient caso o app tenha sido reaberto
        String token = getSharedPreferences("APP", MODE_PRIVATE).getString("TOKEN", "");
        RetrofitClient.setToken(token);

        findViewById(R.id.ivBack).setOnClickListener(v -> finish());

        carregarPerfil();
    }

    private void carregarPerfil() {
        // ✅ Não passa o token aqui — o RetrofitClient já injeta no header automaticamente
        ApiService api = RetrofitClient.getInstance().create(ApiService.class);
        api.getPerfil().enqueue(new Callback<Paciente>() {

            @Override
            public void onResponse(Call<Paciente> call, Response<Paciente> response) {
                Log.d("PERFIL", "Código: " + response.code());

                if (!response.isSuccessful() || response.body() == null) {
                    Log.e("PERFIL", "Resposta inválida ou corpo nulo. Código: " + response.code());
                    return;
                }

                Paciente p = response.body();
                Log.d("PERFIL", "Nome recebido: " + p.getName());

                tvNome.setText(p.getName());
                tvPacienteDesde.setText("Paciente desde " + formatarDataCurta(p.getCreatedAt()));
                tvEmail.setText(p.getEmail());
                tvTelefone.setText(p.getPhone());
                tvCpf.setText(p.getCpf());
                tvNascimento.setText(formatarDataNascimento(p.getBirthDate()));
            }

            @Override
            public void onFailure(Call<Paciente> call, Throwable t) {
                Log.e("PERFIL", "Falha na chamada: " + t.getMessage());
            }
        });
    }

    private String formatarDataCurta(String dateISO) {
        try {
            SimpleDateFormat entrada = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", Locale.getDefault());
            SimpleDateFormat saida   = new SimpleDateFormat("dd/MM/yyyy", Locale.getDefault());
            Date date = entrada.parse(dateISO);
            return saida.format(date);
        } catch (Exception e) {
            return dateISO;
        }
    }

    private String formatarDataNascimento(String dateISO) {
        try {
            SimpleDateFormat entrada = new SimpleDateFormat("yyyy-MM-dd", Locale.getDefault());
            SimpleDateFormat saida   = new SimpleDateFormat("dd/MM/yyyy", Locale.getDefault());
            Date date = entrada.parse(dateISO);
            return saida.format(date);
        } catch (Exception e) {
            return dateISO;
        }
    }

    @Override protected int getLayoutId()  { return R.layout.activity_perfil; }
    @Override protected int getNavItemId() { return R.id.nav_btn_perfil; }
}