package com.example.mayarpgapp.api;

import com.example.mayarpgapp.model.User;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.POST;

public interface ApiService {
    @POST("auth/register")
    Call<Object> register(@Body User user);

    @POST("users/login")
    Call<Object> login(@Body User user);
}
