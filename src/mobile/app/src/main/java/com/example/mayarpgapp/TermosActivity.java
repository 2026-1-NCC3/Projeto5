package com.example.mayarpgapp;

import android.os.Bundle;
import android.view.View;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.widget.NestedScrollView;
import com.google.android.material.button.MaterialButton;

public class TermosActivity extends AppCompatActivity {

    private NestedScrollView nsvTermos; // ScrollView que contém o texto dos termos
    private MaterialButton btnAccept;   // Botão de aceite — começa desabilitado no XML

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_terms);

        nsvTermos = findViewById(R.id.nsvTermos);
        btnAccept = findViewById(R.id.btnAccept);

        // Monitora a rolagem do texto para saber a posição atual
        // scrollY: posição atual / oldScrollY: posição anterior

        nsvTermos.setOnScrollChangeListener((NestedScrollView.OnScrollChangeListener)
                (v, scrollX, scrollY, oldScrollX, oldScrollY) -> {

                    View content = v.getChildAt(0); // Pega o único filho direto do ScrollView (o layout com o texto)

                    if (content != null) {
                        // Verifica se o usuário chegou ao final do conteúdo.
                        // A lógica é: posição atual do scroll + altura visível da tela >= altura total do conteúdo
                        // Quando isso é verdade, o usuário já viu tudo.
                        if (scrollY + v.getMeasuredHeight() >= content.getMeasuredHeight()) {
                            btnAccept.setEnabled(true);  // Habilita o clique no botão
                            btnAccept.setAlpha(1.0f);    // Restaura a opacidade total (remove o efeito de "apagado")
                            btnAccept.setText("Li e aceito os termos"); // Atualiza o texto para indicar que está ativo
                        }
                    }
                });

        // Ao aceitar os termos, simplesmente fecha a Activity e volta à tela anterior
        btnAccept.setOnClickListener(v -> finish());
    }
}