create table patients (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name            TEXT NOT NULL,
  cpf             TEXT NOT NULL UNIQUE,
  birth_date      DATE NOT NULL,
  phone           TEXT,
  email           TEXT UNIQUE,
  status          TEXT NOT NULL DEFAULT 'pre_registered', 
  priority        TEXT NOT NULL DEFAULT 'normal',         
  diagnosis       TEXT,
  pain_level_initial INTEGER CHECK (pain_level_initial BETWEEN 1 AND 10),
  main_complaint  TEXT,
  evaluation_date DATE,
  created_at      TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
create table patient_accounts (
  id uuid primary key default gen_random_uuid(),

  patient_id uuid references patients(id) on delete cascade,
  auth_user_id uuid references auth.users(id) on delete cascade,

  created_at timestamp with time zone default now(),

  unique (patient_id),
  unique (auth_user_id)
);

create table medical_records (
  id uuid primary key default gen_random_uuid(),

  patient_id uuid not null references patients(id) on delete cascade,

  record_date date not null,

  main_complaint text,
  pain_level integer check (pain_level between 1 and 10),
  injury_history text,
  diagnosis text,
  notes text,

  created_at timestamp with time zone default now()
);

create table appointments (
  id uuid primary key default gen_random_uuid(),

  patient_id uuid not null references patients(id) on delete cascade,

  appointment_date timestamp with time zone not null,

  status text not null default 'scheduled',

  notes text,

  created_at timestamp with time zone default now()
);

create table exercises (
  id uuid primary key default gen_random_uuid(),

  title text not null,
  description text,
  image_url text,

  created_at timestamp with time zone default now()
);

create table plans (
  id uuid primary key default gen_random_uuid(),

  title text not null,
  description text, 

  created_at timestamp with time zone default now()
);

create table plan_exercises (
  id uuid primary key default gen_random_uuid(),

  plan_id uuid references plans(id) on delete cascade,
  exercise_id uuid references exercises(id) on delete cascade,

  frequency text, 

  created_at timestamp with time zone default now()
);

create table checkins (
  id uuid primary key default gen_random_uuid(),

  patient_id uuid not null references patients(id) on delete cascade,

  pain_level integer not null check (pain_level between 1 and 10),
  notes text,

  created_at timestamp with time zone default now()
);

create table exercise_progress (
  id uuid primary key default gen_random_uuid(),

  patient_id uuid not null references patients(id) on delete cascade,
  exercise_id uuid not null references exercises(id) on delete cascade,

  completed boolean default false,

  date date not null default current_date,

  created_at timestamp with time zone default now()
);

create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,

  role text not null default 'patient', -- 'admin' ou 'patient'

  created_at timestamp with time zone default now()
);

