-- Drop existing tables if they exist to ensure a clean slate for V2 schema
DROP TABLE IF EXISTS client_contracts;
DROP TABLE IF EXISTS client_invoices;
DROP TABLE IF EXISTS client_services;

-- Table for services/projects specific to a client
CREATE TABLE client_services (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    service_name VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'Pending', -- e.g., Pending, In Progress, Awaiting Feedback, Completed, On Hold, Cancelled
    progress INTEGER DEFAULT 0, -- Percentage (0-100)
    start_date DATE,
    estimated_completion_date DATE,
    actual_completion_date DATE,
    service_details JSONB, -- For any extra structured data about the service
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table for client invoices
CREATE TABLE client_invoices (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    client_service_id INTEGER REFERENCES client_services(id) ON DELETE SET NULL, -- Optional link to a specific service
    invoice_number VARCHAR(100) UNIQUE NOT NULL,
    issue_date DATE NOT NULL,
    due_date DATE NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    status VARCHAR(50) DEFAULT 'Unpaid', -- e.g., Unpaid, Paid, Overdue, Cancelled
    payment_method VARCHAR(100),
    notes TEXT,
    pdf_url TEXT, -- URL to the generated PDF in Vercel Blob, initially NULL
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table for client contracts or agreements
CREATE TABLE client_contracts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    client_service_id INTEGER REFERENCES client_services(id) ON DELETE SET NULL, -- Optional link to a specific service
    contract_title VARCHAR(255) NOT NULL,
    contract_number VARCHAR(100) UNIQUE,
    effective_date DATE NOT NULL,
    expiry_date DATE,
    status VARCHAR(50) DEFAULT 'Draft', -- e.g., Draft, Sent, Signed, Active, Expired, Terminated
    document_url TEXT, -- URL to the generated PDF in Vercel Blob, initially NULL
    version VARCHAR(20),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_client_services_user_id ON client_services(user_id);
CREATE INDEX idx_client_invoices_user_id ON client_invoices(user_id);
CREATE INDEX idx_client_invoices_status ON client_invoices(status);
CREATE INDEX idx_client_contracts_user_id ON client_contracts(user_id);
CREATE INDEX idx_client_contracts_status ON client_contracts(status);

-- Trigger to update 'updated_at' timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_client_services_updated_at
BEFORE UPDATE ON client_services
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_client_invoices_updated_at
BEFORE UPDATE ON client_invoices
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_client_contracts_updated_at
BEFORE UPDATE ON client_contracts
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
