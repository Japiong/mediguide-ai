-- MediGuide AI Database Schema

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drugs table
CREATE TABLE IF NOT EXISTS drugs (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  category VARCHAR(100),
  description TEXT,
  uses TEXT,
  dosage TEXT,
  side_effects TEXT,
  ingredients TEXT,
  warnings TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Supplements table
CREATE TABLE IF NOT EXISTS supplements (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  benefits TEXT,
  ingredients TEXT,
  warnings TEXT,
  dosage TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Interactions table
CREATE TABLE IF NOT EXISTS interactions (
  id SERIAL PRIMARY KEY,
  drug1_id INTEGER REFERENCES drugs(id) ON DELETE CASCADE,
  drug2_id INTEGER REFERENCES drugs(id) ON DELETE CASCADE,
  severity VARCHAR(20) CHECK (severity IN ('mild', 'moderate', 'severe')),
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(drug1_id, drug2_id)
);

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255),
  age INTEGER,
  allergies TEXT,
  conditions TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for search performance
CREATE INDEX IF NOT EXISTS idx_drugs_name ON drugs USING GIN (to_tsvector('english', name));
CREATE INDEX IF NOT EXISTS idx_drugs_category ON drugs(category);
CREATE INDEX IF NOT EXISTS idx_supplements_name ON supplements USING GIN (to_tsvector('english', name));
CREATE INDEX IF NOT EXISTS idx_interactions_drug1 ON interactions(drug1_id);
CREATE INDEX IF NOT EXISTS idx_interactions_drug2 ON interactions(drug2_id);
