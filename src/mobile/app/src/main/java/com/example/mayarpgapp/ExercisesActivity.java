package com.example.mayarpgapp;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.ProgressBar;
import android.widget.TextView;

import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.mayarpgapp.api.ApiService;
import com.example.mayarpgapp.api.RetrofitClient;
import com.example.mayarpgapp.model.PlanoExercicio;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class ExercisesActivity extends BaseActivity {

    private static final int REQUEST_CHECKIN = 100;

    private ProgressBar progressBar;
    private LinearLayout layoutEmptyState;
    private LinearLayout layoutSessaoConcluida;
    private LinearLayout layoutConteudo;

    private TextView tvTituloPlano, tvFrequencia, tvDuracao, tvNivel;
    private RecyclerView rvExercises;
    private Button btnConcluir;

    private ApiService apiService;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        String token = getSharedPreferences("APP", MODE_PRIVATE).getString("TOKEN", "");
        RetrofitClient.setToken(token);
        apiService = RetrofitClient.getInstance().create(ApiService.class);

        progressBar           = findViewById(R.id.progressBar);
        layoutEmptyState      = findViewById(R.id.layoutEmptyState);
        layoutSessaoConcluida = findViewById(R.id.layoutSessaoConcluida);
        layoutConteudo        = findViewById(R.id.layoutConteudo);
        tvTituloPlano         = findViewById(R.id.tvTituloPlano);
        tvFrequencia          = findViewById(R.id.tvFrequencia);
        tvDuracao             = findViewById(R.id.tvDuracao);
        tvNivel               = findViewById(R.id.tvNivel);
        rvExercises           = findViewById(R.id.rvExercises);
        btnConcluir           = findViewById(R.id.btnConcluir);

        rvExercises.setLayoutManager(new LinearLayoutManager(this));

        // Concluir → abre CheckinActivity para registrar dor
        btnConcluir.setOnClickListener(v -> {
            Intent intent = new Intent(this, CheckinActivity.class);
            startActivityForResult(intent, REQUEST_CHECKIN);
        });

        findViewById(R.id.btnContinuar).setOnClickListener(v -> finish());

        carregarPlano();
    }

    // Quando CheckinActivity retorna, mostra "Parabéns"
    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == REQUEST_CHECKIN && resultCode == RESULT_OK) {
            mostrarEstado("concluida");
        }
    }

    private void carregarPlano() {
        mostrarEstado("loading");

        String token = "Bearer " + getSharedPreferences("APP", MODE_PRIVATE).getString("TOKEN", "");

        apiService.getPlanoExercicio(token).enqueue(new Callback<List<PlanoExercicio>>() {
            @Override
            public void onResponse(Call<List<PlanoExercicio>> call, Response<List<PlanoExercicio>> response) {
                Log.d("EXERCICIOS", "Código: " + response.code());

                if (!response.isSuccessful() || response.body() == null || response.body().isEmpty()) {
                    Log.e("EXERCICIOS", "Resposta vazia ou erro");
                    mostrarEstado("empty");
                    return;
                }

                PlanoExercicio plano = response.body().get(0);

                if (!plano.temExercicios()) {
                    Log.e("EXERCICIOS", "Plano sem exercícios");
                    mostrarEstado("empty");
                    return;
                }

                tvTituloPlano.setText(plano.getNome() != null ? plano.getNome() : "Plano de exercícios");
                tvFrequencia.setText("Realizar 3x por semana");
                tvDuracao.setText("");
                tvNivel.setText("");

                ExerciseAdapter adapter = new ExerciseAdapter(
                        ExercisesActivity.this,
                        plano.getExercicios(),
                        exercise -> { }
                );
                rvExercises.setAdapter(adapter);
                mostrarEstado("lista");
            }

            @Override
            public void onFailure(Call<List<PlanoExercicio>> call, Throwable t) {
                Log.e("EXERCICIOS", "Falha: " + t.getMessage());
                mostrarEstado("empty");
            }
        });
    }

    private void mostrarEstado(String estado) {
        progressBar.setVisibility(View.GONE);
        layoutEmptyState.setVisibility(View.GONE);
        layoutSessaoConcluida.setVisibility(View.GONE);
        layoutConteudo.setVisibility(View.GONE);

        switch (estado) {
            case "loading":   progressBar.setVisibility(View.VISIBLE);           break;
            case "lista":     layoutConteudo.setVisibility(View.VISIBLE);        break;
            case "empty":     layoutEmptyState.setVisibility(View.VISIBLE);      break;
            case "concluida": layoutSessaoConcluida.setVisibility(View.VISIBLE); break;
        }
    }

    @Override protected int getLayoutId()  { return R.layout.activity_exercises; }
    @Override protected int getNavItemId() { return R.id.nav_btn_exercicios; }
}