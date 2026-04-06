package com.example.mayarpgapp;

import com.example.mayarpgapp.R;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;
import com.bumptech.glide.Glide;
import com.example.mayarpgapp.model.Exercise;
import java.util.List;

public class ExerciseAdapter extends RecyclerView.Adapter<ExerciseAdapter.ViewHolder> {

    // Interface para avisar quando um exercício for clicado
    public interface OnExerciseClickListener {
        void onExerciseClick(Exercise exercise);
    }

    private final Context context;
    private final List<Exercise> exercises;
    private final OnExerciseClickListener listener;

    // Construtor: recebe o contexto, a lista de dados e a ação de clique
    public ExerciseAdapter(Context context, List<Exercise> exercises, OnExerciseClickListener listener) {
        this.context   = context;
        this.exercises = exercises;
        this.listener  = listener;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        // Infla o layout de cada item da lista (o card do exercício)
        View view = LayoutInflater.from(context).inflate(R.layout.item_exercise, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        // Pega o exercício atual da lista
        Exercise exercise = exercises.get(position);

        // Define o título e a frequência (com um texto padrão caso esteja vazio)
        holder.tvTitle.setText(exercise.getTitle());
        String freq = exercise.getFrequency();
        holder.tvFrequency.setText(freq != null && !freq.isEmpty() ? freq : "Sem frequência definida");

        // Carrega a imagem da internet usando a biblioteca Glide
        if (exercise.getImageUrl() != null && !exercise.getImageUrl().isEmpty()) {
            Glide.with(context)
                    .load(exercise.getImageUrl())
                    .placeholder(R.drawable.ic_exercise_placeholder) // Imagem temporária
                    .error(R.drawable.ic_exercise_placeholder)       // Imagem caso dê erro
                    .centerCrop()
                    .into(holder.ivThumb);
        } else {
            holder.ivThumb.setImageResource(R.drawable.ic_exercise_placeholder);
        }

        // Configura o clique no card e no botão de play
        holder.itemView.setOnClickListener(v -> listener.onExerciseClick(exercise));
        holder.ivPlayBtn.setOnClickListener(v -> listener.onExerciseClick(exercise));
    }

    // Retorna o tamanho total da lista
    @Override
    public int getItemCount() { return exercises.size(); }

    // Classe que guarda as referências dos componentes visuais do card
    static class ViewHolder extends RecyclerView.ViewHolder {
        ImageView ivThumb, ivPlayBtn;
        TextView tvTitle, tvFrequency;

        ViewHolder(@NonNull View itemView) {
            super(itemView);
            // Vincula os IDs do XML às variáveis Java
            ivThumb      = itemView.findViewById(R.id.ivExerciseThumb);
            ivPlayBtn    = itemView.findViewById(R.id.ivPlayBtn);
            tvTitle      = itemView.findViewById(R.id.tvExerciseTitle);
            tvFrequency  = itemView.findViewById(R.id.tvExerciseFrequency);
        }
    }
}