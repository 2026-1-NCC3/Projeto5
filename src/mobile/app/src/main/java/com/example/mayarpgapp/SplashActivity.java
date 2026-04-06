package com.example.mayarpgapp;

import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;

import androidx.appcompat.app.AppCompatActivity;

public class SplashActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // Define o layout da tela de abertura (logo/animação)
        setContentView(R.layout.activity_splash);

        // Aguarda um tempo antes de mudar de tela
        new Handler(Looper.getMainLooper()).postDelayed(() -> {

            // Abre a tela inicial de boas-vindas
            startActivity(new Intent(SplashActivity.this, InicioActivity.class));

            // Fecha a Splash para o usuário não voltar a ela ao apertar "voltar"
            finish();

        }, 3000); // Tempo de espera: 3 segundos
    }
}