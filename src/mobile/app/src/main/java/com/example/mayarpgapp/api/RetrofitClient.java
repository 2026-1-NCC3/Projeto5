package com.example.mayarpgapp.api;

import java.security.cert.CertificateException;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSocketFactory;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;

import okhttp3.OkHttpClient;
import okhttp3.Request;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class RetrofitClient {

    private static final String BASE_URL = "https://maya-rpg-4r68.onrender.com/api/";

    // CORRIGIDO: token e instâncias como singletons
    private static String authToken = null;
    private static OkHttpClient okHttpClient = null;
    private static Retrofit retrofitInstance = null;

    public static void setToken(String token) {
        authToken = token;
        // CORRIGIDO: ao trocar o token, descarta as instâncias antigas
        // para que o próximo getInstance() use o novo token
        okHttpClient = null;
        retrofitInstance = null;
    }

    // CORRIGIDO: singleton — reutiliza a instância já criada
    public static Retrofit getInstance() {
        if (retrofitInstance == null) {
            retrofitInstance = new Retrofit.Builder()
                    .baseUrl(BASE_URL)
                    .client(getOkHttpClient())
                    .addConverterFactory(GsonConverterFactory.create())
                    .build();
        }
        return retrofitInstance;
    }

    private static OkHttpClient getOkHttpClient() {
        if (okHttpClient != null) return okHttpClient;

        try {
            final TrustManager[] trustAllCerts = new TrustManager[]{
                    new X509TrustManager() {
                        @Override
                        public void checkClientTrusted(java.security.cert.X509Certificate[] chain, String authType) throws CertificateException {}
                        @Override
                        public void checkServerTrusted(java.security.cert.X509Certificate[] chain, String authType) throws CertificateException {}
                        @Override
                        public java.security.cert.X509Certificate[] getAcceptedIssuers() {
                            return new java.security.cert.X509Certificate[]{};
                        }
                    }
            };

            final SSLContext sslContext = SSLContext.getInstance("SSL");
            sslContext.init(null, trustAllCerts, new java.security.SecureRandom());
            final SSLSocketFactory sslSocketFactory = sslContext.getSocketFactory();

            OkHttpClient.Builder builder = new OkHttpClient.Builder();
            builder.sslSocketFactory(sslSocketFactory, (X509TrustManager) trustAllCerts[0]);
            builder.hostnameVerifier((hostname, session) -> true);

            builder.addInterceptor(chain -> {
                Request.Builder requestBuilder = chain.request().newBuilder()
                        .addHeader("Content-Type", "application/json");

                // CORRIGIDO: lê authToken no momento da chamada (não no momento da criação)
                if (authToken != null && !authToken.isEmpty()) {
                    requestBuilder.addHeader("Authorization", "Bearer " + authToken);
                }

                return chain.proceed(requestBuilder.build());
            });

            okHttpClient = builder.build();
            return okHttpClient;

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}