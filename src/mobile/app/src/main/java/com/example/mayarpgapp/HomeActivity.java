package com.example.mayarpgapp;

import android.content.Intent;
import android.os.Bundle;
import android.view.MenuItem;
import android.widget.TextView;
import androidx.activity.OnBackPressedCallback;
import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.view.GravityCompat;
import androidx.drawerlayout.widget.DrawerLayout;
import com.google.android.material.bottomnavigation.BottomNavigationView;

public class HomeActivity extends AppCompatActivity {

    private DrawerLayout drawerLayout;
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
        setupBackPress();
    }

    private void initViews() {
        drawerLayout = findViewById(R.id.drawerLayout);
        bottomNav    = findViewById(R.id.bottomNav);
        tvGreeting   = findViewById(R.id.tvGreeting);
        tvUserName   = findViewById(R.id.tvUserName);

        // Abre o drawer ao clicar no hambúrguer
        findViewById(R.id.ivMenu).setOnClickListener(v ->
                drawerLayout.openDrawer(GravityCompat.START)
        );

        // Fecha o drawer ao clicar no ícone dentro dele
        findViewById(R.id.ivDrawerClose).setOnClickListener(v ->
                drawerLayout.closeDrawer(GravityCompat.START)
        );

        // Card e seta de exercícios
        findViewById(R.id.cardExercisePlan).setOnClickListener(v -> abrirExercicios());
        findViewById(R.id.ivExerciseArrow).setOnClickListener(v -> abrirExercicios());

        // Notificações e perfil do header
        findViewById(R.id.ivNotification).setOnClickListener(v -> {
            // TODO: abrir notificações
        });
        findViewById(R.id.ivProfile).setOnClickListener(v -> {
            // TODO: abrir perfil
        });

        findViewById(R.id.menuHome).setOnClickListener(v ->
                drawerLayout.closeDrawer(GravityCompat.START)
        );

        findViewById(R.id.menuMessages).setOnClickListener(v -> {
            drawerLayout.closeDrawer(GravityCompat.START);
            // TODO: startActivity(new Intent(this, MessagesActivity.class));
        });

        findViewById(R.id.menuNotifications).setOnClickListener(v -> {
            drawerLayout.closeDrawer(GravityCompat.START);
            // TODO: startActivity(new Intent(this, NotificationsActivity.class));
        });

        findViewById(R.id.menuSettings).setOnClickListener(v -> {
            drawerLayout.closeDrawer(GravityCompat.START);
            // TODO: startActivity(new Intent(this, SettingsActivity.class));
        });

        findViewById(R.id.menuCheckin).setOnClickListener(v -> {
            drawerLayout.closeDrawer(GravityCompat.START);
            // TODO: startActivity(new Intent(this, CheckinActivity.class));
        });

        findViewById(R.id.menuEvolucao).setOnClickListener(v -> {
            drawerLayout.closeDrawer(GravityCompat.START);
            // TODO: startActivity(new Intent(this, EvolucaoActivity.class));
        });

        findViewById(R.id.menuPlano).setOnClickListener(v -> {
            drawerLayout.closeDrawer(GravityCompat.START);
            abrirExercicios();
        });

        findViewById(R.id.menuAgenda).setOnClickListener(v -> {
            drawerLayout.closeDrawer(GravityCompat.START);
            // TODO: startActivity(new Intent(this, AgendaActivity.class));
        });

        findViewById(R.id.menuPerfil).setOnClickListener(v -> {
            drawerLayout.closeDrawer(GravityCompat.START);
            // TODO: startActivity(new Intent(this, PerfilActivity.class));
        });
    }

    private void setupBackPress() {
        getOnBackPressedDispatcher().addCallback(this, new OnBackPressedCallback(true) {
            @Override
            public void handleOnBackPressed() {
                if (drawerLayout.isDrawerOpen(GravityCompat.START)) {
                    // pra fechar o menu
                    drawerLayout.closeDrawer(GravityCompat.START);
                } else {
                    setEnabled(false);
                    getOnBackPressedDispatcher().onBackPressed();
                }
            }
        });
    }

    private void abrirExercicios() {
        startActivity(new Intent(HomeActivity.this, ExercisesActivity.class));
    }

    private void setupGreeting() {
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
        String nome = getIntent().getStringExtra("USER_NAME");

        if (nome != null) {
            tvUserName.setText(nome);
        } else {
            tvUserName.setText("Usuário");
        }
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