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

/**
 * Activity que exibe os detalhes completos de um exercício selecionado.
 * Recebe os dados do exercício via Intent (extras) e os exibe na tela,
 * além de permitir que o usuário marque o exercício como concluído.
 */
public class ExerciseDetailActivity extends AppCompatActivity {

    /**
     * Ponto de entrada da Activity.
     * Infla o layout da tela de detalhe e delega a inicialização das views
     * para o método initViews().
     */
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_exercise_detail);

        initViews();
    }

    /**
     * Centraliza toda a configuração da tela:
     * - Liga as variáveis às views do XML
     * - Monta os passos do exercício
     * - Preenche os dados recebidos via Intent
     * - Configura os listeners de clique
     */
    private void initViews() {

        // ── Referências às views do layout ──────────────────────────────────
        ImageView ivImage    = findViewById(R.id.ivExerciseImage);   // Imagem principal do exercício
        ImageButton ivBack   = findViewById(R.id.ivBack);            // Botão de voltar (seta no topo)
        TextView tvTitle     = findViewById(R.id.tvExerciseTitle);   // Nome do exercício
        TextView tvFrequency = findViewById(R.id.tvFrequency);       // Frequência recomendada
        TextView tvDesc      = findViewById(R.id.tvDescription);     // Descrição/orientações
        Button btnConcluir   = findViewById(R.id.btnConcluir);       // Botão de marcar como concluído

        // ── Passo a passo do exercício ───────────────────────────────────────
        // Cada "step" é um bloco de layout reutilizável (include) que contém
        // um número e um texto instrucional. setupStep() os preenche.
        View step1 = findViewById(R.id.step1);
        View step2 = findViewById(R.id.step2);
        View step3 = findViewById(R.id.step3);

        setupStep(step1, "1", "Posicione-se conforme indicado pela Dra. Maya.");
        setupStep(step2, "2", "Execute o movimento de forma lenta e controlada.");
        setupStep(step3, "3", "Mantenha a respiração fluida durante o exercício.");

        // ── Leitura dos dados enviados pela tela anterior via Intent ─────────
        // Esses extras são preenchidos por quem abriu esta Activity
        // (geralmente ao clicar num card de exercício).
        String title       = getIntent().getStringExtra("EXERCISE_TITLE");
        String description = getIntent().getStringExtra("EXERCISE_DESCRIPTION");
        String imageUrl    = getIntent().getStringExtra("EXERCISE_IMAGE_URL");
        String frequency   = getIntent().getStringExtra("EXERCISE_FREQUENCY");

        // ── Preenchimento das views com os dados recebidos ───────────────────
        // Fallbacks garantem que nenhum campo fique vazio na tela
        tvTitle.setText(title != null ? title : "Exercício");
        tvFrequency.setText(frequency != null && !frequency.isEmpty() ? frequency : "Frequência não definida");
        tvDesc.setText(description != null && !description.isEmpty() ? description : "Sem orientações cadastradas.");

        // Carrega a imagem com Glide somente se a URL for válida;
        // caso contrário o placeholder já definido no XML permanece visível.
        if (imageUrl != null && !imageUrl.isEmpty()) {
            Glide.with(this)
                    .load(imageUrl)
                    .placeholder(R.drawable.ic_exercise_placeholder) // Exibido durante o carregamento
                    .error(R.drawable.ic_exercise_placeholder)       // Exibido se a URL falhar
                    .centerCrop()                                    // Recorta a imagem para preencher o espaço
                    .into(ivImage);
        }

        // ── Listeners de clique ──────────────────────────────────────────────

        // Botão de voltar: encerra a Activity e retorna à tela anterior
        ivBack.setOnClickListener(v -> finish());

        // Botão "Concluir": marca o exercício como feito visualmente.
        // - Altera o texto e desabilita o botão para evitar cliques duplos
        // - Deixa o botão acinzentado e semi-transparente como feedback visual
        // - Exibe um Toast de parabenização
        btnConcluir.setOnClickListener(v -> {
            btnConcluir.setText("Concluído ✓");
            btnConcluir.setEnabled(false);
            btnConcluir.setBackgroundTintList(getColorStateList(android.R.color.darker_gray));
            btnConcluir.setAlpha(0.7f); // Reduz a opacidade para reforçar o estado desabilitado
            Toast.makeText(this, "Parabéns! Exercício concluído.", Toast.LENGTH_SHORT).show();
        });
    }

    /**
     * Preenche um bloco de passo (step) com seu número e texto instrucional.
     *
     * Cada stepView é um layout reutilizável incluído via <include> no XML,
     * contendo dois TextViews: o número do passo e a instrução correspondente.
     *
     * @param stepView A view raiz do bloco de passo (step1, step2 ou step3)
     * @param number   O número exibido no círculo do passo (ex: "1", "2", "3")
     * @param text     A instrução textual daquele passo
     */
    private void setupStep(View stepView, String number, String text) {
        TextView tvNumber = stepView.findViewById(R.id.tvStepNumber); // Círculo numerado
        TextView tvText   = stepView.findViewById(R.id.tvStepText);   // Texto da instrução

        tvNumber.setText(number);
        tvText.setText(text);
    }
}