package com.example.mayarpgapp;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.ImageView;
import android.widget.ProgressBar;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

import com.example.mayarpgapp.api.ApiService;
import com.example.mayarpgapp.api.RetrofitClient;
import com.example.mayarpgapp.model.Consulta;
import com.example.mayarpgapp.model.PlanoExercicio;
import com.example.mayarpgapp.model.Progresso;
import com.google.android.material.button.MaterialButton;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.List;
import java.util.Locale;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class HomeActivity extends AppCompatActivity {

    // ── Cabeçalho ──
    private TextView txtSaudacao;
    private TextView txtSubtituloCheckin;

    // ── Calendário ──
    private ImageView[] circulosDosDias;

    // ── Botão check-in ──
    private MaterialButton btnRegistrar;

    // ── Estatísticas ──
    private TextView txtEstatistica1, txtEstatistica2, txtEstatistica3;

    // ── Seção Plano ──
    private View sectionPlano;
    private TextView txtPlanoNome, txtPlanoDuracao, txtPlanoNivel, btnVerPlano;

    // ── Seção Consultas ──
    private View sectionConsultas;
    private TextView txtConsultaTipo, txtConsultaMedico, txtConsultaData, txtConsultaHorario;
    private TextView btnVerConsultas;

    // ── Seção Progresso ──
    private View sectionProgresso;
    private TextView txtProgressoPercentual, txtProgEmProgresso, txtProgCompleto, txtProgProximos;
    private ProgressBar progressBar;
    private TextView btnVerProgresso;

    // ── Token do usuário ──
    private String token;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home);

        // Recupera o token salvo (ajuste conforme sua implementação de login)
        token = "Bearer " + getSharedPreferences("prefs", MODE_PRIVATE)
                .getString("token", "");

        inicializarViews();
        configurarSaudacao();
        configurarDataCheckin();
        configurarCalendarioSemanal();
        configurarBotoes();

        // Chamadas à API
        carregarDadosHome();
    }

    // ─────────────────────────────────────────────────────────
    // INICIALIZAÇÃO DE VIEWS
    // ─────────────────────────────────────────────────────────
    private void inicializarViews() {
        txtSaudacao         = findViewById(R.id.txt_saudacao);
        txtSubtituloCheckin = findViewById(R.id.subtitulo_checkin);
        btnRegistrar        = findViewById(R.id.btn_registrar);

        circulosDosDias = new ImageView[]{
                findViewById(R.id.dia_dom),
                findViewById(R.id.dia_seg),
                findViewById(R.id.dia_ter),
                findViewById(R.id.dia_qua),
                findViewById(R.id.dia_qui),
                findViewById(R.id.dia_sex),
                findViewById(R.id.dia_sab)
        };

        txtEstatistica1 = findViewById(R.id.txt_estatistica_1);
        txtEstatistica2 = findViewById(R.id.txt_estatistica_2);
        txtEstatistica3 = findViewById(R.id.txt_estatistica_3);

        // Plano
        sectionPlano    = findViewById(R.id.section_plano);
        txtPlanoNome    = findViewById(R.id.txt_plano_nome);
        txtPlanoDuracao = findViewById(R.id.txt_plano_duracao);
        txtPlanoNivel   = findViewById(R.id.txt_plano_nivel);
        btnVerPlano     = findViewById(R.id.btn_ver_plano);

        // Consultas
        sectionConsultas   = findViewById(R.id.section_consultas);
        txtConsultaTipo    = findViewById(R.id.txt_consulta_tipo);
        txtConsultaMedico  = findViewById(R.id.txt_consulta_medico);
        txtConsultaData    = findViewById(R.id.txt_consulta_data);
        txtConsultaHorario = findViewById(R.id.txt_consulta_horario);
        btnVerConsultas    = findViewById(R.id.btn_ver_consultas);

        // Progresso
        sectionProgresso      = findViewById(R.id.section_progresso);
        txtProgressoPercentual= findViewById(R.id.txt_progresso_percentual);
        progressBar           = findViewById(R.id.progress_bar);
        txtProgEmProgresso    = findViewById(R.id.txt_prog_em_progresso);
        txtProgCompleto       = findViewById(R.id.txt_prog_completo);
        txtProgProximos       = findViewById(R.id.txt_prog_proximos);
        btnVerProgresso       = findViewById(R.id.btn_ver_progresso);
    }

    // ─────────────────────────────────────────────────────────
    // SAUDAÇÃO DINÂMICA
    // ─────────────────────────────────────────────────────────
    private void configurarSaudacao() {
        int hora = Calendar.getInstance().get(Calendar.HOUR_OF_DAY);
        String saudacao;
        if (hora >= 5 && hora < 12) {
            saudacao = "Bom dia, Raquel";
        } else if (hora >= 12 && hora < 18) {
            saudacao = "Boa tarde, Raquel";
        } else {
            saudacao = "Boa noite, Raquel";
        }
        txtSaudacao.setText(saudacao);
    }

    // ─────────────────────────────────────────────────────────
    // DATA DINÂMICA NO CARD DE CHECK-IN
    // ─────────────────────────────────────────────────────────
    private void configurarDataCheckin() {
        SimpleDateFormat sdf = new SimpleDateFormat("EEEE, dd 'de' MMMM", new Locale("pt", "BR"));
        txtSubtituloCheckin.setText(sdf.format(Calendar.getInstance().getTime()));
    }

    // ─────────────────────────────────────────────────────────
    // CALENDÁRIO SEMANAL
    // ─────────────────────────────────────────────────────────
    private void configurarCalendarioSemanal() {
        Calendar calendario = Calendar.getInstance(new Locale("pt", "BR"));
        int diaSemanaHoje = calendario.get(Calendar.DAY_OF_WEEK);

        // TODO: substituir pelo histórico real vindo da API (getHistorico)
        boolean[] historicoCheckins = {false, true, true, true, false, false, false};

        for (int i = 0; i < circulosDosDias.length; i++) {
            int diaDoLoop = i + 1;
            circulosDosDias[i].setAlpha(1f);

            if (historicoCheckins[i]) {
                circulosDosDias[i].setBackgroundResource(R.drawable.circulo_feito);
                circulosDosDias[i].setImageResource(R.drawable.ic_check);
            } else if (diaDoLoop > diaSemanaHoje) {
                circulosDosDias[i].setBackgroundResource(R.drawable.circulo_pendente);
                circulosDosDias[i].setImageDrawable(null);
            } else {
                circulosDosDias[i].setBackgroundResource(R.drawable.circulo_pendente);
                circulosDosDias[i].setImageResource(R.drawable.ic_check);
                circulosDosDias[i].setAlpha(0.3f);
            }
        }
    }

    // ─────────────────────────────────────────────────────────
    // BOTÕES E NAVEGAÇÃO
    // ─────────────────────────────────────────────────────────
    private void configurarBotoes() {
        btnRegistrar.setOnClickListener(v ->
                startActivity(new Intent(this, CheckinActivity.class)));

        btnVerPlano.setOnClickListener(v ->
                startActivity(new Intent(this, ExercisesActivity.class)));

        // Ajuste o destino abaixo conforme suas Activities de consultas e progresso
        btnVerConsultas.setOnClickListener(v ->
                startActivity(new Intent(this, AgendaActivity.class)));

        btnVerProgresso.setOnClickListener(v ->
                startActivity(new Intent(this, CheckinActivity.class))); // troque se tiver ProgressoActivity
    }

    // ─────────────────────────────────────────────────────────
    // CARREGA TODOS OS DADOS DA HOME VIA API
    // ─────────────────────────────────────────────────────────
    private void carregarDadosHome() {
        ApiService api = RetrofitClient.getInstance().create(ApiService.class);
        carregarPlano(api);
        carregarConsultas(api);
        carregarProgresso(api);
    }

    // ── Plano de exercício ──────────────────────────────────
    private void carregarPlano(ApiService api) {
        api.getPlanoExercicio(token).enqueue(new Callback<PlanoExercicio>() {
            @Override
            public void onResponse(Call<PlanoExercicio> call, Response<PlanoExercicio> response) {
                if (response.isSuccessful() && response.body() != null) {
                    PlanoExercicio plano = response.body();
                    if (plano.temExercicios()) {
                        exibirPlano(plano);
                    }
                    // Se não tiver exercícios, a seção permanece GONE
                }
                // Se 404 ou erro, seção permanece GONE
            }

            @Override
            public void onFailure(Call<PlanoExercicio> call, Throwable t) {
                // Sem conexão: seção permanece oculta silenciosamente
            }
        });
    }

    private void exibirPlano(PlanoExercicio plano) {
        sectionPlano.setVisibility(View.VISIBLE);
        txtPlanoNome.setText(plano.getNome());
        txtPlanoDuracao.setText(plano.getDuracaoTotal());
        txtPlanoNivel.setText(plano.getNivel());

        // Atualiza estatísticas (card 1 = total de exercícios do plano)
        if (plano.getExercicios() != null) {
            txtEstatistica1.setText(String.valueOf(plano.getExercicios().size()));
        }
    }

    // ── Consultas ──────────────────────────────────────────
    private void carregarConsultas(ApiService api) {
        api.getConsultas(token).enqueue(new Callback<List<Consulta>>() {
            @Override
            public void onResponse(Call<List<Consulta>> call, Response<List<Consulta>> response) {
                if (response.isSuccessful() && response.body() != null) {
                    List<Consulta> consultas = response.body();
                    if (!consultas.isEmpty()) {
                        exibirConsultas(consultas);
                    }
                }
            }

            @Override
            public void onFailure(Call<List<Consulta>> call, Throwable t) {
                // Seção permanece oculta
            }
        });
    }

    private void exibirConsultas(List<Consulta> consultas) {
        // Mostra sempre a primeira (próxima) consulta
        Consulta proxima = consultas.get(0);

        sectionConsultas.setVisibility(View.VISIBLE);
        txtConsultaTipo.setText(proxima.getTipo());
        txtConsultaMedico.setText("com " + proxima.getMedico());
        txtConsultaData.setText(formatarData(proxima.getData()));
        txtConsultaHorario.setText(proxima.getHorarioInicio() + " - " + proxima.getHorarioFim());

        // Atualiza estatísticas (card 2 = total de consultas agendadas)
        long agendadas = 0;
        for (Consulta c : consultas) {
            if (!c.isConcluida()) agendadas++;
        }
        txtEstatistica2.setText(String.valueOf(agendadas));
    }

    // ── Progresso ──────────────────────────────────────────
    private void carregarProgresso(ApiService api) {
        api.getProgresso(token).enqueue(new Callback<Progresso>() {
            @Override
            public void onResponse(Call<Progresso> call, Response<Progresso> response) {
                if (response.isSuccessful() && response.body() != null) {
                    Progresso progresso = response.body();
                    if (progresso.temDados()) {
                        exibirProgresso(progresso);
                    }
                }
            }

            @Override
            public void onFailure(Call<Progresso> call, Throwable t) {
                // Seção permanece oculta
            }
        });
    }

    private void exibirProgresso(Progresso progresso) {
        sectionProgresso.setVisibility(View.VISIBLE);
        txtProgressoPercentual.setText(progresso.getPercentual() + "%");
        progressBar.setProgress(progresso.getPercentual());
        txtProgEmProgresso.setText(String.valueOf(progresso.getEmProgresso()));
        txtProgCompleto.setText(String.valueOf(progresso.getCompleto()));
        txtProgProximos.setText(String.valueOf(progresso.getProximos()));

        // Atualiza estatísticas (card 3 = dias perdidos = total - completo)
        txtEstatistica3.setText(String.valueOf(progresso.getProximos()));
    }

    // ─────────────────────────────────────────────────────────
    // UTILITÁRIOS
    // ─────────────────────────────────────────────────────────

    /**
     * Converte "2025-05-15" → "Quinta, 15 de Maio"
     * Ajuste o formato conforme o que a sua API retorna.
     */
    private String formatarData(String dataISO) {
        try {
            SimpleDateFormat entrada = new SimpleDateFormat("yyyy-MM-dd", Locale.getDefault());
            SimpleDateFormat saida   = new SimpleDateFormat("EEEE, dd 'de' MMMM", new Locale("pt", "BR"));
            return saida.format(entrada.parse(dataISO));
        } catch (Exception e) {
            return dataISO; // retorna o original se falhar
        }
    }
}