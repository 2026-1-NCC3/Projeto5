package com.example.mayarpgapp; // Verifique se o pacote está correto

import android.os.Bundle;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;
import androidx.appcompat.app.AppCompatActivity;
import java.util.Calendar;
import java.util.Locale;

public class HomeActivity extends AppCompatActivity {

    private TextView txtSaudacao;
    private ImageView[] circulosDosDias;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home); // Nome do seu XML

        // 1. Inicializar componentes
        txtSaudacao = findViewById(R.id.txt_saudacao);

        circulosDosDias = new ImageView[]{
                findViewById(R.id.dia_dom),
                findViewById(R.id.dia_seg),
                findViewById(R.id.dia_ter),
                findViewById(R.id.dia_qua),
                findViewById(R.id.dia_qui),
                findViewById(R.id.dia_sex),
                findViewById(R.id.dia_sab)
        };

        // 2. Executar as lógicas
        configurarSaudacao();
        configurarCalendarioSemanal();
    }

    private void configurarSaudacao() {
        Calendar calendario = Calendar.getInstance();
        int hora = calendario.get(Calendar.HOUR_OF_DAY);
        String saudacao;

        if (hora >= 5 && hora < 12) {
            saudacao = "Bom dia, Raquel";
        } else if (hora >= 12 && hora < 18) {
            saudacao = "Boa tarde, Raquel";
        } else {
            saudacao = "Boa noite, Raquel";
        }

        txtSaudacao.setText(saudacao);
    }

    private void configurarCalendarioSemanal() {
        // Usa o calendário oficial brasileiro
        Calendar calendario = Calendar.getInstance(new Locale("pt", "BR"));
        int diaSemanaHoje = calendario.get(Calendar.DAY_OF_WEEK); // Dom=1, Seg=2... Sab=7

        /* SIMULAÇÃO DE DADOS:
           Aqui você define quais dias já tiveram check-in.
           True = Aparece o check verde.
           False = Fica cinza.
        */
        boolean[] historicoCheckins = {
                false, // Domingo
                true,  // Segunda
                true,  // Terça
                true,  // Quarta
                false, // Quinta (Hoje)
                false, // Sexta
                false  // Sábado
        };

        for (int i = 0; i < circulosDosDias.length; i++) {
            int diaDoLoop = i + 1; // Ajuste para bater com Calendar (1 a 7)

            if (historicoCheckins[i]) {
                // DIA COM CHECK-IN: Verde com ícone
                circulosDosDias[i].setBackgroundResource(R.drawable.circulo_feito);
                circulosDosDias[i].setImageResource(R.drawable.ic_check);
                circulosDosDias[i].setVisibility(View.VISIBLE);
            } else {
                // DIA SEM CHECK-IN: Fundo cinza padrão
                circulosDosDias[i].setBackgroundResource(R.drawable.circulo_pendente);

                // Lógica para o futuro: Se o dia ainda não chegou, remove o ícone de check
                if (diaDoLoop > diaSemanaHoje) {
                    circulosDosDias[i].setImageDrawable(null); // Fica só o círculo cinza vazio
                } else {
                    // Se já passou ou é hoje e não fez, mantém o check mas com fundo cinza
                    circulosDosDias[i].setImageResource(R.drawable.ic_check);
                }
            }
        }
    }
}