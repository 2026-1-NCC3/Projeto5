package com.example.mayarpgapp;

import android.content.Intent;
import android.os.Bundle;
import android.text.TextUtils;
import android.util.Patterns;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

public class RecuperarSenhaActivity extends AppCompatActivity {

    private EditText etEmail;
    private Button btnEnviar;
    private ImageButton btnVoltar;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_recuperar_senha);

        etEmail = findViewById(R.id.etEmail);
        btnEnviar = findViewById(R.id.btnEnviar);
        btnVoltar = findViewById(R.id.btnVoltar);

        btnVoltar.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                finish(); // Volta para a tela anterior
            }
        });

        btnEnviar.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String email = etEmail.getText().toString().trim();

                if (TextUtils.isEmpty(email)) {
                    etEmail.setError("Informe seu e-mail");
                    etEmail.requestFocus();
                    return;
                }

                if (!Patterns.EMAIL_ADDRESS.matcher(email).matches()) {
                    etEmail.setError("E-mail inválido");
                    etEmail.requestFocus();
                    return;
                }

                // TODO: Aqui você pode integrar com Firebase ou sua API para enviar o e-mail
                Toast.makeText(RecuperarSenhaActivity.this,
                        "Link enviado para " + email, Toast.LENGTH_SHORT).show();

                // Navega para a tela de criar nova senha
                Intent intent = new Intent(RecuperarSenhaActivity.this, CriarSenhaActivity.class);
                startActivity(intent);
            }
        });
    }
}