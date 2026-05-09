plugins {
    alias(libs.plugins.android.application)
}

android {
    namespace = "com.example.mayarpgapp"
    // Use a versão 34 ou 35 para garantir estabilidade na entrega
    compileSdk = 36

    defaultConfig {
        applicationId = "com.example.mayarpgapp"
        minSdk = 24
        targetSdk = 34
        versionCode = 1
        versionName = "1.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_11
        targetCompatibility = JavaVersion.VERSION_11
    }
}

dependencies {
    // Bibliotecas base (mantendo o que você já tinha via libs)
    implementation(libs.appcompat)
    implementation(libs.material)
    implementation(libs.activity)
    implementation(libs.constraintlayout)

    // GLIDE (Imagens) - Limpei as repetições
    implementation("com.github.bumptech.glide:glide:4.16.0")
    // Se estiver usando Kotlin, o ideal é 'kapt', mas como seu projeto é Java, mantemos:
    annotationProcessor("com.github.bumptech.glide:compiler:4.16.0")

    // RETROFIT (API)
    implementation("com.squareup.retrofit2:retrofit:2.9.0")
    implementation("com.squareup.retrofit2:converter-gson:2.9.0")

    // ANDROIDX COMPONENTES (Para o seu XML funcionar)
    implementation("androidx.coordinatorlayout:coordinatorlayout:1.2.0")
    implementation("androidx.recyclerview:recyclerview:1.3.2")

    // TESTES
    testImplementation(libs.junit)
    androidTestImplementation(libs.ext.junit)
    androidTestImplementation(libs.espresso.core)
}