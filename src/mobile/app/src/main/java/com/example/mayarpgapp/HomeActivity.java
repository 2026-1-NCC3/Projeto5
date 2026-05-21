package com.example.mayarpgapp;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.ProgressBar;
import android.widget.TextView;

import com.google.android.material.button.MaterialButton;

import com.example.mayarpgapp.api.ApiService;
import com.example.mayarpgapp.api.RetrofitClient;
import com.example.mayarpgapp.model.CheckinResponse;
import com.example.mayarpgapp.model.Paciente;
import com.example.mayarpgapp.model.PlanoExercicio;
import com.example.mayarpgapp.model.Progresso;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.List;
import java.util.Locale;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class HomeActivity extends BaseActivity {

    private TextView txtSaudacao;
    private ApiService apiService;

    // Círculos da semana (DOM=0 … SAB=6)
    private ImageView[] diasSemana;
    private ImageView[] diasCheck;
    private TextView[]  diasNum;

    // Views do plano de exercício
    private LinearLayout sectionPlano;
    private TextView txtPlanoNome, txtPlanoDuracao, txtPlanoNivel, btnVerPlano;

    // Views da seção de progresso
    private LinearLayout sectionProgresso;
    private TextView txtProgressoPercentual;
    private ProgressBar progressBar;
    private TextView txtProgEmProgresso, txtProgCompleto, txtProgProximos;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        String token = getSharedPreferences("APP", MODE_PRIVATE).getString("TOKEN", "");
        RetrofitClient.setToken(token);
        apiService = RetrofitClient.getInstance().create(ApiService.class);

        txtSaudacao = findViewById(R.id.txt_saudacao);
        txtSaudacao.setText(saudacaoPorHora(""));

        // Círculos da semana — ordem: DOM SEG TER QUA QUI SEX SAB
        diasSemana = new ImageView[]{
                findViewById(R.id.dia_dom),
                findViewById(R.id.dia_seg),
                findViewById(R.id.dia_ter),
                findViewById(R.id.dia_qua),
                findViewById(R.id.dia_qui),
                findViewById(R.id.dia_sex),
                findViewById(R.id.dia_sab)
        };

        diasCheck = new ImageView[]{
                findViewById(R.id.dia_dom_check),
                findViewById(R.id.dia_seg_check),
                findViewById(R.id.dia_ter_check),
                findViewById(R.id.dia_qua_check),
                findViewById(R.id.dia_qui_check),
                findViewById(R.id.dia_sex_check),
                findViewById(R.id.dia_sab_check)
        };

        diasNum = new TextView[]{
                findViewById(R.id.dia_dom_num),
                findViewById(R.id.dia_seg_num),
                findViewById(R.id.dia_ter_num),
                findViewById(R.id.dia_qua_num),
                findViewById(R.id.dia_qui_num),
                findViewById(R.id.dia_sex_num),
                findViewById(R.id.dia_sab_num)
        };

        // Preenche os números reais de cada dia da semana atual
        preencherNumerosDias();

        // Views do plano
        sectionPlano    = findViewById(R.id.section_plano);
        txtPlanoNome    = findViewById(R.id.txt_plano_nome);
        txtPlanoDuracao = findViewById(R.id.txt_plano_duracao);
        txtPlanoNivel   = findViewById(R.id.txt_plano_nivel);
        btnVerPlano     = findViewById(R.id.btn_ver_plano);

        // Views de progresso
        sectionProgresso       = findViewById(R.id.section_progresso);
        txtProgressoPercentual = findViewById(R.id.txt_progresso_percentual);
        progressBar            = findViewById(R.id.progress_bar);
        txtProgEmProgresso     = findViewById(R.id.txt_prog_em_progresso);
        txtProgCompleto        = findViewById(R.id.txt_prog_completo);
        txtProgProximos        = findViewById(R.id.txt_prog_proximos);

        carregarNomePaciente();
        carregarCheckinsDaSemana();
        carregarPlanoExercicio();
        carregarProgresso();

        // Botão registrar check-in
        MaterialButton btnRegistrar = findViewById(R.id.btn_registrar);
        btnRegistrar.setOnClickListener(v ->
                startActivity(new Intent(HomeActivity.this, CheckinActivity.class))
        );

        // "Ver todos" do plano → abre tela de exercícios
        btnVerPlano.setOnClickListener(v ->
                startActivity(new Intent(HomeActivity.this, ExercisesActivity.class))
        );
    }

    // ─── Calendário semanal ──────────────────────────────────────────

    private void carregarCheckinsDaSemana() {
        apiService.getMeusCheckins().enqueue(new Callback<List<CheckinResponse>>() {
            @Override
            public void onResponse(Call<List<CheckinResponse>> call, Response<List<CheckinResponse>> response) {
                if (!response.isSuccessful() || response.body() == null) return;
                marcarDiasComCheckin(response.body());
            }
            @Override
            public void onFailure(Call<List<CheckinResponse>> call, Throwable t) {}
        });
    }

    private void preencherNumerosDias() {
        Calendar cal = Calendar.getInstance();
        cal.set(Calendar.DAY_OF_WEEK, Calendar.SUNDAY);
        for (int i = 0; i < 7; i++) {
            diasNum[i].setText(String.valueOf(cal.get(Calendar.DAY_OF_MONTH)));
            diasNum[i].setVisibility(View.VISIBLE);
            cal.add(Calendar.DAY_OF_MONTH, 1);
        }
    }

    private void marcarDiasComCheckin(List<CheckinResponse> checkins) {
        Calendar inicioSemana = Calendar.getInstance();
        inicioSemana.set(Calendar.DAY_OF_WEEK, Calendar.SUNDAY);
        inicioSemana.set(Calendar.HOUR_OF_DAY, 0);
        inicioSemana.set(Calendar.MINUTE, 0);
        inicioSemana.set(Calendar.SECOND, 0);
        inicioSemana.set(Calendar.MILLISECOND, 0);

        Calendar fimSemana = (Calendar) inicioSemana.clone();
        fimSemana.add(Calendar.DAY_OF_WEEK, 7);

        boolean[] feito = new boolean[7];

        for (CheckinResponse c : checkins) {
            try {
                java.util.Date data = parseISO(c.getCreatedAt());
                Calendar cal = Calendar.getInstance();
                cal.setTime(data);
                if (!cal.before(inicioSemana) && cal.before(fimSemana)) {
                    int idx = cal.get(Calendar.DAY_OF_WEEK) - 1; // 1=DOM→0 … 7=SAB→6
                    feito[idx] = true;
                }
            } catch (Exception ignored) {}
        }

        int hoje = Calendar.getInstance().get(Calendar.DAY_OF_WEEK) - 1;

        for (int i = 0; i < 7; i++) {
            if (feito[i]) {
                // Check-in feito: círculo verde + ícone ✓
                diasSemana[i].setBackgroundResource(R.drawable.circulo_feito);
                diasCheck[i].setVisibility(View.VISIBLE);
                diasNum[i].setVisibility(View.GONE);
            } else if (i == hoje) {
                // Hoje sem check-in: anel verde + número verde
                diasSemana[i].setBackgroundResource(R.drawable.circulo_hoje);
                diasCheck[i].setVisibility(View.GONE);
                diasNum[i].setVisibility(View.VISIBLE);
                diasNum[i].setTextColor(android.graphics.Color.parseColor("#26A69A"));
            } else {
                // Outro dia sem check-in: cinza + número
                diasSemana[i].setBackgroundResource(R.drawable.circulo_pendente);
                diasCheck[i].setVisibility(View.GONE);
                diasNum[i].setVisibility(View.VISIBLE);
                diasNum[i].setTextColor(android.graphics.Color.parseColor("#999999"));
            }
        }
    }

    // ─── Plano de exercício ──────────────────────────────────────────

    private void carregarPlanoExercicio() {
        apiService.getPlanoExercicio().enqueue(new Callback<List<PlanoExercicio>>() {
            @Override
            public void onResponse(Call<List<PlanoExercicio>> call, Response<List<PlanoExercicio>> response) {
                if (!response.isSuccessful() || response.body() == null || response.body().isEmpty()) return;

                PlanoExercicio plano = response.body().get(0);

                if (plano.getNome() != null)        txtPlanoNome.setText(plano.getNome());
                if (plano.getDuracaoTotal() != null) txtPlanoDuracao.setText(plano.getDuracaoTotal());
                if (plano.getNivel() != null)        txtPlanoNivel.setText(plano.getNivel());

                sectionPlano.setVisibility(View.VISIBLE);
            }
            @Override
            public void onFailure(Call<List<PlanoExercicio>> call, Throwable t) {}
        });
    }

    // ─── Progresso ───────────────────────────────────────────────────

    private void carregarProgresso() {
        apiService.getProgresso().enqueue(new Callback<Progresso>() {
            @Override
            public void onResponse(Call<Progresso> call, Response<Progresso> response) {
                if (response.isSuccessful() && response.body() != null) {
                    Progresso p = response.body();
                    if (p.temDados()) {
                        txtProgressoPercentual.setText(p.getPercentual() + "%");
                        progressBar.setProgress(p.getPercentual());
                        txtProgEmProgresso.setText(String.valueOf(p.getEmProgresso()));
                        txtProgCompleto.setText(String.valueOf(p.getCompleto()));
                        txtProgProximos.setText(String.valueOf(p.getProximos()));
                        sectionProgresso.setVisibility(View.VISIBLE);
                    }
                }
            }
            @Override
            public void onFailure(Call<Progresso> call, Throwable t) {}
        });
    }

    // ─── Nome do paciente ────────────────────────────────────────────

    private void carregarNomePaciente() {
        apiService.getPerfil().enqueue(new Callback<Paciente>() {
            @Override
            public void onResponse(Call<Paciente> call, Response<Paciente> response) {
                if (response.isSuccessful() && response.body() != null) {
                    String nome = response.body().getName();
                    if (nome != null && !nome.isEmpty()) {
                        txtSaudacao.setText(saudacaoPorHora(nome.split(" ")[0]));
                    }
                }
            }
            @Override
            public void onFailure(Call<Paciente> call, Throwable t) {}
        });
    }

    // ─── Utilitários ─────────────────────────────────────────────────

    private java.util.Date parseISO(String iso) throws Exception {
        String s = iso.replaceAll("(\\.\\d{3})\\d+", "$1");
        s = s.replaceAll("([+-]\\d{2}):(\\d{2})$", "$1$2");
        String[] patterns = {
                "yyyy-MM-dd'T'HH:mm:ss.SSSZ",
                "yyyy-MM-dd'T'HH:mm:ssZ",
                "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
                "yyyy-MM-dd'T'HH:mm:ss'Z'"
        };
        for (String pattern : patterns) {
            try {
                SimpleDateFormat sdf = new SimpleDateFormat(pattern, Locale.getDefault());
                sdf.setTimeZone(java.util.TimeZone.getTimeZone("UTC"));
                return sdf.parse(s);
            } catch (Exception ignored) {}
        }
        throw new Exception("Não foi possível parsear: " + iso);
    }

    private String saudacaoPorHora(String nome) {
        int hora = Calendar.getInstance().get(Calendar.HOUR_OF_DAY);
        String cumprimento;
        if (hora >= 5 && hora < 12)       cumprimento = "Bom dia";
        else if (hora >= 12 && hora < 18) cumprimento = "Boa tarde";
        else                               cumprimento = "Boa noite";
        return nome.isEmpty() ? cumprimento : cumprimento + ", " + nome;
    }

    @Override protected int getLayoutId()  { return R.layout.activity_home; }
    @Override protected int getNavItemId() { return R.id.nav_btn_home; }
}