create extension if not exists "pgcrypto";

create table if not exists profiles (
  id text primary key,
  name text not null,
  bio text not null,
  image text,
  education text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists services (
  id text primary key,
  title text not null,
  description text not null,
  image text,
  gallery text[],
  sort_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists projects (
  id text primary key,
  title text not null,
  category text not null,
  description text not null,
  images text[] not null default '{}',
  sort_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists skills (
  id text primary key,
  name text not null,
  sort_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists contact (
  id text primary key,
  email text not null,
  phone text not null,
  whatsapp text,
  location text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
