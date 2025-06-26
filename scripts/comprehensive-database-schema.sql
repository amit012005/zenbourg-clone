-- Comprehensive PostgreSQL Database Schema for Zenbourg
-- This schema handles all user interactions and data collection

-- Drop existing tables if they exist (for clean setup)
DROP TABLE IF EXISTS chatbot_leads CASCADE;
DROP TABLE IF EXISTS contact_submissions CASCADE;
DROP TABLE IF EXISTS cookie_consents CASCADE;
DROP TABLE IF EXISTS user_sessions CASCADE;
DROP TABLE IF EXISTS bookings CASCADE;
DROP TABLE IF EXISTS custom_requests CASCADE;
DROP TABLE IF EXISTS newsletter_subscriptions CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Users table (enhanced for comprehensive user management)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    user_uuid UUID DEFAULT gen_random_uuid() UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    phone VARCHAR(50),
    country VARCHAR(100),
    address TEXT,
    role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('user', 'admin', 'moderator')),
    email_verified BOOLEAN DEFAULT FALSE,
    avatar_url TEXT,
    provider VARCHAR(50) DEFAULT 'credentials', -- 'credentials', 'google', 'github'
    provider_id VARCHAR(255),
    last_login TIMESTAMP WITH TIME ZONE,
    login_count INTEGER DEFAULT 0,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Cookie consent tracking
CREATE TABLE cookie_consents (
    id SERIAL PRIMARY KEY,
    consent_uuid UUID DEFAULT gen_random_uuid() UNIQUE NOT NULL,
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    session_id VARCHAR(255),
    ip_address INET,
    user_agent TEXT,
    necessary BOOLEAN DEFAULT TRUE,
    functional BOOLEAN DEFAULT FALSE,
    analytics BOOLEAN DEFAULT FALSE,
    marketing BOOLEAN DEFAULT FALSE,
    preferences JSONB DEFAULT '{}',
    consent_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '1 year')
);

-- Contact form submissions
CREATE TABLE contact_submissions (
    id SERIAL PRIMARY KEY,
    contact_uuid UUID DEFAULT gen_random_uuid() UNIQUE NOT NULL,
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    company VARCHAR(255),
    subject VARCHAR(500),
    message TEXT NOT NULL,
    source VARCHAR(50) DEFAULT 'contact_form', -- 'contact_form', 'footer', 'modal'
    status VARCHAR(20) DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'replied', 'resolved', 'spam')),
    priority VARCHAR(10) DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
    admin_response TEXT,
    admin_user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    responded_at TIMESTAMP WITH TIME ZONE,
    ip_address INET,
    user_agent TEXT,
    referrer TEXT,
    utm_source VARCHAR(100),
    utm_medium VARCHAR(100),
    utm_campaign VARCHAR(100),
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Chatbot interactions and leads
CREATE TABLE chatbot_leads (
    id SERIAL PRIMARY KEY,
    lead_uuid UUID DEFAULT gen_random_uuid() UNIQUE NOT NULL,
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    session_id VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    country VARCHAR(100),
    address TEXT,
    service_interest VARCHAR(255),
    budget_range VARCHAR(100),
    timeline VARCHAR(100),
    project_description TEXT,
    lead_source VARCHAR(50) DEFAULT 'chatbot',
    action_taken VARCHAR(50) CHECK (action_taken IN ('book_call', 'request_quote', 'more_info', 'general_inquiry')),
    lead_score INTEGER DEFAULT 0 CHECK (lead_score >= 0 AND lead_score <= 100),
    status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'proposal_sent', 'negotiating', 'won', 'lost', 'nurturing')),
    assigned_to INTEGER REFERENCES users(id) ON DELETE SET NULL,
    follow_up_date DATE,
    notes TEXT,
    conversion_value DECIMAL(10,2),
    ip_address INET,
    user_agent TEXT,
    referrer TEXT,
    utm_data JSONB DEFAULT '{}',
    conversation_data JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User sessions and activity tracking
CREATE TABLE user_sessions (
    id SERIAL PRIMARY KEY,
    session_uuid UUID DEFAULT gen_random_uuid() UNIQUE NOT NULL,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    session_token VARCHAR(255) UNIQUE NOT NULL,
    ip_address INET,
    user_agent TEXT,
    device_type VARCHAR(50), -- 'desktop', 'mobile', 'tablet'
    browser VARCHAR(100),
    os VARCHAR(100),
    country VARCHAR(100),
    city VARCHAR(100),
    pages_visited JSONB DEFAULT '[]',
    session_duration INTEGER DEFAULT 0, -- in seconds
    is_active BOOLEAN DEFAULT TRUE,
    last_activity TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '30 days')
);

