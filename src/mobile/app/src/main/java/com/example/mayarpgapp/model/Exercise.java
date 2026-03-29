package com.example.mayarpgapp.model;

import com.google.gson.annotations.SerializedName;

public class Exercise {

    @SerializedName("id")
    private int id;

    @SerializedName("title")
    private String title;

    @SerializedName("description")
    private String description;

    @SerializedName("image_url")
    private String imageUrl;

    @SerializedName("video_url")
    private String videoUrl;

    @SerializedName("frequency")
    private String frequency;

    public int getId()          { return id; }
    public String getTitle()    { return title; }
    public String getDescription() { return description; }
    public String getImageUrl() { return imageUrl; }
    public String getVideoUrl() { return videoUrl; }
    public String getFrequency() { return frequency; }
}