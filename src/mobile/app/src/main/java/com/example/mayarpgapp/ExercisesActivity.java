package com.example.mayarpgapp;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.View;
import android.widget.ProgressBar;
import android.widget.TextView;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import com.example.mayarpgapp.api.ApiService;
import com.example.mayarpgapp.api.RetrofitClient;
import com.example.mayarpgapp.model.Exercise;
import java.util.ArrayList;
import java.util.List;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class ExercisesActivity extends AppCompatActivity {

    // Componentes da tela
    private RecyclerView rvExercises;
    private ProgressBar progressBar;
    private TextView tvError;
    private ApiService apiService;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_exercises);

        // Instancia a API e inicia os componentes
        apiService = RetrofitClient.getInstance().create(ApiService.class);

        initViews();
        carregarExercicios();
    }

    private void initViews() {
        rvExercises = findViewById(R.id.rvExercises);
        progressBar = findViewById(R.id.progressBar);
        tvError     = findViewById(R.id.tvError);

        // Configura a lista para exibir um item abaixo do outro
        rvExercises.setLayoutManager(new LinearLayoutManager(this));

        // Botão de voltar
        findViewById(R.id.ivBack).setOnClickListener(v -> finish());
    }

    private void carregarExercicios() {
        // Esconde o carregamento e o erro por enquanto
        progressBar.setVisibility(View.GONE);
        tvError.setVisibility(View.GONE);

        // Lista de exercícios fixa para teste (Mock)
        List<Exercise> exercises = new ArrayList<>();

        exercises.add(new Exercise(1, "Gato e vaca", "Descrição...",
                "android.resource://" + getPackageName() + "/" + R.drawable.gato_e_vaca, null, "02.30 Minutes"));

        exercises.add(new Exercise(2, "Ponte", "Descrição...",
                "android.resource://" + getPackageName() + "/" + R.drawable.ponte, null, "03.00 Minutes"));

        exercises.add(new Exercise(3, "Superman", "Descrição...",
                "android.resource://" + getPackageName() + "/" + R.drawable.superman, null, "04.00 Minutes"));

        exercises.add(new Exercise(4, "Extensão toráxica", "Descrição...",
                "android.resource://" + getPackageName() + "/" + R.drawable.extensao_toraxica, null, "05.00 Minutes"));

        exercises.add(new Exercise(5, "Postura da criança", "Descrição...",
                "android.resource://" + getPackageName() + "/" + R.drawable.postura_crianca, null, "06.00 Minutes"));

        // Configura o adapter e define o que acontece ao clicar no exercício
        ExerciseAdapter adapter = new ExerciseAdapter(
                this,
                exercises,
                exercise -> abrirDetalhe(exercise)
        );

        rvExercises.setAdapter(adapter);
        rvExercises.setVisibility(View.VISIBLE);
    }

    // Leva os dados do exercício para a tela de detalhes
    private void abrirDetalhe(Exercise exercise) {
        Intent intent = new Intent(this, ExerciseDetailActivity.class);
        intent.putExtra("EXERCISE_TITLE",       exercise.getTitle());
        intent.putExtra("EXERCISE_DESCRIPTION", exercise.getDescription());
        intent.putExtra("EXERCISE_IMAGE_URL",   exercise.getImageUrl());
        intent.putExtra("EXERCISE_FREQUENCY",   exercise.getFrequency());
        startActivity(intent);
    }

    // Pega o token salvo no celular
    private String getToken() {
        SharedPreferences prefs = getSharedPreferences("auth", MODE_PRIVATE);
        return prefs.getString("token", "");
    }
}