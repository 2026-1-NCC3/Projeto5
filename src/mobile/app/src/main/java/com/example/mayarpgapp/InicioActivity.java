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

        ImageView btnContinuar = findViewById(R.id.imageView2);
        
        btnContinuar.setOnClickListener(view -> {
            Intent intent = new Intent(InicioActivity.this,LoginActivity.class);
            startActivity(intent);
        });
    }
}
