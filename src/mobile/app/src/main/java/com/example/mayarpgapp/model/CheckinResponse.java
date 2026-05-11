package com.example.mayarpgapp.model;

import com.google.gson.annotations.SerializedName;

public class CheckinResponse {

    @SerializedName("id")
    private String id;

    @SerializedName("pain_level")
    private int painLevel;

    @SerializedName("notes")
    private String notes;

    @SerializedName("created_at")
    private String createdAt;

    public String getId()       { return id; }
    public int getPainLevel()   { return painLevel; }
    public String getNotes()    { return notes; }
    public String getCreatedAt(){ return createdAt; }
}