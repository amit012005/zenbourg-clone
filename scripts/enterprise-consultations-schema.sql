CREATE TABLE IF NOT EXISTS enterprise_consultations (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    position_title VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone_number VARCHAR(50) NOT NULL,
    company_name VARCHAR(255) NOT NULL,
    company_size VARCHAR(50) NOT NULL,
    budget_range VARCHAR(100),
    project_timeline VARCHAR(100),
    detailed_requirements TEXT NOT NULL,
    current_challenges TEXT,
    business_goals TEXT,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
