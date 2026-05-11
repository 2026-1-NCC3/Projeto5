package com.example.mayarpgapp;

import android.os.Bundle;
import android.view.View;
import android.widget.ProgressBar;
import android.widget.TextView;

import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.mayarpgapp.api.ApiService;
import com.example.mayarpgapp.api.RetrofitClient;
import com.example.mayarpgapp.model.CheckinResponse;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.List;
import java.util.Locale;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class HistoricoCheckinActivity extends BaseActivity {

    private TextView tvCountSemana, tvCountTotal, tvEmpty;
    private ProgressBar progressBar;
    private RecyclerView rvCheckins;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        tvCountSemana = findViewById(R.id.tv_count_semana);
        tvCountTotal  = findViewById(R.id.tv_count_total);
        tvEmpty       = findViewById(R.id.tv_empty);
        progressBar   = findViewById(R.id.progressBar);
        rvCheckins    = findViewById(R.id.rvCheckins);

        rvCheckins.setLayoutManager(new LinearLayoutManager(this));

        carregarCheckins();
    }

    private void carregarCheckins() {
        progressBar.setVisibility(View.VISIBLE);

        String token = "Bearer " + getSharedPreferences("APP", MODE_PRIVATE)
                .getString("TOKEN", "");

        ApiService api = RetrofitClient.getInstance().create(ApiService.class);
        api.getMeusCheckins(token).enqueue(new Callback<List<CheckinResponse>>() {
            @Override
            public void onResponse(Call<List<CheckinResponse>> call, Response<List<CheckinResponse>> response) {
                progressBar.setVisibility(View.GONE);

                if (!response.isSuccessful() || response.body() == null || response.body().isEmpty()) {
                    tvEmpty.setVisibility(View.VISIBLE);
                    return;
                }

                List<CheckinResponse> lista = response.body();

                // total geral
                tvCountTotal.setText(String.valueOf(lista.size()));

                // conta os desta semana
                int semana = contarEstaSemana(lista);
                tvCountSemana.setText(String.valueOf(semana));

                rvCheckins.setAdapter(new HistoricoCheckinAdapter(
                        HistoricoCheckinActivity.this, lista));
            }

            @Override
            public void onFailure(Call<List<CheckinResponse>> call, Throwable t) {
                progressBar.setVisibility(View.GONE);
                tvEmpty.setVisibility(View.VISIBLE);
            }
        });
    }

    private int contarEstaSemana(List<CheckinResponse> lista) {
        Calendar inicioSemana = Calendar.getInstance();
        inicioSemana.set(Calendar.DAY_OF_WEEK, inicioSemana.getFirstDayOfWeek());
        inicioSemana.set(Calendar.HOUR_OF_DAY, 0);
        inicioSemana.set(Calendar.MINUTE, 0);
        inicioSemana.set(Calendar.SECOND, 0);
        inicioSemana.set(Calendar.MILLISECOND, 0);

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", Locale.getDefault());
        int count = 0;
        for (CheckinResponse item : lista) {
            try {
                Calendar c = Calendar.getInstance();
                c.setTime(sdf.parse(item.getCreatedAt()));
                if (!c.before(inicioSemana)) count++;
            } catch (Exception ignored) {}
        }
        return count;
    }

    @Override protected int getLayoutId()  { return R.layout.activity_historico_checkin; }
    @Override protected int getNavItemId() { return R.id.nav_btn_historico; }
}