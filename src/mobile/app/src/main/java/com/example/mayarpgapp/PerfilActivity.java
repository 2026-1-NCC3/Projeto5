package com.example.mayarpgapp;

import android.os.Bundle;
import android.widget.ImageView;
import android.widget.TextView;
import androidx.appcompat.app.AppCompatActivity;

public class PerfilActivity extends AppCompatActivity {

    // Componentes do topo: foto e nome de destaque
    private ImageView ivFotoPerfil;
    private TextView tvNome;

    // Campos de texto que mostram as informações do usuário
    private TextView tvNomeValor;
    private TextView tvEmailValor;
    private TextView tvDataNascimento;
    private TextView tvSenha;
    private TextView tvTelefone;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_perfil);

        initViews();
    }

    // Vincula as variáveis do Java com os componentes do XML pelo ID
    private void initViews() {
        // Cabeçalho do perfil
        ivFotoPerfil = findViewById(R.id.ivFotoPerfil);
        tvNome       = findViewById(R.id.tvNome);

        // Informações principais do cartão
        tvNomeValor      = findViewById(R.id.tvNomeValor);
        tvEmailValor     = findViewById(R.id.tvEmailValor);
        tvDataNascimento = findViewById(R.id.tvDataNascimento);
        tvSenha          = findViewById(R.id.tvSenha);

        // Informação de contato
        tvTelefone = findViewById(R.id.tvTelefone);
    }
}