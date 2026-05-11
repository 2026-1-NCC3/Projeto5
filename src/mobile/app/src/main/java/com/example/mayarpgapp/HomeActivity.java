package com.example.mayarpgapp;

import android.content.Intent;
import android.os.Bundle;
import android.widget.TextView;

import java.util.Calendar;

public class HomeActivity extends BaseActivity {

    private TextView txtSaudacao;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        txtSaudacao = findViewById(R.id.txt_saudacao);
        configurarSaudacao();
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

    @Override protected int getLayoutId()  { return R.layout.activity_home; }
    @Override protected int getNavItemId() { return R.id.nav_btn_home; }
}