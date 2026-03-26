package com.example.mayarpgapp;

import android.os.Bundle;
import android.view.View;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.widget.NestedScrollView;
import com.google.android.material.button.MaterialButton;

public class TermosActivity extends AppCompatActivity {

    private NestedScrollView nsvTermos;
    private MaterialButton btnAccept;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_terms);

        nsvTermos = findViewById(R.id.nsvTermos);
        btnAccept = findViewById(R.id.btnAccept);

        nsvTermos.setOnScrollChangeListener((NestedScrollView.OnScrollChangeListener) (v, scrollX, scrollY, oldScrollX, oldScrollY) -> {
            View content = v.getChildAt(0);
            if (content != null) {
                if (scrollY + v.getMeasuredHeight() >= content.getMeasuredHeight()) {
                    btnAccept.setEnabled(true);
                    btnAccept.setAlpha(1.0f);
                    btnAccept.setText("Li e aceito os termos");
                }
            }
        });

        btnAccept.setOnClickListener(v -> finish());
    }
}