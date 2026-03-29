package com.example.mayarpgapp;

import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;

public class ExercisesActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_exercises);

        findViewById(R.id.ivBack).setOnClickListener(v -> finish());
    }
}