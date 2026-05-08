package com.example.mayarpgapp.api;

import com.example.mayarpgapp.model.AuthResponse;
import com.example.mayarpgapp.model.LoginRequest;
import com.example.mayarpgapp.model.CheckinResponse;
import com.example.mayarpgapp.model.HistoricoResponse;
import com.example.mayarpgapp.model.Exercise;
import com.google.gson.JsonObject;

import java.util.List;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.Header;
import retrofit2.http.POST;
import retrofit2.http.Query;

public interface ApiService {

    // Verifica se o paciente existe no banco da clínica (Supabase)
    // Espera: name, birth_date, cpf, email
    @POST("auth/verificar-paciente")
    Call<JsonObject> verificarPaciente(@Body JsonObject body);

    // Cria a senha para um paciente verificado
    @POST("activation/activate")
    Call<JsonObject> ativarConta(@Body JsonObject body);

    // Realiza o login e retorna o token JWT
    @POST("auth/login")
    Call<AuthResponse> login(@Body LoginRequest login);

    // Registra o exercício do dia (Check-in)
    @POST("checkin")
    Call<CheckinResponse> fazerCheckin(
            @Header("Authorization") String token
    );

    // Busca o histórico de presenças para o calendário
    @GET("checkin/historico")
    Call<HistoricoResponse> getHistorico(
            @Header("Authorization") String token,
            @Query("dias") int dias
    );

    // Lista os exercícios do plano do paciente
    @GET("exercises")
    Call<List<Exercise>> getExercises(@Header("Authorization") String token);
}