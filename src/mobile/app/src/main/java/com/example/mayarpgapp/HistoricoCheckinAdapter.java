package com.example.mayarpgapp;

import android.content.Context;
import android.graphics.Color;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.mayarpgapp.model.CheckinResponse;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;

public class HistoricoCheckinAdapter extends RecyclerView.Adapter<HistoricoCheckinAdapter.ViewHolder> {

    private final Context context;
    private final List<CheckinResponse> lista;

    public HistoricoCheckinAdapter(Context context, List<CheckinResponse> lista) {
        this.context = context;
        this.lista   = lista;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(context)
                .inflate(R.layout.item_checkin, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder h, int position) {
        CheckinResponse item = lista.get(position);

        h.txtData.setText(formatarData(item.getCreatedAt()));
        h.txtHorario.setText(formatarHorario(item.getCreatedAt()));

        int dor = item.getPainLevel();
        h.txtDor.setText(dor + "/10");

        // ícone e cor conforme nível de dor
        if (dor <= 3) {
            h.txtDor.setTextColor(Color.parseColor("#4CAF50"));
            h.txtDor.setBackgroundResource(R.drawable.bg_badge_green);
            h.icNivelDor.setImageResource(R.drawable.ic_hist_dorleve);
        } else if (dor <= 6) {
            h.txtDor.setTextColor(Color.parseColor("#FF8A65"));
            h.txtDor.setBackgroundResource(R.drawable.bg_badge_orange);
            h.icNivelDor.setImageResource(R.drawable.ic_hist_dormoderada);
        } else {
            h.txtDor.setTextColor(Color.parseColor("#E53935"));
            h.txtDor.setBackgroundResource(R.drawable.bg_badge_red);
            h.icNivelDor.setImageResource(R.drawable.ic_hist_doralta);
        }

        if (item.getNotes() != null && !item.getNotes().isEmpty()) {
            h.txtObservacao.setVisibility(View.VISIBLE);
            h.txtObservacao.setText(item.getNotes());
        } else {
            h.txtObservacao.setVisibility(View.GONE);
        }
    }

    @Override
    public int getItemCount() { return lista.size(); }

    static class ViewHolder extends RecyclerView.ViewHolder {
        TextView txtData, txtHorario, txtDor, txtObservacao;
        ImageView icNivelDor;

        ViewHolder(View v) {
            super(v);
            txtData       = v.findViewById(R.id.txt_checkin_data);
            txtHorario    = v.findViewById(R.id.txt_checkin_horario);
            txtDor        = v.findViewById(R.id.txt_checkin_dor);
            txtObservacao = v.findViewById(R.id.txt_checkin_observacao);
            icNivelDor    = v.findViewById(R.id.ic_nivel_dor);
        }
    }

    private String formatarData(String iso) {
        try {
            SimpleDateFormat entrada = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", Locale.getDefault());
            SimpleDateFormat saida   = new SimpleDateFormat("EEEE, dd 'de' MMMM", new Locale("pt", "BR"));
            return saida.format(entrada.parse(iso));
        } catch (Exception e) { return iso; }
    }

    private String formatarHorario(String iso) {
        try {
            SimpleDateFormat entrada = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", Locale.getDefault());
            SimpleDateFormat saida   = new SimpleDateFormat("HH:mm", Locale.getDefault());
            return saida.format(entrada.parse(iso));
        } catch (Exception e) { return iso; }
    }
}