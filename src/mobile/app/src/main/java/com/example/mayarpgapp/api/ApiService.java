package com.example.mayarpgapp.api;

import com.example.mayarpgapp.model.AuthResponse;
import com.example.mayarpgapp.model.ConsultaResponse;
import com.example.mayarpgapp.model.LoginRequest;
import com.example.mayarpgapp.model.CheckinResponse;
import com.example.mayarpgapp.model.HistoricoResponse;
import com.example.mayarpgapp.model.Exercise;
import com.example.mayarpgapp.model.PlanoExercicio;
import com.example.mayarpgapp.model.Progresso;
import com.example.mayarpgapp.model.Paciente;
import com.google.gson.JsonObject;

import java.util.List;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.Query;
import retrofit2.http.DELETE;

public interface ApiService {

    @POST("auth/verificar-paciente")
    Call<JsonObject> verificarPaciente(@Body JsonObject body);

    @POST("activation/activate")
    Call<JsonObject> ativarConta(@Body JsonObject body);

    @POST("auth/login")
    Call<AuthResponse> login(@Body LoginRequest login);

    @POST("checkins")
    Call<CheckinResponse> fazerCheckin(@Body JsonObject body);

    @GET("checkins/historico")
    Call<HistoricoResponse> getHistorico(@Query("dias") int dias);

    @GET("checkins")
    Call<List<CheckinResponse>> getMeusCheckins();

    @GET("exercises")
    Call<List<Exercise>> getExercises();

    @GET("plans/my")
    Call<List<PlanoExercicio>> getPlanoExercicio();

    @GET("appointments/my")
    Call<ConsultaResponse> getConsultas();

    @GET("progresso")
    Call<Progresso> getProgresso();

    @GET("patients/me")
    Call<Paciente> getPerfil();

    @DELETE("checkins/{id}")
    Call<JsonObject> cancelarCheckin(@retrofit2.http.Path("id") String checkinId);
}