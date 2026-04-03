package com.example.mayarpgapp.api;

import okhttp3.OkHttpClient;
import okhttp3.Request;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class RetrofitClient {
    private static final String BASE_URL = "https://maya-rpg-4r68.onrender.com/api/";
    private static String authToken = null;

    public static void setToken(String token) {
        authToken = token;
    }

    public static Retrofit getInstance() {
        OkHttpClient client = new OkHttpClient.Builder()
                .addInterceptor(chain -> {
                    Request.Builder builder = chain.request().newBuilder()
                            .addHeader("Content-Type", "application/json");

                    if (authToken != null && !authToken.isEmpty()) {
                        builder.addHeader("Authorization", "Bearer " + authToken);
                    }

                    return chain.proceed(builder.build());
                })
                .build();

        return new Retrofit.Builder()
                .baseUrl(BASE_URL)
                .client(client)
                .addConverterFactory(GsonConverterFactory.create())
                .build();
    }
}