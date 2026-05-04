package com.example.mayarpgapp.model;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.ImageButton;
import android.widget.LinearLayout;
import android.widget.Toast;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

import com.example.mayarpgapp.LoginActivity;
import com.example.mayarpgapp.R;

public class ConfiguracoesActivity extends AppCompatActivity {

    private ImageButton btnVoltar;
    private LinearLayout itemGerenciarConta, itemNotificacoes, itemCartoes,
            itemPreferencias, itemPrivacidade, btnSair;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_configuracoes);

        initViews();
        setupListeners();
    }

    private void initViews() {
        btnVoltar          = findViewById(R.id.btnVoltar);
        itemGerenciarConta = findViewById(R.id.itemGerenciarConta);
        itemNotificacoes   = findViewById(R.id.itemNotificacoes);
        itemCartoes        = findViewById(R.id.itemCartoes);
        itemPreferencias   = findViewById(R.id.itemPreferencias);
        itemPrivacidade    = findViewById(R.id.itemPrivacidade);
        btnSair            = findViewById(R.id.btnSair);
    }

    private void setupListeners() {

        // Volta para a tela anterior (mesmo comportamento do drawer da HomeActivity)
        btnVoltar.setOnClickListener(v -> finish());

        // Gerenciar conta
        itemGerenciarConta.setOnClickListener(v -> {
            // TODO: startActivity(new Intent(this, GerenciarContaActivity.class));
            Toast.makeText(this, "Em breve!", Toast.LENGTH_SHORT).show();
        });

        // Notificações
        itemNotificacoes.setOnClickListener(v -> {
            // TODO: startActivity(new Intent(this, NotificacoesConfigActivity.class));
            Toast.makeText(this, "Em breve!", Toast.LENGTH_SHORT).show();
        });

        // Cartões
        itemCartoes.setOnClickListener(v -> {
            // TODO: startActivity(new Intent(this, CartoesActivity.class));
            Toast.makeText(this, "Em breve!", Toast.LENGTH_SHORT).show();
        });

        // Preferências
        itemPreferencias.setOnClickListener(v -> {
            // TODO: startActivity(new Intent(this, PreferenciasActivity.class));
            Toast.makeText(this, "Em breve!", Toast.LENGTH_SHORT).show();
        });

        // Privacidade
        itemPrivacidade.setOnClickListener(v -> {
            // TODO: startActivity(new Intent(this, PrivacidadeActivity.class));
            Toast.makeText(this, "Em breve!", Toast.LENGTH_SHORT).show();
        });

        // Sair — exibe confirmação antes de deslogar
        btnSair.setOnClickListener(v -> confirmarSaida());
    }

    private void confirmarSaida() {
        new AlertDialog.Builder(this)
                .setTitle("Sair")
                .setMessage("Deseja realmente sair da sua conta?")
                .setPositiveButton("Sair", (dialog, which) -> {
                    // Limpa toda a pilha de activities e volta pro Login
                    Intent intent = new Intent(ConfiguracoesActivity.this, LoginActivity.class);
                    intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
                    startActivity(intent);
                })
                .setNegativeButton("Cancelar", null)
                .show();
    }
}