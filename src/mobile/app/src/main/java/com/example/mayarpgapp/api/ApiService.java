package com.example.mayarpgapp.api;

import com.example.mayarpgapp.model.AuthResponse;
import com.example.mayarpgapp.model.LoginRequest;
import com.example.mayarpgapp.model.User;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.POST;

public interface ApiService {
    @POST("auth/register")
    Call<AuthResponse> register(@Body User user);

    @POST("auth/login")
    Call<AuthResponse> login(@Body LoginRequest login);
}
