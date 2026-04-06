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

    // componentes dos cards
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

    // elementos que estão no layout
    private void initViews() {
        drawerLayout     = findViewById(R.id.drawerLayout);
        bottomNav        = findViewById(R.id.bottomNav);
        tvGreeting       = findViewById(R.id.tvGreeting);
        tvUserName       = findViewById(R.id.tvUserName);
        tvCheckinDate    = findViewById(R.id.tvCheckinDate);
        llDaysContainer  = findViewById(R.id.llDaysContainer);

        // header
        findViewById(R.id.ivMenu).setOnClickListener(v ->
                drawerLayout.openDrawer(GravityCompat.START)
        );
        // Ícone de fechar dentro do drawer
        findViewById(R.id.ivDrawerClose).setOnClickListener(v ->
                drawerLayout.closeDrawer(GravityCompat.START)
        );
        findViewById(R.id.ivNotification).setOnClickListener(v -> {
            // TODO: abrir notificações
        });

        // card de check-in, abre CheckinActivity
        findViewById(R.id.ivProfile).setOnClickListener(v ->
                startActivity(new Intent(HomeActivity.this, PerfilActivity.class))
        );

        // Card de check-in
        findViewById(R.id.cardCheckin).setOnClickListener(v -> abrirCheckin());

        // Card de plano de exercícios
        findViewById(R.id.cardExercisePlan).setOnClickListener(v -> abrirExercicios());
        findViewById(R.id.ivExerciseArrow).setOnClickListener(v -> abrirExercicios());

        // menu lateral
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
            startActivity(new Intent(HomeActivity.this, AgendaActivity.class));
        });

        // Item "Perfil" no drawer lateral — fecha o menu e abre a tela de perfil
        findViewById(R.id.menuPerfil).setOnClickListener(v -> {
            drawerLayout.closeDrawer(GravityCompat.START);
            startActivity(new Intent(HomeActivity.this, PerfilActivity.class));
        });
    }

    // para mostrar a data do dia
    private void setupCheckinDate() {
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy", Locale.getDefault());
        tvCheckinDate.setText(sdf.format(Calendar.getInstance().getTime()));
    }

    // barra de dias quando entra no card
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

        View dot = new View(this);
        LinearLayout.LayoutParams dotParams = new LinearLayout.LayoutParams(dpToPx(8), dpToPx(8));
        dotParams.setMargins(0, 0, 0, dpToPx(4));
        dot.setLayoutParams(dotParams);
        dot.setBackgroundResource(ehHoje ? R.drawable.dot_white : R.drawable.dot_gray);

        TextView tvNum = new TextView(this);
        tvNum.setText(String.valueOf(numero));
        tvNum.setTextSize(14);
        tvNum.setTypeface(null, Typeface.BOLD);
        tvNum.setGravity(Gravity.CENTER);
        tvNum.setTextColor(ehHoje ? Color.WHITE : Color.parseColor("#444444"));

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

    // saudação quando entra no app
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

        // muda o nome do usuário de acordo com o nome que ele colocou no cadastro
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
                    startActivity(new Intent(HomeActivity.this, AgendaActivity.class));
                    return true;
                } else if (id == R.id.nav_chat) {
                    // TODO: startActivity(new Intent(HomeActivity.this, ChatActivity.class));
                    return true;
                } else if (id == R.id.nav_profile) {
                    // Abre o perfil sem empilhar a HomeActivity no backstack
                    Intent intent = new Intent(HomeActivity.this, PerfilActivity.class);
                    intent.addFlags(Intent.FLAG_ACTIVITY_REORDER_TO_FRONT);
                    startActivity(intent);
                    // Volta a destacar o ícone Home para quando o usuário retornar
                    bottomNav.post(() -> bottomNav.setSelectedItemId(R.id.nav_home));
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
                // Se o drawer estiver aberto, fecha ele em vez de sair da tela
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