package com.example.mayarpgapp;

import android.os.Bundle;
import android.view.MenuItem;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import com.google.android.material.bottomnavigation.BottomNavigationView;

public class HomeActivity extends AppCompatActivity {

    private BottomNavigationView bottomNav;
    private TextView tvGreeting;
    private TextView tvUserName;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home);

        initViews();
        setupGreeting();
        setupBottomNav();
    }

    private void initViews() {
        bottomNav  = findViewById(R.id.bottomNav);
        tvGreeting = findViewById(R.id.tvGreeting);
        tvUserName = findViewById(R.id.tvUserName);

        // Clique no menu hambúrguer
        findViewById(R.id.ivMenu).setOnClickListener(v -> {
        });

        // Clique em notificações
        findViewById(R.id.ivNotification).setOnClickListener(v -> {
        });

        // Clique no perfil do header
        findViewById(R.id.ivProfile).setOnClickListener(v -> {
        });
    }

    private void setupGreeting() {
        // Saudação dinâmica por hora do dia
        int hour = java.util.Calendar.getInstance().get(java.util.Calendar.HOUR_OF_DAY);
        String saudacao;
        if (hour < 12) {
            saudacao = "Bom dia,";
        } else if (hour < 18) {
            saudacao = "Boa tarde,";
        } else {
            saudacao = "Boa noite,";
        }

         tvGreeting.setText(saudacao);

        // Nome do usuário
        tvUserName.setText("Raquel");
    }

    private void setupBottomNav() {

        bottomNav.setSelectedItemId(R.id.nav_home);
        bottomNav.setOnItemSelectedListener(new BottomNavigationView.OnItemSelectedListener() {
            @Override
            public boolean onNavigationItemSelected(@NonNull MenuItem item) {
                int id = item.getItemId();

                if (id == R.id.nav_home) {
                    return true;

                } else if (id == R.id.nav_calendar) {
                    // TODO: startActivity(new Intent(HomeActivity.this, AgendaActivity.class));
                    return true;

                } else if (id == R.id.nav_chat) {
                    // TODO: startActivity(new Intent(HomeActivity.this, ChatActivity.class));
                    return true;

                } else if (id == R.id.nav_profile) {
                    // TODO: startActivity(new Intent(HomeActivity.this, PerfilActivity.class));
                    return true;
                }

                return false;
            }
        });
    }
}
