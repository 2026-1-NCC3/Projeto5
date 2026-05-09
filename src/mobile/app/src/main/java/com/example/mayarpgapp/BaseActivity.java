package com.example.mayarpgapp;

import android.content.Intent;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.FrameLayout;
import android.widget.LinearLayout;
import androidx.appcompat.app.AppCompatActivity;

public abstract class BaseActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        super.setContentView(R.layout.layout_base);

        FrameLayout contentFrame = findViewById(R.id.content_frame);
        View child = LayoutInflater.from(this).inflate(getLayoutId(), contentFrame, false);
        contentFrame.addView(child);

        setupNav();
    }

    private void setupNav() {
        findViewById(R.id.nav_btn_home).setOnClickListener(v -> {
            if (!(this instanceof HomeActivity)) {
                startActivity(new Intent(this, HomeActivity.class));
                overridePendingTransition(0, 0);
            }
        });
        findViewById(R.id.nav_btn_consultas).setOnClickListener(v -> {
            if (!(this instanceof ConsultaActivity)) {
                startActivity(new Intent(this, ConsultaActivity.class));
                overridePendingTransition(0, 0);
            }
        });
        findViewById(R.id.nav_btn_exercicios).setOnClickListener(v -> {
            if (!(this instanceof ExercisesActivity)) {
                startActivity(new Intent(this, ExercisesActivity.class));
                overridePendingTransition(0, 0);
            }
        });
        findViewById(R.id.nav_btn_historico).setOnClickListener(v -> {
            if (!(this instanceof CheckinActivity)) {
                startActivity(new Intent(this, CheckinActivity.class));
                overridePendingTransition(0, 0);
            }
        });
        findViewById(R.id.nav_btn_perfil).setOnClickListener(v -> {
            if (!(this instanceof PerfilActivity)) {
                startActivity(new Intent(this, PerfilActivity.class));
                overridePendingTransition(0, 0);
            }
        });

        highlightNavItem(getNavItemId());
    }

    private void highlightNavItem(int activeId) {
        int[] ids = {R.id.nav_btn_home, R.id.nav_btn_consultas,
                R.id.nav_btn_historico, R.id.nav_btn_perfil};
        for (int id : ids) {
            LinearLayout btn = findViewById(id);
            if (btn != null) btn.setAlpha(id == activeId ? 1f : 0.45f);
        }
    }

    protected abstract int getLayoutId();
    protected abstract int getNavItemId();
}