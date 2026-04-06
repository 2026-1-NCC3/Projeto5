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

/**
 * Activity que exibe a lista de exercícios disponíveis para o usuário.
 * Atualmente usa dados simulados (mock) locais, mas já tem a estrutura
 * preparada para consumir uma API real via Retrofit no futuro.
 */
public class ExercisesActivity extends AppCompatActivity {

    // ── Views da tela ────────────────────────────────────────────────────────
    private RecyclerView rvExercises; // Lista rolável que exibe os cards de exercício
    private ProgressBar progressBar;  // Indicador de carregamento (oculto no modo mock)
    private TextView tvError;         // Mensagem de erro (oculta no modo mock)

    // Serviço de API criado pelo Retrofit — pronto para chamadas reais quando necessário
    private ApiService apiService;

    /**
     * Ponto de entrada da Activity.
     * Inicializa o Retrofit, configura as views e carrega os exercícios.
     */
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_exercises);

        // Cria a instância do serviço de API (ainda não é usado, mas já está pronto)
        apiService = RetrofitClient.getInstance().create(ApiService.class);

        initViews();
        carregarExercicios();
    }

    /**
     * Liga as variáveis às views do XML, configura o layout do RecyclerView
     * e define o listener do botão de voltar.
     */
    private void initViews() {
        rvExercises = findViewById(R.id.rvExercises);
        progressBar = findViewById(R.id.progressBar);
        tvError     = findViewById(R.id.tvError);

        // LinearLayoutManager exibe os cards em uma lista vertical, um abaixo do outro
        rvExercises.setLayoutManager(new LinearLayoutManager(this));

        // Botão de voltar: encerra a Activity e retorna à tela anterior
        findViewById(R.id.ivBack).setOnClickListener(v -> finish());
    }

    /**
     * Popula o RecyclerView com dados simulados (mock) locais.
     *
     * Como não há chamada de rede, o ProgressBar e o TextView de erro
     * são ocultados imediatamente. Quando a integração com a API for feita,
     * este método deve ser substituído por uma chamada Retrofit real,
     * exibindo o ProgressBar durante o carregamento e tvError em caso de falha.
     */
    private void carregarExercicios() {
        // Modo mock: esconde os estados de loading e erro, pois não há espera de rede
        progressBar.setVisibility(View.GONE);
        tvError.setVisibility(View.GONE);

        // ── Dados simulados ──────────────────────────────────────────────────
        // Cada Exercise recebe: id, título, descrição, URL da imagem (drawable local),
        // campo nulo reservado para uso futuro, e duração/frequência.
        // A URL "android.resource://..." permite referenciar drawables como se fossem URLs,
        // compatível com o Glide usado no adapter.
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

        // ── Configuração do Adapter ──────────────────────────────────────────
        // O adapter recebe a lista e um lambda que define o que acontece
        // quando o usuário toca em um card: abre a tela de detalhe do exercício.
        ExerciseAdapter adapter = new ExerciseAdapter(
                this,
                exercises,
                exercise -> abrirDetalhe(exercise) // Callback de clique
        );

        rvExercises.setAdapter(adapter);
        rvExercises.setVisibility(View.VISIBLE); // Torna a lista visível após o adapter estar pronto
    }

    /**
     * Abre a tela de detalhe de um exercício, passando seus dados via Intent extras.
     * A ExerciseDetailActivity lê esses extras para montar a tela.
     *
     * @param exercise O exercício que o usuário tocou na lista
     */
    private void abrirDetalhe(Exercise exercise) {
        Intent intent = new Intent(this, ExerciseDetailActivity.class);
        intent.putExtra("EXERCISE_TITLE",       exercise.getTitle());
        intent.putExtra("EXERCISE_DESCRIPTION", exercise.getDescription());
        intent.putExtra("EXERCISE_IMAGE_URL",   exercise.getImageUrl());
        intent.putExtra("EXERCISE_FREQUENCY",   exercise.getFrequency());
        startActivity(intent);
    }

    /**
     * Recupera o token de autenticação salvo no SharedPreferences.
     * Será usado futuramente para autenticar as requisições à API real.
     *
     * @return O token salvo, ou uma string vazia se não houver nenhum
     */
    private String getToken() {
        SharedPreferences prefs = getSharedPreferences("auth", MODE_PRIVATE);
        return prefs.getString("token", "");
    }
}