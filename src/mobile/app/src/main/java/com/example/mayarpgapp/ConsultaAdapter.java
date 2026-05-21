package com.example.mayarpgapp;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.mayarpgapp.model.Consulta;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;

public class ConsultaAdapter extends RecyclerView.Adapter<ConsultaAdapter.ViewHolder> {

    private List<Consulta> consultas;
    private boolean isHistorico;

    public ConsultaAdapter(List<Consulta> consultas, boolean isHistorico) {
        this.consultas = consultas;
        this.isHistorico = isHistorico;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.item_consulta, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        Consulta consulta = consultas.get(position);

        holder.txtTipo.setText("Fisioterapia");
        holder.txtMedico.setText("com Dra. Maya");
        holder.txtData.setText(formatarData(consulta.getAppointmentDate()));
        holder.txtHorario.setText(formatarHorario(consulta.getAppointmentDate()));

        if (isHistorico) {
            holder.icStatus.setImageResource(R.drawable.ic_checkconsulta);
        } else {
            holder.icStatus.setImageResource(R.drawable.ic_calendar_proximas);
        }
    }

    @Override
    public int getItemCount() {
        return consultas != null ? consultas.size() : 0;
    }

    private java.util.Date parseISO(String iso) throws Exception {
        // 1. Trunca microsegundos para milissegundos (ex: .139511 → .139)
        String s = iso.replaceAll("(\\.\\d{3})\\d+", "$1");
        // 2. Normaliza offset +HH:MM → +HHMM
        s = s.replaceAll("([+-]\\d{2}):(\\d{2})$", "$1$2");
        String[] patterns = {
                "yyyy-MM-dd'T'HH:mm:ss.SSSZ",
                "yyyy-MM-dd'T'HH:mm:ssZ",
                "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
                "yyyy-MM-dd'T'HH:mm:ss'Z'"
        };
        for (String pattern : patterns) {
            try {
                SimpleDateFormat sdf = new SimpleDateFormat(pattern, Locale.getDefault());
                sdf.setTimeZone(java.util.TimeZone.getTimeZone("UTC"));
                return sdf.parse(s);
            } catch (Exception ignored) {}
        }
        throw new Exception("Não foi possível parsear: " + iso);
    }

    private String formatarData(String dateISO) {
        try {
            SimpleDateFormat saida = new SimpleDateFormat("EEEE, dd 'de' MMMM", new Locale("pt", "BR"));
            return saida.format(parseISO(dateISO));
        } catch (Exception e) {
            return dateISO;
        }
    }

    private String formatarHorario(String dateISO) {
        try {
            Date date = parseISO(dateISO);
            SimpleDateFormat saida = new SimpleDateFormat("HH:mm", Locale.getDefault());
            String inicio = saida.format(date);
            String fim = saida.format(new Date(date.getTime() + 3600000));
            return inicio + " - " + fim;
        } catch (Exception e) {
            return dateISO;
        }
    }

    public static class ViewHolder extends RecyclerView.ViewHolder {
        TextView txtTipo, txtMedico, txtData, txtHorario;
        ImageView icStatus;

        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            txtTipo = itemView.findViewById(R.id.txt_consulta_tipo);
            txtMedico = itemView.findViewById(R.id.txt_consulta_medico);
            txtData = itemView.findViewById(R.id.txt_consulta_data);
            txtHorario = itemView.findViewById(R.id.txt_consulta_horario);
            icStatus = itemView.findViewById(R.id.ic_consulta_status);
        }
    }
}