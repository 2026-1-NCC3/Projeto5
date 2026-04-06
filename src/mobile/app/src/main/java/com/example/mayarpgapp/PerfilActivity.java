package com.example.mayarpgapp;

import android.os.Bundle;
import android.widget.ImageView;
import android.widget.TextView;
import androidx.appcompat.app.AppCompatActivity;

/**
 * Activity que exibe o perfil completo do paciente.
 * Mostra dados principais (nome, email, data de nascimento, senha)
 * e informações de contato (telefone).
 * Os dados estão fixos no layout por enquanto (hardcoded no XML).
 */
public class PerfilActivity extends AppCompatActivity {

    // ── Views do header ──────────────────────────────────────────────────────
    private ImageView ivFotoPerfil; // Foto de perfil exibida no cabeçalho
    private TextView tvNome;        // Nome exibido no cabeçalho

    // ── Views dos dados principais ───────────────────────────────────────────
    private TextView tvNomeValor;       // Valor do campo Nome no card
    private TextView tvEmailValor;      // Valor do campo Email no card
    private TextView tvDataNascimento;  // Valor do campo Data de Nascimento no card
    private TextView tvSenha;           // Valor do campo Senha no card (exibido como pontos)

    // ── Views de contato ─────────────────────────────────────────────────────
    private TextView tvTelefone; // Valor do campo Telefone no card de contato

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_perfil);

        initViews();
    }

    /**
     * Liga as variáveis às views do XML.
     * Os dados estão definidos diretamente no layout (android:text),
     * então não é necessário preenchê-los via código por enquanto.
     */
    private void initViews() {
        // Header
        ivFotoPerfil = findViewById(R.id.ivFotoPerfil);
        tvNome       = findViewById(R.id.tvNome);

        // Card: Dados principais
        tvNomeValor      = findViewById(R.id.tvNomeValor);
        tvEmailValor     = findViewById(R.id.tvEmailValor);
        tvDataNascimento = findViewById(R.id.tvDataNascimento);
        tvSenha          = findViewById(R.id.tvSenha);

        // Card: Contato
        tvTelefone = findViewById(R.id.tvTelefone);
    }
}