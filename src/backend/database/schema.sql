CREATE TABLE users (    
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE patients (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    phone VARCHAR(20),
    birth_date DATE,
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE exercises (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    video_url TEXT,
    image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE exercise_plans (
    id SERIAL PRIMARY KEY,
    patient_id INTEGER REFERENCES patients(id),
    created_by INTEGER REFERENCES users(id),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE exercise_plan_items (
    id SERIAL PRIMARY KEY,
    plan_id INTEGER REFERENCES exercise_plans(id),
    exercise_id INTEGER REFERENCES exercises(id),
    frequency VARCHAR(50),
    instructions TEXT
);

CREATE TABLE exercise_logs (
    id SERIAL PRIMARY KEY,
    patient_id INTEGER REFERENCES patients(id),
    exercise_id INTEGER REFERENCES exercises(id),
    pain_level INTEGER,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE appointments (
    id SERIAL PRIMARY KEY,
    patient_id INTEGER REFERENCES patients(id),
    appointment_date TIMESTAMP,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE checkins (
    id          SERIAL PRIMARY KEY,
    patient_id  INTEGER NOT NULL REFERENCES patients(id),
    data        DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at  TIMESTAMP DEFAULT NOW(),
    UNIQUE(patient_id, data) 
);