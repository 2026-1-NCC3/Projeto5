package com.example.mayarpgapp;

import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;

import androidx.appcompat.app.AppCompatActivity;

/**
 * Tela de splash — primeira tela exibida ao abrir o app.
 * Mostra a identidade visual do app por 3 segundos e depois
 * navega automaticamente para a tela de boas-vindas (InicioActivity).
 */
public class SplashActivity extends AppCompatActivity {

    /**
     * Exibe o layout do splash e agenda a navegação automática
     * para a próxima tela após 3 segundos.
     */
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_splash); // Layout com logo/animação do app

        // Handler com Looper.getMainLooper() garante que o código dentro do lambda
        // seja executado na thread principal (UI thread), que é a única que pode
        // mexer em views e iniciar Activities.
        // postDelayed agenda a execução do bloco após o delay informado (em milissegundos).
        new Handler(Looper.getMainLooper()).postDelayed(() -> {
            startActivity(new Intent(SplashActivity.this, InicioActivity.class)); // Abre a tela de boas-vindas
            finish(); // Encerra o Splash para que o usuário não consiga voltar a ele com o botão "voltar"
        }, 3000); // 3000ms = 3 segundos de exibição do splash
    }
}