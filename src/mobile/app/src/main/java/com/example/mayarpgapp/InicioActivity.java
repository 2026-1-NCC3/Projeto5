package com.example.mayarpgapp;

import android.content.Intent;
import android.os.Bundle;
import android.widget.ImageView;

import androidx.appcompat.app.AppCompatActivity;

import androidx.activity.EdgeToEdge;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

public class InicioActivity extends AppCompatActivity {

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