package com.example.mayarpgapp.api;

import com.example.mayarpgapp.model.AuthResponse;
import com.example.mayarpgapp.model.LoginRequest;
import com.example.mayarpgapp.model.CheckinResponse;
import com.example.mayarpgapp.model.HistoricoResponse;
import com.example.mayarpgapp.model.Exercise;

import java.util.List;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.Header;
import retrofit2.http.POST;
import retrofit2.http.Query;
import com.google.gson.JsonObject;

public interface ApiService {

    @POST("auth/verificar-paciente")
    Call<JsonObject> verificarPaciente(@Body JsonObject body);

    @POST("auth/ativar-conta")
    Call<JsonObject> ativarConta(@Body JsonObject body);

    @POST("auth/login")
    Call<AuthResponse> login(@Body LoginRequest login);
    @POST("checkin")
    Call<CheckinResponse> fazerCheckin(
            @Header("Authorization") String token
    );
    @GET("checkin/historico")
    Call<HistoricoResponse> getHistorico(
            @Header("Authorization") String token,
            @Query("dias") int dias
    );
    @GET("exercises")
    Call<List<Exercise>> getExercises(@Header("Authorization") String token);
}
