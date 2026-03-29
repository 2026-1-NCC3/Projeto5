package com.example.mayarpgapp;

import android.content.Intent;
import android.graphics.Color;
import android.graphics.Typeface;
import android.os.Bundle;
import android.view.Gravity;
import android.view.MenuItem;
import android.view.View;
import android.widget.LinearLayout;
import android.widget.TextView;
import androidx.activity.OnBackPressedCallback;
import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.view.GravityCompat;
import androidx.drawerlayout.widget.DrawerLayout;
import com.google.android.material.bottomnavigation.BottomNavigationView;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Locale;

public class HomeActivity extends AppCompatActivity {

    private DrawerLayout drawerLayout;
    private BottomNavigationView bottomNav;
    private TextView tvGreeting, tvUserName, tvCheckinDate;
    private LinearLayout llDaysContainer;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home);

        initViews();
        setupGreeting();
        setupCheckinDate();
        montarBarraDias();
        setupBottomNav();
        setupBackPress();
    }

    private void initViews() {
        drawerLayout     = findViewById(R.id.drawerLayout);
        bottomNav        = findViewById(R.id.bottomNav);
        tvGreeting       = findViewById(R.id.tvGreeting);
        tvUserName       = findViewById(R.id.tvUserName);
        tvCheckinDate    = findViewById(R.id.tvCheckinDate);
        llDaysContainer  = findViewById(R.id.llDaysContainer);

        // Header
        findViewById(R.id.ivMenu).setOnClickListener(v ->
                drawerLayout.openDrawer(GravityCompat.START)
        );
        findViewById(R.id.ivDrawerClose).setOnClickListener(v ->
                drawerLayout.closeDrawer(GravityCompat.START)
        );
        findViewById(R.id.ivNotification).setOnClickListener(v -> {
            // TODO: abrir notificações
        });
        findViewById(R.id.ivProfile).setOnClickListener(v -> {
            // TODO: abrir perfil
        });

        // Card check-in → abre CheckinActivity
        findViewById(R.id.cardCheckin).setOnClickListener(v -> abrirCheckin());

        // Card e seta plano de exercícios
        findViewById(R.id.cardExercisePlan).setOnClickListener(v -> abrirExercicios());
        findViewById(R.id.ivExerciseArrow).setOnClickListener(v -> abrirExercicios());

        // Menu lateral
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
            abrirCheckin();
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

    private void setupCheckinDate() {
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy", Locale.getDefault());
        tvCheckinDate.setText(sdf.format(Calendar.getInstance().getTime()));
    }

    private void montarBarraDias() {
        llDaysContainer.removeAllViews();

        Calendar cal = Calendar.getInstance();
        cal.set(Calendar.DAY_OF_WEEK, cal.getFirstDayOfWeek());

        String[] nomeDias = {"DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"};
        SimpleDateFormat sdfKey = new SimpleDateFormat("yyyy-MM-dd", Locale.getDefault());
        String hoje = sdfKey.format(Calendar.getInstance().getTime());

        for (int i = 0; i < 7; i++) {
            String dataStr = sdfKey.format(cal.getTime());
            int diaMes     = cal.get(Calendar.DAY_OF_MONTH);
            String nome    = nomeDias[cal.get(Calendar.DAY_OF_WEEK) - 1];
            boolean ehHoje = dataStr.equals(hoje);

            llDaysContainer.addView(criarItemDia(diaMes, nome, ehHoje));
            cal.add(Calendar.DAY_OF_MONTH, 1);
        }
    }

    private LinearLayout criarItemDia(int numero, String nome, boolean ehHoje) {
        LinearLayout container = new LinearLayout(this);
        container.setOrientation(LinearLayout.VERTICAL);
        container.setGravity(Gravity.CENTER);

        LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(dpToPx(40), LinearLayout.LayoutParams.WRAP_CONTENT);
        params.setMarginEnd(dpToPx(8));
        container.setLayoutParams(params);

        if (ehHoje) {
            container.setBackgroundResource(R.drawable.bg_day_selected);
            container.setPadding(0, dpToPx(6), 0, dpToPx(6));
        }

        // Bolinha
        View dot = new View(this);
        LinearLayout.LayoutParams dotParams = new LinearLayout.LayoutParams(dpToPx(8), dpToPx(8));
        dotParams.setMargins(0, 0, 0, dpToPx(4));
        dot.setLayoutParams(dotParams);
        dot.setBackgroundResource(ehHoje ? R.drawable.dot_white : R.drawable.dot_gray);

        // Número
        TextView tvNum = new TextView(this);
        tvNum.setText(String.valueOf(numero));
        tvNum.setTextSize(14);
        tvNum.setTypeface(null, Typeface.BOLD);
        tvNum.setGravity(Gravity.CENTER);
        tvNum.setTextColor(ehHoje ? Color.WHITE : Color.parseColor("#444444"));

        // Nome
        TextView tvNome = new TextView(this);
        tvNome.setText(nome);
        tvNome.setTextSize(10);
        tvNome.setGravity(Gravity.CENTER);
        tvNome.setTextColor(ehHoje ? Color.WHITE : Color.parseColor("#888888"));

        container.addView(dot);
        container.addView(tvNum);
        container.addView(tvNome);
        return container;
    }

    private void setupGreeting() {
        int hour = Calendar.getInstance().get(Calendar.HOUR_OF_DAY);
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
        tvUserName.setText(nome != null ? nome : "Usuário");
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

    private void setupBackPress() {
        getOnBackPressedDispatcher().addCallback(this, new OnBackPressedCallback(true) {
            @Override
            public void handleOnBackPressed() {
                if (drawerLayout.isDrawerOpen(GravityCompat.START)) {
                    drawerLayout.closeDrawer(GravityCompat.START);
                } else {
                    setEnabled(false);
                    getOnBackPressedDispatcher().onBackPressed();
                }
            }
        });
    }

    private void abrirCheckin() {
        startActivity(new Intent(HomeActivity.this, CheckinActivity.class));
    }

    private void abrirExercicios() {
        startActivity(new Intent(HomeActivity.this, ExercisesActivity.class));
    }

    private int dpToPx(int dp) {
        return Math.round(dp * getResources().getDisplayMetrics().density);
    }
}