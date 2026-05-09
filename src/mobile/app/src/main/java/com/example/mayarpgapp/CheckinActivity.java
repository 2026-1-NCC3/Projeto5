package com.example.mayarpgapp;

import android.content.SharedPreferences;
import android.graphics.Color;
import android.graphics.Typeface;
import android.os.Bundle;
import android.view.Gravity;
import android.view.View;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.ProgressBar;
import android.widget.TextView;
import androidx.appcompat.app.AppCompatActivity;

import com.example.mayarpgapp.api.ApiService;
import com.example.mayarpgapp.api.RetrofitClient;
import com.example.mayarpgapp.model.CheckinResponse;
import com.example.mayarpgapp.model.HistoricoResponse;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Locale;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class CheckinActivity extends AppCompatActivity {

    private LinearLayout llDaysContainer;
    private TextView tvDataHoje, tvStatus;
    private Button btnCheckin;
    private ProgressBar progressBar;

    private List<String> diasComCheckin = new ArrayList<>();
    private ApiService apiService;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_checkin);

        apiService = RetrofitClient.getInstance().create(ApiService.class);

        initViews();
        configurarDataHoje();
        carregarHistorico();
    }

    private void initViews() {
        llDaysContainer = findViewById(R.id.llDaysContainer);
        tvDataHoje      = findViewById(R.id.tvDataHoje);
        tvStatus        = findViewById(R.id.tvStatus);
        btnCheckin      = findViewById(R.id.btnCheckin);
        progressBar     = findViewById(R.id.progressBar);

        findViewById(R.id.ivBack).setOnClickListener(v -> finish());
        btnCheckin.setOnClickListener(v -> fazerCheckin());
    }

    private void configurarDataHoje() {
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy", Locale.getDefault());
        tvDataHoje.setText(sdf.format(Calendar.getInstance().getTime()));
    }

    private void carregarHistorico() {
        progressBar.setVisibility(View.VISIBLE);
        btnCheckin.setEnabled(false);

        String token = "Bearer " + getToken();

        apiService.getHistorico(token, 7).enqueue(new Callback<HistoricoResponse>() {
            @Override
            public void onResponse(Call<HistoricoResponse> call, Response<HistoricoResponse> response) {
                progressBar.setVisibility(View.GONE);
                btnCheckin.setEnabled(true);

                if (response.isSuccessful() && response.body() != null) {
                    diasComCheckin = response.body().getHistorico();
                }

                montarBarraDias();
                verificarSeJaFezCheckinHoje();
            }

            @Override
            public void onFailure(Call<HistoricoResponse> call, Throwable t) {
                progressBar.setVisibility(View.GONE);
                btnCheckin.setEnabled(true);
                mostrarStatus("Erro de conexão ao carregar histórico.", "#C62828");
                montarBarraDias();
            }
        });
    }

    private void fazerCheckin() {
        btnCheckin.setEnabled(false);
        progressBar.setVisibility(View.VISIBLE);
        tvStatus.setVisibility(View.GONE);

        String token = "Bearer " + getToken();

        apiService.fazerCheckin(token).enqueue(new Callback<CheckinResponse>() {
            @Override
            public void onResponse(Call<CheckinResponse> call, Response<CheckinResponse> response) {
                progressBar.setVisibility(View.GONE);

                if (response.isSuccessful() && response.body() != null) {
                    CheckinResponse body = response.body();

                    if (response.code() == 201) {
                        mostrarStatus("✓ Check-in realizado com sucesso!", "#2E7D32");
                        btnCheckin.setText("Check-in já realizado hoje ✓");
                        btnCheckin.setAlpha(0.6f);
                        carregarHistorico(); // atualiza bolinhas
                    } else {
                        mostrarStatus("Você já fez check-in hoje!", "#F57C00");
                        btnCheckin.setText("Check-in já realizado hoje ✓");
                        btnCheckin.setAlpha(0.6f);
                    }
                } else {
                    mostrarStatus("Erro ao fazer check-in. Tente novamente.", "#C62828");
                    btnCheckin.setEnabled(true);
                }
            }

            @Override
            public void onFailure(Call<CheckinResponse> call, Throwable t) {
                progressBar.setVisibility(View.GONE);
                mostrarStatus("Erro de conexão. Verifique sua internet.", "#C62828");
                btnCheckin.setEnabled(true);
            }
        });
    }

    private void montarBarraDias() {
        llDaysContainer.removeAllViews();

        Calendar cal = Calendar.getInstance();
        cal.set(Calendar.DAY_OF_WEEK, cal.getFirstDayOfWeek());

        String[] nomeDias = {"DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"};
        SimpleDateFormat sdfKey = new SimpleDateFormat("yyyy-MM-dd", Locale.getDefault());
        String hoje = sdfKey.format(Calendar.getInstance().getTime());

        for (int i = 0; i < 7; i++) {
            String dataStr  = sdfKey.format(cal.getTime());
            int diaMes      = cal.get(Calendar.DAY_OF_MONTH);
            String nome     = nomeDias[cal.get(Calendar.DAY_OF_WEEK) - 1];
            boolean fezCheckin = diasComCheckin != null && diasComCheckin.contains(dataStr);
            boolean ehHoje     = dataStr.equals(hoje);

            llDaysContainer.addView(criarItemDia(diaMes, nome, fezCheckin, ehHoje));
            cal.add(Calendar.DAY_OF_MONTH, 1);
        }
    }

    private LinearLayout criarItemDia(int numero, String nome, boolean fezCheckin, boolean ehHoje) {
        LinearLayout container = new LinearLayout(this);
        container.setOrientation(LinearLayout.VERTICAL);
        container.setGravity(Gravity.CENTER);

        LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(
                dpToPx(40), LinearLayout.LayoutParams.WRAP_CONTENT
        );
        params.setMarginEnd(dpToPx(8));
        container.setLayoutParams(params);

        if (ehHoje) {
            container.setBackgroundResource(R.drawable.bg_day_selected);
            container.setPadding(0, dpToPx(6), 0, dpToPx(6));
        }

        // status da bolinha de status
        View dot = new View(this);
        LinearLayout.LayoutParams dotParams = new LinearLayout.LayoutParams(dpToPx(8), dpToPx(8));
        dotParams.setMargins(0, 0, 0, dpToPx(4));
        dot.setLayoutParams(dotParams);
        dot.setBackgroundResource(
                ehHoje      ? R.drawable.dot_white :
                        fezCheckin  ? R.drawable.dot_green :
                                R.drawable.dot_gray
        );

        TextView tvNum = new TextView(this);
        tvNum.setText(String.valueOf(numero));
        tvNum.setTextSize(14);
        tvNum.setTypeface(null, Typeface.BOLD);
        tvNum.setGravity(Gravity.CENTER);
        tvNum.setTextColor(ehHoje ? Color.WHITE : Color.parseColor("#444444"));

        // dia da semana
        TextView tvNome = new TextView(this);
        tvNome.setText(nome);
        tvNome.setTextSize(10);
        tvNome.setGravity(Gravity.CENTER);
        tvNome.setTextColor(ehHoje ? Color.WHITE : Color.parseColor("#888888"));

        container.addView(dot);
        container.addView(tvNum);
        container.addView(tvNome);
        return container;
    }

    private void verificarSeJaFezCheckinHoje() {
        String hoje = new SimpleDateFormat("yyyy-MM-dd", Locale.getDefault())
                .format(Calendar.getInstance().getTime());

        if (diasComCheckin != null && diasComCheckin.contains(hoje)) {
            btnCheckin.setEnabled(false);
            btnCheckin.setText("Check-in já realizado hoje ✓");
            btnCheckin.setAlpha(0.6f);
            mostrarStatus("✓ Você já fez seu check-in hoje!", "#2E7D32");
        }
    }
    // mostra o status do checkin (fez, nao fez, dia de hoje)
    private void mostrarStatus(String mensagem, String corHex) {
        tvStatus.setText(mensagem);
        tvStatus.setTextColor(Color.parseColor(corHex));
        tvStatus.setVisibility(View.VISIBLE);
    }

    // pega o token salvo
    private String getToken() {
        SharedPreferences prefs = getSharedPreferences("auth", MODE_PRIVATE);
        return prefs.getString("token", "");
    }

    private int dpToPx(int dp) {
        return Math.round(dp * getResources().getDisplayMetrics().density);
    }
}