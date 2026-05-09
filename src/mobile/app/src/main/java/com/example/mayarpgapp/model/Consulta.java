package com.example.mayarpgapp.model;

import com.google.gson.annotations.SerializedName;

public class Consulta {

    @SerializedName("id")
    private String id;

    @SerializedName("appointment_date")
    private String appointmentDate;

    @SerializedName("status")
    private String status;

    @SerializedName("notes")
    private String notes;

    public String getId() { return id; }
    public String getAppointmentDate() { return appointmentDate; }
    public String getStatus() { return status; }
    public String getNotes() { return notes; }
}