-- Enhanced bookings table
CREATE TABLE bookings (
    id SERIAL PRIMARY KEY,
    booking_uuid UUID DEFAULT gen_random_uuid() UNIQUE NOT NULL,
    booking_id VARCHAR(100) UNIQUE NOT NULL,
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    lead_id INTEGER REFERENCES chatbot_leads(id) ON DELETE SET NULL,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    company VARCHAR(255),
    service VARCHAR(255) NOT NULL,
    service_details TEXT,
    booking_date DATE NOT NULL,
    time_slot VARCHAR(50) NOT NULL,
    timezone VARCHAR(100) DEFAULT 'UTC',
    duration_minutes INTEGER DEFAULT 60,
    meeting_type VARCHAR(20) DEFAULT 'video' CHECK (meeting_type IN ('video', 'phone', 'in_person')),
    meeting_link TEXT,
    status VARCHAR(20) DEFAULT 'confirmed' CHECK (status IN ('pending', 'confirmed', 'rescheduled', 'cancelled', 'completed', 'no_show')),
    notes TEXT,
    admin_notes TEXT,
    reminder_sent BOOLEAN DEFAULT FALSE,
    confirmation_sent BOOLEAN DEFAULT FALSE,
    follow_up_required BOOLEAN DEFAULT TRUE,
    booking_source VARCHAR(50) DEFAULT 'website',
    ip_address INET,
    user_agent TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enhanced custom requests table
CREATE TABLE custom_requests (
    id SERIAL PRIMARY KEY,
    request_uuid UUID DEFAULT gen_random_uuid() UNIQUE NOT NULL,
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    lead_id INTEGER REFERENCES chatbot_leads(id) ON DELETE SET NULL,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    company VARCHAR(255),
    business_type VARCHAR(100),
    project_title VARCHAR(500),
    project_description TEXT NOT NULL,
    requirements TEXT,
    budget_range VARCHAR(100),
    preferred_timeline VARCHAR(100),
    additional_files JSONB DEFAULT '[]',
    priority VARCHAR(10) DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'reviewing', 'quoted', 'approved', 'in_progress', 'completed', 'cancelled', 'on_hold')),
    quoted_price DECIMAL(12,2),
    final_price DECIMAL(12,2),
    admin_notes TEXT,
    client_feedback TEXT,
    assigned_to INTEGER REFERENCES users(id) ON DELETE SET NULL,
    estimated_hours INTEGER,
    actual_hours INTEGER,
    start_date DATE,
    deadline DATE,
    completion_date DATE,
    ip_address INET,
    user_agent TEXT,
    referrer TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Newsletter subscriptions
