package com.example.mayarpgapp;

import android.os.Bundle;
import android.view.View;
import android.widget.TextView;
import android.widget.Toast;

import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.mayarpgapp.api.ApiService;
import com.example.mayarpgapp.api.RetrofitClient;
import com.example.mayarpgapp.model.Consulta;
import com.example.mayarpgapp.model.ConsultaResponse;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class ConsultaActivity extends BaseActivity {

    private View sectionProximaConsulta;
    private View emptyProximas;
    private TextView txtProximaTipo, txtProximaMedico, txtProximaData, txtProximaHorario;
    private TextView txtCountProximas, txtCountHistorico;
    private RecyclerView recyclerProximas, recyclerHistorico;

    @Override
    protected int getLayoutId() { return R.layout.activity_consulta; }

    @Override
    protected int getNavItemId() { return R.id.nav_btn_consultas; }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        sectionProximaConsulta = findViewById(R.id.section_proxima_consulta);
        emptyProximas          = findViewById(R.id.empty_proximas);
        txtProximaTipo         = findViewById(R.id.txt_proxima_tipo);
        txtProximaMedico       = findViewById(R.id.txt_proxima_medico);
        txtProximaData         = findViewById(R.id.txt_proxima_data);
        txtProximaHorario      = findViewById(R.id.txt_proxima_horario);
        txtCountProximas       = findViewById(R.id.txt_count_proximas);
        txtCountHistorico      = findViewById(R.id.txt_count_historico);

        recyclerProximas = findViewById(R.id.recycler_proximas);
        recyclerProximas.setLayoutManager(new LinearLayoutManager(this));

        recyclerHistorico = findViewById(R.id.recycler_historico);
        recyclerHistorico.setLayoutManager(new LinearLayoutManager(this));

        // Toolbar — botão voltar
        androidx.appcompat.widget.Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        if (getSupportActionBar() != null) {
            getSupportActionBar().setDisplayHomeAsUpEnabled(true);
            getSupportActionBar().setDisplayShowTitleEnabled(false);
        }
        toolbar.setNavigationOnClickListener(v -> finish());

        carregarConsultas();
    }

    private void carregarConsultas() {
        // Mesmo padrão do restante do app: lê de "APP"/"TOKEN"
        String token = getSharedPreferences("APP", MODE_PRIVATE).getString("TOKEN", "");
        RetrofitClient.setToken(token);

        // O interceptor do RetrofitClient já injeta o Bearer automaticamente
        ApiService api = RetrofitClient.getInstance().create(ApiService.class);
        api.getConsultas().enqueue(new Callback<ConsultaResponse>() {

            @Override
            public void onResponse(Call<ConsultaResponse> call, Response<ConsultaResponse> response) {
                if (!response.isSuccessful() || response.body() == null) {
                    Toast.makeText(ConsultaActivity.this, "Erro ao carregar consultas", Toast.LENGTH_SHORT).show();
                    return;
                }

                ConsultaResponse body = response.body();
                List<Consulta> proximas  = body.getProximas();
                List<Consulta> historico = body.getHistorico();

                // Próxima consulta em destaque
                if (proximas != null && !proximas.isEmpty()) {
                    sectionProximaConsulta.setVisibility(View.VISIBLE);
                    emptyProximas.setVisibility(View.GONE);

                    Consulta primeira = proximas.get(0);
                    txtProximaTipo.setText("Fisioterapia");
                    txtProximaMedico.setText("com Dra. Maya");
                    txtProximaData.setText(formatarData(primeira.getAppointmentDate()));
                    txtProximaHorario.setText(formatarHorario(primeira.getAppointmentDate()));

                    // Restantes vão pro RecyclerView
                    List<Consulta> restantes = proximas.subList(1, proximas.size());
                    txtCountProximas.setText(restantes.isEmpty() ? "" : "(" + restantes.size() + ")");
                    recyclerProximas.setAdapter(new ConsultaAdapter(restantes, false));

                } else {
                    sectionProximaConsulta.setVisibility(View.GONE);
                    emptyProximas.setVisibility(View.VISIBLE);
                    txtCountProximas.setText("");
                }

                // Histórico
                if (historico != null && !historico.isEmpty()) {
                    txtCountHistorico.setText("(" + historico.size() + ")");
                    recyclerHistorico.setAdapter(new ConsultaAdapter(historico, true));
                }
            }

            @Override
            public void onFailure(Call<ConsultaResponse> call, Throwable t) {
                Toast.makeText(ConsultaActivity.this, "Erro de conexão", Toast.LENGTH_SHORT).show();
            }
        });
    }

    private java.util.Date parseISO(String iso) throws Exception {
        // 1. Trunca microsegundos para milissegundos (ex: .139511 → .139)
        String s = iso.replaceAll("(\\.\\d{3})\\d+", "$1");
        // 2. Normaliza offset +HH:MM → +HHMM
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

    private String formatarData(String dateISO) {
        try {
            SimpleDateFormat saida = new SimpleDateFormat("EEEE, dd 'de' MMMM", new Locale("pt", "BR"));
            return saida.format(parseISO(dateISO));
        } catch (Exception e) {
            return dateISO;
        }
    }

    private String formatarHorario(String dateISO) {
        try {
            Date date = parseISO(dateISO);
            SimpleDateFormat saida = new SimpleDateFormat("HH:mm", Locale.getDefault());
            return saida.format(date) + " - " + adicionarUmaHora(date);
        } catch (Exception e) {
            return dateISO;
        }
    }

    private String adicionarUmaHora(Date date) {
        SimpleDateFormat saida = new SimpleDateFormat("HH:mm", Locale.getDefault());
        return saida.format(new Date(date.getTime() + 3600000));
    }
}