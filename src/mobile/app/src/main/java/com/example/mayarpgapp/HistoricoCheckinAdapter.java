package com.example.mayarpgapp;

import android.app.AlertDialog;
import android.content.Context;
import android.graphics.Color;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.mayarpgapp.api.ApiService;
import com.example.mayarpgapp.api.RetrofitClient;
import com.example.mayarpgapp.model.CheckinResponse;
import com.google.gson.JsonObject;

import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Locale;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

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

        h.btnCancelar.setOnClickListener(v -> {
            new AlertDialog.Builder(context)
                    .setTitle("Cancelar check-in")
                    .setMessage("Tem certeza que deseja cancelar este check-in?")
                    .setPositiveButton("Sim, cancelar", (dialog, which) -> {
                        int pos = h.getAdapterPosition();
                        if (pos != RecyclerView.NO_ID) {
                            cancelarCheckin(item.getId(), pos);
                        }
                    })
                    .setNegativeButton("Não", null)
                    .show();
        });
    }

    private void cancelarCheckin(String checkinId, int position) {
        String token = context.getSharedPreferences("APP", Context.MODE_PRIVATE)
                .getString("TOKEN", "");
        RetrofitClient.setToken(token);
        ApiService apiService = RetrofitClient.getInstance().create(ApiService.class);

        apiService.cancelarCheckin(checkinId).enqueue(new Callback<JsonObject>() {
            @Override
            public void onResponse(Call<JsonObject> call, Response<JsonObject> response) {
                if (response.isSuccessful()) {
                    lista.remove(position);
                    notifyItemRemoved(position);
                    notifyItemRangeChanged(position, lista.size());
                    Toast.makeText(context, "Check-in cancelado.", Toast.LENGTH_SHORT).show();
                } else {
                    Log.e("CHECKIN", "Erro ao cancelar: " + response.code());
                    Toast.makeText(context, "Não foi possível cancelar. Tente novamente.", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<JsonObject> call, Throwable t) {
                Log.e("CHECKIN", "Falha: " + t.getMessage());
                Toast.makeText(context, "Erro de conexão.", Toast.LENGTH_SHORT).show();
            }
        });
    }

    @Override
    public int getItemCount() { return lista.size(); }

    static class ViewHolder extends RecyclerView.ViewHolder {
        TextView txtData, txtHorario, txtDor, txtObservacao, btnCancelar;
        ImageView icNivelDor;

        ViewHolder(View v) {
            super(v);
            txtData       = v.findViewById(R.id.txt_checkin_data);
            txtHorario    = v.findViewById(R.id.txt_checkin_horario);
            txtDor        = v.findViewById(R.id.txt_checkin_dor);
            txtObservacao = v.findViewById(R.id.txt_checkin_observacao);
            icNivelDor    = v.findViewById(R.id.ic_nivel_dor);
            btnCancelar   = v.findViewById(R.id.btn_cancelar_checkin);
        }
    }

    private java.util.Date parseISO(String iso) throws Exception {
        String normalized = iso.replaceAll("([+-]\\d{2}):(\\d{2})$", "$1$2");
        String[] patterns = {
                "yyyy-MM-dd'T'HH:mm:ss.SSSSSSZ",
                "yyyy-MM-dd'T'HH:mm:ss.SSSZ",
                "yyyy-MM-dd'T'HH:mm:ssZ",
                "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
                "yyyy-MM-dd'T'HH:mm:ss'Z'"
        };
        for (String pattern : patterns) {
            try {
                SimpleDateFormat sdf = new SimpleDateFormat(pattern, Locale.getDefault());
                sdf.setTimeZone(java.util.TimeZone.getTimeZone("UTC"));
                return sdf.parse(normalized);
            } catch (Exception ignored) {}
        }
        throw new Exception("Não foi possível parsear: " + iso);
    }

    private String formatarData(String iso) {
        try {
            SimpleDateFormat saida = new SimpleDateFormat("EEEE, dd 'de' MMMM", new Locale("pt", "BR"));
            return saida.format(parseISO(iso));
        } catch (Exception e) { return iso; }
    }

    private String formatarHorario(String iso) {
        try {
            SimpleDateFormat saida = new SimpleDateFormat("HH:mm", Locale.getDefault());
            return saida.format(parseISO(iso));
        } catch (Exception e) { return iso; }
    }
}