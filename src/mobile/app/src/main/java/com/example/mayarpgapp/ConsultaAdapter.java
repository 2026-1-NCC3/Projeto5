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

    private String formatarData(String dateISO) {
        try {
            SimpleDateFormat entrada = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", Locale.getDefault());
            SimpleDateFormat saida = new SimpleDateFormat("EEEE, dd 'de' MMMM", new Locale("pt", "BR"));
            Date date = entrada.parse(dateISO);
            return saida.format(date);
        } catch (Exception e) {
            return dateISO;
        }
    }

    private String formatarHorario(String dateISO) {
        try {
            SimpleDateFormat entrada = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", Locale.getDefault());
            SimpleDateFormat saida = new SimpleDateFormat("HH:mm", Locale.getDefault());
            Date date = entrada.parse(dateISO);
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