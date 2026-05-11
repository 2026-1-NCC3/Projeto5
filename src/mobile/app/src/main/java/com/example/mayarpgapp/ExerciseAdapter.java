package com.example.mayarpgapp;

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

    public interface OnExerciseClickListener {
        void onExerciseClick(Exercise exercise);
    }

    private final Context context;
    private final List<Exercise> exercises;
    private final OnExerciseClickListener listener;

    public ExerciseAdapter(Context context, List<Exercise> exercises, OnExerciseClickListener listener) {
        this.context   = context;
        this.exercises = exercises;
        this.listener  = listener;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(context).inflate(R.layout.item_exercise, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        Exercise exercise = exercises.get(position);

        holder.tvTitle.setText(exercise.getTitle());
        holder.tvFrequency.setText(
                exercise.getFrequency() != null && !exercise.getFrequency().isEmpty()
                        ? exercise.getFrequency()
                        : "Sem frequência definida"
        );

        // Carrega imagem da API via Glide
        if (exercise.getImageUrl() != null && !exercise.getImageUrl().isEmpty()) {
            Glide.with(context)
                    .load(exercise.getImageUrl())
                    .placeholder(R.drawable.ic_exercise_placeholder)
                    .error(R.drawable.ic_exercise_placeholder)
                    .centerCrop()
                    .into(holder.ivThumb);
        } else {
            holder.ivThumb.setImageResource(R.drawable.ic_exercise_placeholder);
        }

        holder.itemView.setOnClickListener(v -> listener.onExerciseClick(exercise));
    }

    @Override
    public int getItemCount() { return exercises.size(); }

    static class ViewHolder extends RecyclerView.ViewHolder {
        ImageView ivThumb, ivCheckEstado;
        TextView tvTitle, tvFrequency;

        ViewHolder(@NonNull View itemView) {
            super(itemView);
            ivThumb       = itemView.findViewById(R.id.ivExerciseThumb);
            ivCheckEstado = itemView.findViewById(R.id.ivCheckEstado);
            tvTitle       = itemView.findViewById(R.id.tvExerciseTitle);
            tvFrequency   = itemView.findViewById(R.id.tvExerciseFrequency);
        }
    }
}