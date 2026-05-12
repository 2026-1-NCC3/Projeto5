package com.example.mayarpgapp;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;

import com.example.mayarpgapp.api.ApiService;
import com.example.mayarpgapp.api.RetrofitClient;
import com.example.mayarpgapp.model.CheckinResponse;
import com.example.mayarpgapp.model.PlanoExercicio;
import com.google.gson.JsonObject;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.List;
import java.util.Locale;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class HomeActivity extends BaseActivity {

    private static final int REQUEST_CHECKIN = 200;

    private TextView txtSaudacao;
    private TextView txtEstatistica1, txtEstatistica2, txtEstatistica3;

    // Calendário semanal
    private ImageView diaDom, diaSeg, diaTer, diaQua, diaQui, diaSex, diaSab;

    // Card check-in
    private View btnRegistrar;
    private TextView tituloCheckin, subtituloCheckin;

    // Seção plano
    private View sectionPlano;
    private TextView txtPlanoNome, txtPlanoDuracao, txtPlanoNivel, btnVerPlano;

    private ApiService apiService;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        String token = getSharedPreferences("APP", MODE_PRIVATE).getString("TOKEN", "");
        RetrofitClient.setToken(token);
        apiService = RetrofitClient.getInstance().create(ApiService.class);

        txtSaudacao     = findViewById(R.id.txt_saudacao);
        txtEstatistica1 = findViewById(R.id.txt_estatistica_1);
        txtEstatistica2 = findViewById(R.id.txt_estatistica_2);
        txtEstatistica3 = findViewById(R.id.txt_estatistica_3);

        diaDom = findViewById(R.id.dia_dom);
        diaSeg = findViewById(R.id.dia_seg);
        diaTer = findViewById(R.id.dia_ter);
        diaQua = findViewById(R.id.dia_qua);
        diaQui = findViewById(R.id.dia_qui);
        diaSex = findViewById(R.id.dia_sex);
        diaSab = findViewById(R.id.dia_sab);

        btnRegistrar    = findViewById(R.id.btn_registrar);
        tituloCheckin   = findViewById(R.id.titulo_checkin);
        subtituloCheckin = findViewById(R.id.subtitulo_checkin);

        sectionPlano    = findViewById(R.id.section_plano);
        txtPlanoNome    = findViewById(R.id.txt_plano_nome);
        txtPlanoDuracao = findViewById(R.id.txt_plano_duracao);
        txtPlanoNivel   = findViewById(R.id.txt_plano_nivel);
        btnVerPlano     = findViewById(R.id.btn_ver_plano);

        configurarSaudacao();

        btnRegistrar.setOnClickListener(v -> {
            Intent intent = new Intent(this, CheckinActivity.class);
            startActivityForResult(intent, REQUEST_CHECKIN);
        });

        btnVerPlano.setOnClickListener(v ->
                startActivity(new Intent(this, ExercisesActivity.class)));

        carregarCheckins();
        carregarPlano();
    }

    // Após check-in concluído, recarrega tudo e bloqueia o botão
    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == REQUEST_CHECKIN && resultCode == RESULT_OK) {
            carregarCheckins();
        }
    }

    // ── Saudação ─────────────────────────────────────────────────────────────

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

    // ── Check-ins ─────────────────────────────────────────────────────────────

    private void carregarCheckins() {
        // Verifica se já fez check-in hoje para bloquear o botão
        apiService.getCheckinHoje().enqueue(new Callback<JsonObject>() {
            @Override
            public void onResponse(Call<JsonObject> call, Response<JsonObject> response) {
                if (response.isSuccessful() && response.body() != null) {
                    boolean feito = response.body().get("feito").getAsBoolean();
                    atualizarBotaoCheckin(feito);
                }
            }
            @Override
            public void onFailure(Call<JsonObject> call, Throwable t) { }
        });

        // Carrega lista completa para calendário e estatísticas
        apiService.getMeusCheckins().enqueue(new Callback<List<CheckinResponse>>() {
            @Override
            public void onResponse(Call<List<CheckinResponse>> call, Response<List<CheckinResponse>> response) {
                if (!response.isSuccessful() || response.body() == null) return;
                List<CheckinResponse> lista = response.body();
                atualizarCalendario(lista);
                atualizarEstatisticas(lista);
            }
            @Override
            public void onFailure(Call<List<CheckinResponse>> call, Throwable t) { }
        });
    }

    private void atualizarBotaoCheckin(boolean jaFeito) {
        btnRegistrar.setEnabled(!jaFeito);
        btnRegistrar.setAlpha(jaFeito ? 0.5f : 1.0f);
        if (jaFeito) {
            tituloCheckin.setText("Check-in realizado!");
            subtituloCheckin.setText("Você já registrou seu check-in hoje.");
        } else {
            tituloCheckin.setText("Realize o check-in");
            subtituloCheckin.setText("");
        }
    }

    private void atualizarCalendario(List<CheckinResponse> lista) {
        boolean[] diasFeitos = new boolean[7]; // 0=DOM … 6=SAB

        Calendar inicioSemana = Calendar.getInstance();
        inicioSemana.set(Calendar.DAY_OF_WEEK, Calendar.SUNDAY);
        inicioSemana.set(Calendar.HOUR_OF_DAY, 0);
        inicioSemana.set(Calendar.MINUTE, 0);
        inicioSemana.set(Calendar.SECOND, 0);
        inicioSemana.set(Calendar.MILLISECOND, 0);

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", Locale.getDefault());
        for (CheckinResponse c : lista) {
            try {
                Calendar cal = Calendar.getInstance();
                cal.setTime(sdf.parse(c.getCreatedAt()));
                if (!cal.before(inicioSemana)) {
                    diasFeitos[cal.get(Calendar.DAY_OF_WEEK) - 1] = true;
                }
            } catch (Exception ignored) { }
        }

        ImageView[] views = { diaDom, diaSeg, diaTer, diaQua, diaQui, diaSex, diaSab };
        for (int i = 0; i < 7; i++) {
            views[i].setBackgroundResource(
                    diasFeitos[i] ? R.drawable.circulo_feito : R.drawable.circulo_pendente
            );
        }
    }

    private void atualizarEstatisticas(List<CheckinResponse> lista) {
        int total = lista.size();

        int checkinsSemana = 0;
        Calendar inicioSemana = Calendar.getInstance();
        inicioSemana.set(Calendar.DAY_OF_WEEK, Calendar.SUNDAY);
        inicioSemana.set(Calendar.HOUR_OF_DAY, 0);
        inicioSemana.set(Calendar.MINUTE, 0);
        inicioSemana.set(Calendar.SECOND, 0);
        inicioSemana.set(Calendar.MILLISECOND, 0);

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", Locale.getDefault());
        for (CheckinResponse c : lista) {
            try {
                Calendar cal = Calendar.getInstance();
                cal.setTime(sdf.parse(c.getCreatedAt()));
                if (!cal.before(inicioSemana)) checkinsSemana++;
            } catch (Exception ignored) { }
        }

        int diaAtual = Calendar.getInstance().get(Calendar.DAY_OF_WEEK);
        int perdidos = Math.max(0, diaAtual - checkinsSemana);

        txtEstatistica1.setText(String.valueOf(total));
        txtEstatistica2.setText(String.valueOf(checkinsSemana));
        txtEstatistica3.setText(String.valueOf(perdidos));
    }

    // ── Plano de exercícios ───────────────────────────────────────────────────

    private void carregarPlano() {
        apiService.getPlanoExercicio().enqueue(new Callback<List<PlanoExercicio>>() {
            @Override
            public void onResponse(Call<List<PlanoExercicio>> call, Response<List<PlanoExercicio>> response) {
                if (!response.isSuccessful() || response.body() == null || response.body().isEmpty()) return;

                PlanoExercicio plano = response.body().get(0);
                if (!plano.temExercicios()) return;

                sectionPlano.setVisibility(View.VISIBLE);
                txtPlanoNome.setText(plano.getNome() != null ? plano.getNome() : "Plano de exercícios");

                String duracao = plano.getDuracaoTotal();
                txtPlanoDuracao.setText(duracao != null ? duracao : "");
                txtPlanoDuracao.setVisibility(duracao != null ? View.VISIBLE : View.GONE);

                String nivel = plano.getNivel();
                txtPlanoNivel.setText(nivel != null ? nivel : "");
                txtPlanoNivel.setVisibility(nivel != null ? View.VISIBLE : View.GONE);
            }

            @Override
            public void onFailure(Call<List<PlanoExercicio>> call, Throwable t) { }
        });
    }

    @Override protected int getLayoutId()  { return R.layout.activity_home; }
    @Override protected int getNavItemId() { return R.id.nav_btn_home; }
}