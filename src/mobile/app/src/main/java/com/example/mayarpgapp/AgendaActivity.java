package com.example.mayarpgapp;

import android.os.Bundle;
import android.widget.TextView;
import androidx.appcompat.app.AppCompatActivity;

/**
 * Activity que exibe a agenda de consultas do paciente.
 * Mostra a próxima consulta em destaque e lista as consultas agendadas.
 * Os dados estão fixos no layout por enquanto (hardcoded no XML).
 */
public class AgendaActivity extends AppCompatActivity {

    // ── Views do card "Próxima Consulta" ─────────────────────────────────────
    private TextView tvEmUmDia;           // Badge "Em 1 dia"
    private TextView tvDataProxima;       // Data da próxima consulta
    private TextView tvAvatarProxima;     // Iniciais da médica no círculo avatar
    private TextView tvNomeProxima;       // Nome da médica
    private TextView tvEspecialidadeProxima; // Especialidade + horário

    // ── Views do filtro de meses ─────────────────────────────────────────────
    private TextView btnAbril;   // Mês Abril (começa selecionado)
    private TextView btnMaio;    // Mês Maio
    private TextView btnJunho;   // Mês Junho
    private TextView btnJulho;   // Mês Julho
    private TextView btnAgosto;  // Mês Agosto

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_agenda);

        initViews();
    }

    /**
     * Liga as variáveis às views do XML e configura o filtro de meses.
     * Os dados das consultas estão definidos diretamente no layout (android:text),
     * então não é necessário preenchê-los via código por enquanto.
     */
    private void initViews() {

        // Card próxima consulta
        tvEmUmDia              = findViewById(R.id.tv_em_1_dia);
        tvDataProxima          = findViewById(R.id.tv_data_proxima);
        tvAvatarProxima        = findViewById(R.id.tv_avatar_proxima);
        tvNomeProxima          = findViewById(R.id.tv_nome_proxima);
        tvEspecialidadeProxima = findViewById(R.id.tv_especialidade_proxima);

        // Filtro de meses
        btnAbril  = findViewById(R.id.btn_abril);
        btnMaio   = findViewById(R.id.btn_maio);
        btnJunho  = findViewById(R.id.btn_junho);
        btnJulho  = findViewById(R.id.btn_julho);
        btnAgosto = findViewById(R.id.btn_agosto);

        // Configura o comportamento de seleção dos botões de mês
        setupFiltroMeses();
    }

    /**
     * Configura os botões de filtro de mês.
     * Ao clicar em um mês, ele fica visualmente selecionado
     * e os outros voltam ao estado normal.
     */
    private void setupFiltroMeses() {
        TextView[] meses = {btnAbril, btnMaio, btnJunho, btnJulho, btnAgosto};

        for (TextView mes : meses) {
            mes.setOnClickListener(v -> {
                // Remove a seleção de todos os meses
                for (TextView m : meses) {
                    m.setBackgroundResource(R.drawable.bg_month_unselected);
                    m.setTextColor(getColor(android.R.color.darker_gray));
                }
                // Aplica a seleção no mês clicado
                mes.setBackgroundResource(R.drawable.bg_month_selected);
                mes.setTextColor(getColor(android.R.color.white));
            });
        }
    }
}