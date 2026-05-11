package com.example.mayarpgapp;

import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;
import android.text.Editable;
import android.text.TextWatcher;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;

import com.example.mayarpgapp.api.ApiService;
import com.example.mayarpgapp.api.RetrofitClient;
import com.example.mayarpgapp.model.CheckinResponse;
import com.google.gson.JsonObject;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class CheckinActivity extends BaseActivity {

    private LinearLayout llNiveis;
    private TextView tvNivelNumero, tvNivelDescricao, tvContador;
    private EditText etComentario;
    private Button btnFinalizar;

    private int nivelSelecionado = 5;
    private Button[] botoesNivel = new Button[10];
    private ApiService apiService;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        apiService = RetrofitClient.getInstance().create(ApiService.class);

        llNiveis        = findViewById(R.id.llNiveis);
        tvNivelNumero   = findViewById(R.id.tvNivelNumero);
        tvNivelDescricao= findViewById(R.id.tvNivelDescricao);
        tvContador      = findViewById(R.id.tvContador);
        etComentario    = findViewById(R.id.etComentario);
        btnFinalizar    = findViewById(R.id.btnFinalizar);

        findViewById(R.id.ivBack).setOnClickListener(v -> finish());

        montarBotoesNivel();
        selecionarNivel(5);

        etComentario.addTextChangedListener(new TextWatcher() {
            public void beforeTextChanged(CharSequence s, int st, int c, int a) {}
            public void onTextChanged(CharSequence s, int st, int b, int c) {
                tvContador.setText(s.length() + "/200");
            }
            public void afterTextChanged(Editable s) {}
        });

        btnFinalizar.setOnClickListener(v -> fazerCheckin());
    }

    private void montarBotoesNivel() {
        llNiveis.removeAllViews();
        for (int i = 1; i <= 10; i++) {
            final int nivel = i;
            Button btn = new Button(this);
            LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(
                    0, dpToPx(40), 1f
            );
            params.setMarginEnd(i < 10 ? dpToPx(4) : 0);
            btn.setLayoutParams(params);
            btn.setText(String.valueOf(i));
            btn.setTextSize(13);
            btn.setStateListAnimator(null);
            btn.setPadding(0, 0, 0, 0);
            btn.setOnClickListener(v -> selecionarNivel(nivel));
            botoesNivel[i - 1] = btn;
            llNiveis.addView(btn);
        }
    }

    private void selecionarNivel(int nivel) {
        nivelSelecionado = nivel;
        tvNivelNumero.setText(String.valueOf(nivel));
        tvNivelDescricao.setText(descricaoDor(nivel));

        for (int i = 0; i < 10; i++) {
            Button btn = botoesNivel[i];
            if (i + 1 == nivel) {
                btn.setBackgroundColor(Color.parseColor("#37A6BA"));
                btn.setTextColor(Color.WHITE);
            } else {
                btn.setBackgroundColor(Color.parseColor("#E8F5F7"));
                btn.setTextColor(Color.parseColor("#37A6BA"));
            }
        }
    }

    private String descricaoDor(int nivel) {
        if (nivel <= 2) return "Sem dor";
        if (nivel <= 4) return "Dor leve";
        if (nivel <= 6) return "Dor moderada";
        if (nivel <= 8) return "Dor intensa";
        return "Dor máxima";
    }

    private void fazerCheckin() {
        btnFinalizar.setEnabled(false);
        btnFinalizar.setText("Enviando...");

        String token = "Bearer " + getSharedPreferences("APP", MODE_PRIVATE)
                .getString("TOKEN", "");
        String comentario = etComentario.getText().toString().trim();

        JsonObject body = new JsonObject();
        body.addProperty("pain_level", nivelSelecionado);
        if (!comentario.isEmpty()) {
            body.addProperty("notes", comentario);
        }

        apiService.fazerCheckin(token, body).enqueue(new Callback<CheckinResponse>() {
            @Override
            public void onResponse(Call<CheckinResponse> call, Response<CheckinResponse> response) {
                if (response.isSuccessful()) {
                    // volta para ExercisesActivity sinalizando sucesso
                    Intent intent = new Intent();
                    intent.putExtra("checkin_ok", true);
                    setResult(RESULT_OK, intent);
                    finish();
                } else {
                    Toast.makeText(CheckinActivity.this,
                            "Erro ao registrar. Tente novamente.", Toast.LENGTH_SHORT).show();
                    btnFinalizar.setEnabled(true);
                    btnFinalizar.setText("Finalizar Check-in");
                }
            }

            @Override
            public void onFailure(Call<CheckinResponse> call, Throwable t) {
                Toast.makeText(CheckinActivity.this,
                        "Erro de conexão.", Toast.LENGTH_SHORT).show();
                btnFinalizar.setEnabled(true);
                btnFinalizar.setText("Finalizar Check-in");
            }
        });
    }

    private int dpToPx(int dp) {
        return Math.round(dp * getResources().getDisplayMetrics().density);
    }

    @Override protected int getLayoutId()  { return R.layout.activity_checkin; }
    @Override protected int getNavItemId() { return R.id.nav_btn_historico; }
}