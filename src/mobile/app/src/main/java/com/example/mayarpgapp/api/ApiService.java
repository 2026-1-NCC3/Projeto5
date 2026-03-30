package com.example.mayarpgapp.api;

import com.example.mayarpgapp.model.AuthResponse;
import com.example.mayarpgapp.model.LoginRequest;
import com.example.mayarpgapp.model.CheckinResponse;
import com.example.mayarpgapp.model.HistoricoResponse;
import com.example.mayarpgapp.model.Exercise;
import com.example.mayarpgapp.model.UserRegister;

import java.util.List;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.Header;
import retrofit2.http.POST;
import retrofit2.http.Query;

public interface ApiService {
    @POST("auth/register")
    Call<AuthResponse> register(@Body UserRegister user);

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
