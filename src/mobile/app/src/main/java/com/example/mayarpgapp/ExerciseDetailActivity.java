package com.example.mayarpgapp;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.ImageButton;
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
        ImageView ivImage      = findViewById(R.id.ivExerciseImage);
        ImageButton ivBack     = findViewById(R.id.ivBack);
        TextView tvTitle       = findViewById(R.id.tvExerciseTitle);
        TextView tvFrequency   = findViewById(R.id.tvFrequency);
        TextView tvDesc        = findViewById(R.id.tvDescription);
        Button btnConcluir     = findViewById(R.id.btnConcluir);

        View step1 = findViewById(R.id.step1);
        View step2 = findViewById(R.id.step2);
        View step3 = findViewById(R.id.step3);

        setupStep(step1, "1", "Posicione-se conforme indicado pela Dra. Maya.");
        setupStep(step2, "2", "Execute o movimento de forma lenta e controlada.");
        setupStep(step3, "3", "Mantenha a respiração fluida durante o exercício.");

        String title       = getIntent().getStringExtra("EXERCISE_TITLE");
        String description = getIntent().getStringExtra("EXERCISE_DESCRIPTION");
        String imageUrl    = getIntent().getStringExtra("EXERCISE_IMAGE_URL");
        String frequency   = getIntent().getStringExtra("EXERCISE_FREQUENCY");

        tvTitle.setText(title != null ? title : "Exercício");
        tvFrequency.setText(frequency != null && !frequency.isEmpty() ? frequency : "Frequência não definida");
        tvDesc.setText(description != null && !description.isEmpty() ? description : "Sem orientações cadastradas.");

        if (imageUrl != null && !imageUrl.isEmpty()) {
            Glide.with(this)
                    .load(imageUrl)
                    .placeholder(R.drawable.ic_exercise_placeholder)
                    .error(R.drawable.ic_exercise_placeholder)
                    .centerCrop()
                    .into(ivImage);
        }

        ivBack.setOnClickListener(v -> finish());

        btnConcluir.setOnClickListener(v -> {
            btnConcluir.setText("Concluído ✓");
            btnConcluir.setEnabled(false);
            btnConcluir.setBackgroundTintList(getColorStateList(android.R.color.darker_gray));
            btnConcluir.setAlpha(0.7f);
            Toast.makeText(this, "Parabéns! Exercício concluído.", Toast.LENGTH_SHORT).show();
        });
    }

    private void setupStep(View stepView, String number, String text) {
        TextView tvNumber = stepView.findViewById(R.id.tvStepNumber);
        TextView tvText   = stepView.findViewById(R.id.tvStepText);

        tvNumber.setText(number);
        tvText.setText(text);
    }
}