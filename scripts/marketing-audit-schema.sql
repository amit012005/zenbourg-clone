-- Create marketing_audit_requests table
CREATE TABLE IF NOT EXISTS marketing_audit_requests (
    id SERIAL PRIMARY KEY,
    business_name VARCHAR(255) NOT NULL,
    website VARCHAR(500) NOT NULL,
    industry VARCHAR(100) NOT NULL,
    business_size VARCHAR(50) NOT NULL,
    contact_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    current_marketing JSONB,
    monthly_budget VARCHAR(50),
    primary_goals JSONB,
    target_audience TEXT,
    biggest_challenges JSONB,
    current_roi VARCHAR(50),
    competitor_concerns TEXT,
    additional_info TEXT,
    preferred_contact VARCHAR(20),
    urgency VARCHAR(20),
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_marketing_audit_email ON marketing_audit_requests(email);
CREATE INDEX IF NOT EXISTS idx_marketing_audit_created_at ON marketing_audit_requests(created_at);
CREATE INDEX IF NOT EXISTS idx_marketing_audit_status ON marketing_audit_requests(status);
