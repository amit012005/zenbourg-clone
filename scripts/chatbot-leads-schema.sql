-- Chatbot Leads Table
CREATE TABLE IF NOT EXISTS chatbot_leads (
    id SERIAL PRIMARY KEY,
    lead_id VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    address TEXT,
    country VARCHAR(100),
    service VARCHAR(255),
    budget VARCHAR(100),
    timeline VARCHAR(100),
    description TEXT,
    action VARCHAR(50) NOT NULL, -- 'book_call', 'request_quote', 'more_info'
    status VARCHAR(50) DEFAULT 'new', -- 'new', 'contacted', 'qualified', 'converted', 'closed'
    source VARCHAR(50) DEFAULT 'chatbot',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_chatbot_leads_email ON chatbot_leads(email);
CREATE INDEX IF NOT EXISTS idx_chatbot_leads_status ON chatbot_leads(status);
CREATE INDEX IF NOT EXISTS idx_chatbot_leads_created_at ON chatbot_leads(created_at);
CREATE INDEX IF NOT EXISTS idx_chatbot_leads_action ON chatbot_leads(action);

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_chatbot_leads_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_chatbot_leads_updated_at
    BEFORE UPDATE ON chatbot_leads
    FOR EACH ROW
    EXECUTE FUNCTION update_chatbot_leads_updated_at();
