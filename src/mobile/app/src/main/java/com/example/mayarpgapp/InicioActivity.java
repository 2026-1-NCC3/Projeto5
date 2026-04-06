package com.example.mayarpgapp;

import android.content.Intent;
import android.os.Bundle;
import android.widget.ImageView;

import androidx.appcompat.app.AppCompatActivity;

import androidx.activity.EdgeToEdge;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

/**
 * Tela inicial (splash/boas-vindas) do app.
 * É a primeira tela que o usuário vê ao abrir o aplicativo.
 * Contém apenas um botão de imagem que leva à tela de login.
 */
public class InicioActivity extends AppCompatActivity {

    /**
     * Configura a tela de boas-vindas:
     * - Infla o layout da tela inicial
     * - Liga o botão "Continuar" (ImageView) ao listener que abre o Login
     */
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_inicio);

        // O botão de continuar é um ImageView (imagem clicável) no layout
        ImageView btnContinuar = findViewById(R.id.imageView2);

        // Ao tocar na imagem, navega para a tela de login
        // InicioActivity.this é necessário dentro do lambda para referenciar
        // o contexto da Activity corretamente
        btnContinuar.setOnClickListener(view -> {
            Intent intent = new Intent(InicioActivity.this, LoginActivity.class);
            startActivity(intent);
        });
    }
}