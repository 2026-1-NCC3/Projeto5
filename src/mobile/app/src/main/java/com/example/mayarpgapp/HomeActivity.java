package com.example.mayarpgapp;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.ImageView;
import android.widget.ProgressBar;
import android.widget.TextView;

import com.example.mayarpgapp.api.ApiService;
import com.example.mayarpgapp.api.RetrofitClient;
import com.example.mayarpgapp.model.Consulta;
import com.example.mayarpgapp.model.ConsultaResponse;
import com.example.mayarpgapp.model.PlanoExercicio;
import com.example.mayarpgapp.model.Progresso;
import com.google.android.material.button.MaterialButton;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Locale;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class HomeActivity extends BaseActivity {

    private TextView txtSaudacao;
    private TextView txtSubtituloCheckin;
    private ImageView[] circulosDosDias;
    private MaterialButton btnRegistrar;
    private TextView txtEstatistica1, txtEstatistica2, txtEstatistica3;
    private View sectionPlano;
    private TextView txtPlanoNome, txtPlanoDuracao, txtPlanoNivel, btnVerPlano;
    private View sectionConsultas;
    private TextView txtConsultaTipo, txtConsultaMedico, txtConsultaData, txtConsultaHorario;
    private TextView btnVerConsultas;
    private View sectionProgresso;
    private TextView txtProgressoPercentual, txtProgEmProgresso, txtProgCompleto, txtProgProximos;
    private ProgressBar progressBar;
    private TextView btnVerProgresso;
    private String token;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        token = "Bearer " + getSharedPreferences("prefs", MODE_PRIVATE)
                .getString("token", "");

        inicializarViews();
        configurarSaudacao();
        configurarDataCheckin();
        configurarCalendarioSemanal();
        configurarBotoes();
        carregarDadosHome();
    }

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

        sectionPlano    = findViewById(R.id.section_plano);
        txtPlanoNome    = findViewById(R.id.txt_plano_nome);
        txtPlanoDuracao = findViewById(R.id.txt_plano_duracao);
        txtPlanoNivel   = findViewById(R.id.txt_plano_nivel);
        btnVerPlano     = findViewById(R.id.btn_ver_plano);

        sectionConsultas   = findViewById(R.id.section_consultas);
        txtConsultaTipo    = findViewById(R.id.txt_consulta_tipo);
        txtConsultaMedico  = findViewById(R.id.txt_consulta_medico);
        txtConsultaData    = findViewById(R.id.txt_consulta_data);
        txtConsultaHorario = findViewById(R.id.txt_consulta_horario);
        btnVerConsultas    = findViewById(R.id.btn_ver_consultas);

        sectionProgresso       = findViewById(R.id.section_progresso);
        txtProgressoPercentual = findViewById(R.id.txt_progresso_percentual);
        progressBar            = findViewById(R.id.progress_bar);
        txtProgEmProgresso     = findViewById(R.id.txt_prog_em_progresso);
        txtProgCompleto        = findViewById(R.id.txt_prog_completo);
        txtProgProximos        = findViewById(R.id.txt_prog_proximos);
        btnVerProgresso        = findViewById(R.id.btn_ver_progresso);
    }

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

    private void configurarDataCheckin() {
        SimpleDateFormat sdf = new SimpleDateFormat("EEEE, dd 'de' MMMM", new Locale("pt", "BR"));
        txtSubtituloCheckin.setText(sdf.format(Calendar.getInstance().getTime()));
    }

    private void configurarCalendarioSemanal() {
        Calendar calendario = Calendar.getInstance(new Locale("pt", "BR"));
        int diaSemanaHoje = calendario.get(Calendar.DAY_OF_WEEK);
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

    private void configurarBotoes() {
        btnRegistrar.setOnClickListener(v ->
                startActivity(new Intent(this, CheckinActivity.class)));

        btnVerPlano.setOnClickListener(v ->
                startActivity(new Intent(this, ExercisesActivity.class)));

        btnVerConsultas.setOnClickListener(v ->
                startActivity(new Intent(this, ConsultaActivity.class)));

        btnVerProgresso.setOnClickListener(v ->
                startActivity(new Intent(this, CheckinActivity.class)));
    }

    private void carregarDadosHome() {
        ApiService api = RetrofitClient.getInstance().create(ApiService.class);
        carregarPlano(api);
        carregarConsultas(api);
        carregarProgresso(api);
    }

    private void carregarPlano(ApiService api) {
        api.getPlanoExercicio(token).enqueue(new Callback<PlanoExercicio>() {
            @Override
            public void onResponse(Call<PlanoExercicio> call, Response<PlanoExercicio> response) {
                if (response.isSuccessful() && response.body() != null) {
                    PlanoExercicio plano = response.body();
                    if (plano.temExercicios()) {
                        exibirPlano(plano);
                    }
                }
            }

            @Override
            public void onFailure(Call<PlanoExercicio> call, Throwable t) { }
        });
    }

    private void exibirPlano(PlanoExercicio plano) {
        sectionPlano.setVisibility(View.VISIBLE);
        txtPlanoNome.setText(plano.getNome());
        txtPlanoDuracao.setText(plano.getDuracaoTotal());
        txtPlanoNivel.setText(plano.getNivel());
        if (plano.getExercicios() != null) {
            txtEstatistica1.setText(String.valueOf(plano.getExercicios().size()));
        }
    }

    private void carregarConsultas(ApiService api) {
        api.getConsultas(token).enqueue(new Callback<ConsultaResponse>() {
            @Override
            public void onResponse(Call<ConsultaResponse> call, Response<ConsultaResponse> response) {
                if (response.isSuccessful() && response.body() != null) {
                    List<Consulta> proximas = response.body().getProximas();
                    if (proximas != null && !proximas.isEmpty()) {
                        exibirConsultas(proximas);
                    }
                }
            }

            @Override
            public void onFailure(Call<ConsultaResponse> call, Throwable t) { }
        });
    }

    private void exibirConsultas(List<Consulta> proximas) {
        Consulta proxima = proximas.get(0);
        sectionConsultas.setVisibility(View.VISIBLE);
        txtConsultaTipo.setText("Fisioterapia");
        txtConsultaMedico.setText("com Dra. Maya");
        txtConsultaData.setText(formatarData(proxima.getAppointmentDate()));
        txtConsultaHorario.setText(formatarHorario(proxima.getAppointmentDate()));
        txtEstatistica2.setText(String.valueOf(proximas.size()));
    }

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
            public void onFailure(Call<Progresso> call, Throwable t) { }
        });
    }

    private void exibirProgresso(Progresso progresso) {
        sectionProgresso.setVisibility(View.VISIBLE);
        txtProgressoPercentual.setText(progresso.getPercentual() + "%");
        progressBar.setProgress(progresso.getPercentual());
        txtProgEmProgresso.setText(String.valueOf(progresso.getEmProgresso()));
        txtProgCompleto.setText(String.valueOf(progresso.getCompleto()));
        txtProgProximos.setText(String.valueOf(progresso.getProximos()));
        txtEstatistica3.setText(String.valueOf(progresso.getProximos()));
    }

    private String formatarData(String dataISO) {
        try {
            SimpleDateFormat entrada = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", Locale.getDefault());
            SimpleDateFormat saida   = new SimpleDateFormat("EEEE, dd 'de' MMMM", new Locale("pt", "BR"));
            return saida.format(entrada.parse(dataISO));
        } catch (Exception e) {
            return dataISO;
        }
    }

    private String formatarHorario(String dateISO) {
        try {
            SimpleDateFormat entrada = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", Locale.getDefault());
            SimpleDateFormat saida = new SimpleDateFormat("HH:mm", Locale.getDefault());
            Date date = entrada.parse(dateISO);
            String inicio = saida.format(date);
            String fim = saida.format(new Date(date.getTime() + 3600000));
            return inicio + " - " + fim;
        } catch (Exception e) {
            return dateISO;
        }
    }

    @Override protected int getLayoutId() { return R.layout.activity_home; }
    @Override protected int getNavItemId() { return R.id.nav_btn_home; }
}