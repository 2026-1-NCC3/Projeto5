package com.example.mayarpgapp;

import android.os.Bundle;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;
import com.bumptech.glide.Glide;

public class ExerciseDetailActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_exercise_detail);

        initViews();
    }

    private void initViews() {
        ImageView ivImage    = findViewById(R.id.ivExerciseImage);
        TextView tvTitle     = findViewById(R.id.tvExerciseTitle);
        TextView tvFrequency = findViewById(R.id.tvFrequency);
        TextView tvDesc      = findViewById(R.id.tvDescription);
        Button btnConcluir   = findViewById(R.id.btnConcluir);

        // Recebe os dados da ExercisesActivity
        String title       = getIntent().getStringExtra("EXERCISE_TITLE");
        String description = getIntent().getStringExtra("EXERCISE_DESCRIPTION");
        String imageUrl    = getIntent().getStringExtra("EXERCISE_IMAGE_URL");
        String frequency   = getIntent().getStringExtra("EXERCISE_FREQUENCY");

        // Preenche os campos
        tvTitle.setText(title != null ? title : "Exercício");

        tvFrequency.setText(
                frequency != null && !frequency.isEmpty() ? frequency : "Frequência não definida"
        );

        tvDesc.setText(
                description != null && !description.isEmpty() ? description : "Sem orientações cadastradas."
        );

        // Carrega imagem com Glide
        if (imageUrl != null && !imageUrl.isEmpty()) {
            Glide.with(this)
                    .load(imageUrl)
                    .placeholder(R.drawable.ic_exercise_placeholder)
                    .error(R.drawable.ic_exercise_placeholder)
                    .centerCrop()
                    .into(ivImage);
        }

        // Botão voltar
        findViewById(R.id.ivBack).setOnClickListener(v -> finish());

        // Botão concluir
        btnConcluir.setOnClickListener(v -> {
            btnConcluir.setText("Concluído ✓");
            btnConcluir.setEnabled(false);
            btnConcluir.setAlpha(0.6f);
            Toast.makeText(this, "Exercício marcado como concluído!", Toast.LENGTH_SHORT).show();
        });
    }
}
