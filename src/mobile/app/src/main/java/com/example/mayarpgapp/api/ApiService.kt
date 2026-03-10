package com.example.mayarpgapp.api

import com.example.mayarpgapp.model.Patient
import retrofit2.Call
import retrofit2.http.GET

interface ApiService {

    @GET("patients")
    fun getPatients(): Call<List<Patient>>

}