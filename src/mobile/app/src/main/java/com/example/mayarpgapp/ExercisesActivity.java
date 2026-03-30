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
import java.util.ArrayList; // Importante para a lista manual
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
        // Agora o Java vai encontrar esses IDs no seu novo XML!
        rvExercises = findViewById(R.id.rvExercises);
        progressBar = findViewById(R.id.progressBar);
        tvError     = findViewById(R.id.tvError);

        rvExercises.setLayoutManager(new LinearLayoutManager(this));

        findViewById(R.id.ivBack).setOnClickListener(v -> finish());
    }

    private void carregarExercicios() {
        // Como os dados são manuais, escondemos o carregamento e o erro
        progressBar.setVisibility(View.GONE);
        tvError.setVisibility(View.GONE);

        // Criando os dados simulados (MOCK)
        List<Exercise> exercises = new ArrayList<>();

        // Aqui você preenche os dados que vão aparecer nos Cards
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

        // O Adapter pega o seu item_exercise.xml e "imprime" esses dados nele
        ExerciseAdapter adapter = new ExerciseAdapter(
                this,
                exercises,
                exercise -> abrirDetalhe(exercise)
        );

        rvExercises.setAdapter(adapter);
        rvExercises.setVisibility(View.VISIBLE);
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