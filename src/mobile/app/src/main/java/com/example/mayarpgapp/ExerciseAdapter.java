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

/**
 * Adapter responsável por conectar a lista de exercícios ao RecyclerView.
 * Ele cria e recicla os cards de exercício na tela.
 */
public class ExerciseAdapter extends RecyclerView.Adapter<ExerciseAdapter.ViewHolder> {

    /**
     * Interface de callback para comunicar cliques ao Fragment/Activity pai.
     * Quem usar esse adapter precisa implementar esse método para saber
     * qual exercício o usuário tocou.
     */
    public interface OnExerciseClickListener {
        void onExerciseClick(Exercise exercise);
    }

    private final Context context;                   // Contexto do app (necessário para inflar layouts e carregar imagens)
    private final List<Exercise> exercises;          // Lista de exercícios que será exibida no RecyclerView
    private final OnExerciseClickListener listener;  // Listener que recebe os eventos de clique

    /**
     * Construtor do adapter.
     *
     * @param context   Contexto da Activity ou Fragment que está usando o RecyclerView
     * @param exercises Lista de exercícios a exibir
     * @param listener  Callback chamado quando o usuário clicar em um exercício
     */
    public ExerciseAdapter(Context context, List<Exercise> exercises, OnExerciseClickListener listener) {
        this.context   = context;
        this.exercises = exercises;
        this.listener  = listener;
    }

    /**
     * Chamado pelo RecyclerView quando precisa criar um novo card (ViewHolder).
     * Infla o layout XML do item (item_exercise.xml) e devolve o ViewHolder pronto.
     */
    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        // Transforma o arquivo XML item_exercise.xml em um objeto View
        View view = LayoutInflater.from(context).inflate(R.layout.item_exercise, parent, false);
        return new ViewHolder(view);
    }

    /**
     * Chamado pelo RecyclerView para preencher os dados de um card já existente.
     * É aqui que os dados do exercício são jogados nas views do layout.
     *
     * @param holder   O ViewHolder do card que será preenchido
     * @param position A posição do item na lista
     */
    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        Exercise exercise = exercises.get(position); // Pega o exercício da posição atual

        // Preenche o título do exercício no TextView
        holder.tvTitle.setText(exercise.getTitle());

        // Preenche a frequência; exibe texto padrão se o campo vier vazio ou nulo
        String freq = exercise.getFrequency();
        holder.tvFrequency.setText(freq != null && !freq.isEmpty() ? freq : "Sem frequência definida");

        // Carrega a imagem do exercício com a biblioteca Glide.
        // Se a URL for válida: carrega da internet com placeholder de loading e fallback de erro.
        // Se a URL for nula/vazia: usa direto o drawable placeholder.
        if (exercise.getImageUrl() != null && !exercise.getImageUrl().isEmpty()) {
            Glide.with(context)
                    .load(exercise.getImageUrl())
                    .placeholder(R.drawable.ic_exercise_placeholder) // Exibido enquanto a imagem carrega
                    .error(R.drawable.ic_exercise_placeholder)       // Exibido se o carregamento falhar
                    .centerCrop()                                    // Recorta a imagem para preencher o espaço
                    .into(holder.ivThumb);
        } else {
            holder.ivThumb.setImageResource(R.drawable.ic_exercise_placeholder);
        }

        // Configura os listeners de clique:
        // Tanto o card inteiro quanto o botão de play disparam o mesmo callback,
        // passando o exercício clicado para quem estiver ouvindo.
        holder.itemView.setOnClickListener(v -> listener.onExerciseClick(exercise));
        holder.ivPlayBtn.setOnClickListener(v -> listener.onExerciseClick(exercise));
    }

    /**
     * Informa ao RecyclerView quantos itens existem na lista.
     * Usado internamente para saber quando parar de criar/reciclar cards.
     */
    @Override
    public int getItemCount() { return exercises.size(); }

    /**
     * ViewHolder: guarda as referências das views de um único card de exercício.
     * Evita chamadas repetidas a findViewById() toda vez que um card é reaproveitado,
     * o que melhora a performance da rolagem.
     */
    static class ViewHolder extends RecyclerView.ViewHolder {
        ImageView ivThumb;    // Thumbnail/imagem do exercício
        ImageView ivPlayBtn;  // Botão de play sobreposto à imagem
        TextView tvTitle;     // Nome do exercício
        TextView tvFrequency; // Frequência recomendada do exercício

        ViewHolder(@NonNull View itemView) {
            super(itemView);
            // Liga cada variável ao seu respectivo elemento no XML pelo ID
            ivThumb      = itemView.findViewById(R.id.ivExerciseThumb);
            ivPlayBtn    = itemView.findViewById(R.id.ivPlayBtn);
            tvTitle      = itemView.findViewById(R.id.tvExerciseTitle);
            tvFrequency  = itemView.findViewById(R.id.tvExerciseFrequency);
        }
    }
}