package com.example.mayarpgapp;

import android.content.Context;
import android.content.SharedPreferences;
import androidx.appcompat.app.AppCompatDelegate;

public class ThemeManager {

    private static final String PREFS_NAME = "maya_prefs";
    private static final String KEY_DARK_MODE = "dark_mode";

    // Aplica o tema salvo — chame no onCreate() de cada Activity,
    // ANTES de setContentView()
    public static void aplicarTema(Context context) {
        boolean darkMode = isDarkModeAtivo(context);
        AppCompatDelegate.setDefaultNightMode(
                darkMode
                        ? AppCompatDelegate.MODE_NIGHT_YES
                        : AppCompatDelegate.MODE_NIGHT_NO
        );
    }

    // Salva a preferência e aplica imediatamente
    public static void setDarkMode(Context context, boolean ativo) {
        SharedPreferences prefs = context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
        prefs.edit().putBoolean(KEY_DARK_MODE, ativo).apply();

        AppCompatDelegate.setDefaultNightMode(
                ativo
                        ? AppCompatDelegate.MODE_NIGHT_YES
                        : AppCompatDelegate.MODE_NIGHT_NO
        );
    }

    // Retorna true se o dark mode está ativo
    public static boolean isDarkModeAtivo(Context context) {
        SharedPreferences prefs = context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
        return prefs.getBoolean(KEY_DARK_MODE, false); // padrão: light mode
    }
}