CREATE TABLE newsletter_subscriptions (
    id SERIAL PRIMARY KEY,
    subscription_uuid UUID DEFAULT gen_random_uuid() UNIQUE NOT NULL,
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    source VARCHAR(50) DEFAULT 'website', -- 'website', 'chatbot', 'social', 'referral'
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed', 'bounced', 'complained')),
    preferences JSONB DEFAULT '{"frequency": "weekly", "topics": ["general"]}',
    double_opt_in BOOLEAN DEFAULT FALSE,
    confirmed_at TIMESTAMP WITH TIME ZONE,
    unsubscribed_at TIMESTAMP WITH TIME ZONE,
    unsubscribe_reason TEXT,
    ip_address INET,
    user_agent TEXT,
    referrer TEXT,
    utm_data JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Activity logs for comprehensive tracking
CREATE TABLE activity_logs (
    id SERIAL PRIMARY KEY,
    log_uuid UUID DEFAULT gen_random_uuid() UNIQUE NOT NULL,
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    session_id VARCHAR(255),
    activity_type VARCHAR(50) NOT NULL, -- 'login', 'logout', 'page_view', 'form_submit', 'download', etc.
    entity_type VARCHAR(50), -- 'user', 'booking', 'contact', 'lead', etc.
    entity_id INTEGER,
    description TEXT,
    ip_address INET,
    user_agent TEXT,
    referrer TEXT,
    page_url TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_uuid ON users(user_uuid);
CREATE INDEX idx_users_status ON users(status);
CREATE INDEX idx_users_created_at ON users(created_at);

CREATE INDEX idx_cookie_consents_user_id ON cookie_consents(user_id);
CREATE INDEX idx_cookie_consents_session_id ON cookie_consents(session_id);
CREATE INDEX idx_cookie_consents_ip_address ON cookie_consents(ip_address);
CREATE INDEX idx_cookie_consents_created_at ON cookie_consents(consent_date);

CREATE INDEX idx_contact_submissions_user_id ON contact_submissions(user_id);
CREATE INDEX idx_contact_submissions_email ON contact_submissions(email);
CREATE INDEX idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX idx_contact_submissions_created_at ON contact_submissions(created_at);

CREATE INDEX idx_chatbot_leads_user_id ON chatbot_leads(user_id);
CREATE INDEX idx_chatbot_leads_email ON chatbot_leads(email);
CREATE INDEX idx_chatbot_leads_status ON chatbot_leads(status);
CREATE INDEX idx_chatbot_leads_session_id ON chatbot_leads(session_id);
CREATE INDEX idx_chatbot_leads_created_at ON chatbot_leads(created_at);

CREATE INDEX idx_user_sessions_user_id ON user_sessions(user_id);
CREATE INDEX idx_user_sessions_token ON user_sessions(session_token);
CREATE INDEX idx_user_sessions_active ON user_sessions(is_active);
CREATE INDEX idx_user_sessions_created_at ON user_sessions(created_at);

CREATE INDEX idx_bookings_user_id ON bookings(user_id);
CREATE INDEX idx_bookings_email ON bookings(email);
CREATE INDEX idx_bookings_date ON bookings(booking_date);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_created_at ON bookings(created_at);

CREATE INDEX idx_custom_requests_user_id ON custom_requests(user_id);
CREATE INDEX idx_custom_requests_email ON custom_requests(email);
CREATE INDEX idx_custom_requests_status ON custom_requests(status);
CREATE INDEX idx_custom_requests_created_at ON custom_requests(created_at);

CREATE INDEX idx_newsletter_email ON newsletter_subscriptions(email);
CREATE INDEX idx_newsletter_status ON newsletter_subscriptions(status);
CREATE INDEX idx_newsletter_created_at ON newsletter_subscriptions(created_at);

CREATE INDEX idx_activity_logs_user_id ON activity_logs(user_id);
CREATE INDEX idx_activity_logs_type ON activity_logs(activity_type);
CREATE INDEX idx_activity_logs_created_at ON activity_logs(created_at);

-- Create triggers for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_cookie_consents_updated_at BEFORE UPDATE ON cookie_consents FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_contact_submissions_updated_at BEFORE UPDATE ON contact_submissions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_chatbot_leads_updated_at BEFORE UPDATE ON chatbot_leads FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_custom_requests_updated_at BEFORE UPDATE ON custom_requests FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_newsletter_updated_at BEFORE UPDATE ON newsletter_subscriptions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert default admin user
INSERT INTO users (name, email, password_hash, role, email_verified, status) 
VALUES (
    'Administrator',
    'admin@zenbourg.com',
    '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAg/9qm', -- password: admin123
    'admin',
    TRUE,
    'active'
) ON CONFLICT (email) DO NOTHING;

-- Create views for analytics
CREATE OR REPLACE VIEW user_analytics AS
SELECT 
    DATE_TRUNC('day', created_at) as date,
    COUNT(*) as new_users,
    COUNT(*) FILTER (WHERE email_verified = TRUE) as verified_users,
    COUNT(*) FILTER (WHERE provider = 'google') as google_signups,
    COUNT(*) FILTER (WHERE provider = 'credentials') as email_signups
FROM users 
GROUP BY DATE_TRUNC('day', created_at)
ORDER BY date DESC;

CREATE OR REPLACE VIEW lead_analytics AS
SELECT 
    DATE_TRUNC('day', created_at) as date,
    COUNT(*) as total_leads,
    COUNT(*) FILTER (WHERE status = 'new') as new_leads,
    COUNT(*) FILTER (WHERE status = 'qualified') as qualified_leads,
    COUNT(*) FILTER (WHERE status = 'won') as won_leads,
    AVG(lead_score) as avg_lead_score
FROM chatbot_leads 
GROUP BY DATE_TRUNC('day', created_at)
ORDER BY date DESC;

CREATE OR REPLACE VIEW contact_analytics AS
SELECT 
    DATE_TRUNC('day', created_at) as date,
    COUNT(*) as total_contacts,
    COUNT(*) FILTER (WHERE status = 'unread') as unread_contacts,
    COUNT(*) FILTER (WHERE status = 'replied') as replied_contacts,
    source,
    COUNT(*) as count_by_source
FROM contact_submissions 
GROUP BY DATE_TRUNC('day', created_at), source
ORDER BY date DESC;

-- Grant permissions (adjust as needed for your setup)
-- GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO your_app_user;
-- GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO your_app_user;
