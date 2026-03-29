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
import java.util.List;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class ExercisesActivity extends AppCompatActivity {

    private RecyclerView rvExercises;
    private ProgressBar progressBar;
    private TextView tvError;
    private ApiService apiService;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_exercises);

        apiService = RetrofitClient.getInstance().create(ApiService.class);

        initViews();
        carregarExercicios();
    }

    private void initViews() {
        rvExercises = findViewById(R.id.rvExercises);
        progressBar = findViewById(R.id.progressBar);
        tvError     = findViewById(R.id.tvError);

        rvExercises.setLayoutManager(new LinearLayoutManager(this));

        findViewById(R.id.ivBack).setOnClickListener(v -> finish());
    }

    // =========================================================
    // GET /api/exercises
    // =========================================================
    private void carregarExercicios() {
        progressBar.setVisibility(View.VISIBLE);
        rvExercises.setVisibility(View.GONE);
        tvError.setVisibility(View.GONE);

        String token = "Bearer " + getToken();

        apiService.getExercises(token).enqueue(new Callback<List<Exercise>>() {
            @Override
            public void onResponse(Call<List<Exercise>> call, Response<List<Exercise>> response) {
                progressBar.setVisibility(View.GONE);

                if (response.isSuccessful() && response.body() != null) {
                    List<Exercise> exercises = response.body();

                    ExerciseAdapter adapter = new ExerciseAdapter(
                            ExercisesActivity.this,
                            exercises,
                            exercise -> abrirDetalhe(exercise)
                    );

                    rvExercises.setAdapter(adapter);
                    rvExercises.setVisibility(View.VISIBLE);
                } else {
                    tvError.setText("Erro ao carregar exercícios.");
                    tvError.setVisibility(View.VISIBLE);
                }
            }

            @Override
            public void onFailure(Call<List<Exercise>> call, Throwable t) {
                progressBar.setVisibility(View.GONE);
                tvError.setText("Erro de conexão. Verifique sua internet.");
                tvError.setVisibility(View.VISIBLE);
            }
        });
    }

    private void abrirDetalhe(Exercise exercise) {
        Intent intent = new Intent(this, ExerciseDetailActivity.class);
        intent.putExtra("EXERCISE_TITLE",       exercise.getTitle());
        intent.putExtra("EXERCISE_DESCRIPTION", exercise.getDescription());
        intent.putExtra("EXERCISE_IMAGE_URL",   exercise.getImageUrl());
        intent.putExtra("EXERCISE_FREQUENCY",   exercise.getFrequency());
        startActivity(intent);
    }

    private String getToken() {
        SharedPreferences prefs = getSharedPreferences("auth", MODE_PRIVATE);
        return prefs.getString("token", "");
    }
}