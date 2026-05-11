package com.example.mayarpgapp.model;

import com.google.gson.annotations.SerializedName;
import java.util.ArrayList;
import java.util.List;

public class PlanoExercicio {

    @SerializedName("id")
    private String id;

    @SerializedName("plans")
    private PlanDetail plans;

    public String getId() { return id; }
    public PlanDetail getPlans() { return plans; }

    public String getNome() {
        return plans != null ? plans.getTitle() : null;
    }

    public String getDuracaoTotal() {
        return plans != null ? plans.getDuration() : null;
    }

    public String getNivel() {
        return plans != null ? plans.getLevel() : null;
    }

    public List<Exercise> getExercicios() {
        if (plans == null || plans.getPlanExercises() == null) return new ArrayList<>();
        List<Exercise> lista = new ArrayList<>();
        for (PlanExerciseItem item : plans.getPlanExercises()) {
            if (item.getExercise() != null) {
                Exercise ex = item.getExercise();
                ex.setFrequency(item.getFrequency());
                lista.add(ex);
            }
        }
        return lista;
    }

    public boolean temExercicios() {
        return !getExercicios().isEmpty();
    }

    // ── Classes internas ──────────────────────────────────────

    public static class PlanDetail {
        @SerializedName("id")
        private String id;

        @SerializedName("title")
        private String title;

        @SerializedName("description")
        private String description;

        @SerializedName("duration")
        private String duration;

        @SerializedName("level")
        private String level;

        @SerializedName("plan_exercises")
        private List<PlanExerciseItem> planExercises;

        public String getId()          { return id; }
        public String getTitle()       { return title; }
        public String getDescription() { return description; }
        public String getDuration()    { return duration; }
        public String getLevel()       { return level; }
        public List<PlanExerciseItem> getPlanExercises() { return planExercises; }
    }

    public static class PlanExerciseItem {
        @SerializedName("id")
        private String id;

        @SerializedName("frequency")
        private String frequency;

        @SerializedName("exercises")
        private Exercise exercise;

        public String getId()          { return id; }
        public String getFrequency()   { return frequency; }
        public Exercise getExercise()  { return exercise; }
    }
}