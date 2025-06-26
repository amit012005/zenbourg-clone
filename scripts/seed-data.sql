-- Seed data for Zenbourg SaaS platform

-- Insert services
INSERT INTO services (name, slug, description, price, features, is_active) VALUES
('Website Development', 'website-development', 'Custom websites built for performance and scalability', 2999.00, '["Responsive Design", "SEO Optimized", "Fast Loading", "Mobile First", "CMS Integration"]', true),
('UI/UX Design', 'ui-ux-design', 'Beautiful, user-friendly interfaces that convert', 1999.00, '["User Research", "Wireframing", "Prototyping", "Design Systems", "Usability Testing"]', true),
('SEO Optimization', 'seo-optimization', 'Boost your search rankings and organic traffic', 1499.00, '["Keyword Research", "On-Page SEO", "Technical SEO", "Content Strategy", "Analytics"]', true),
('Digital Marketing', 'digital-marketing', 'Comprehensive marketing strategies that drive results', 2499.00, '["Social Media", "PPC Campaigns", "Email Marketing", "Content Marketing", "Analytics"]', true),
('Social Media Marketing', 'social-media-marketing', 'Engage your audience across all social platforms', 1799.00, '["Content Creation", "Community Management", "Paid Advertising", "Influencer Outreach", "Analytics"]', true),
('Business Growth', 'business-growth', 'Strategic consulting to scale your business', 3999.00, '["Growth Strategy", "Market Analysis", "Process Optimization", "Team Training", "KPI Tracking"]', true),
('Shopify Development', 'shopify-development', 'Professional e-commerce stores that sell', 1999.00, '["Custom Themes", "App Integration", "Payment Setup", "Inventory Management", "SEO Setup"]', true),
('AI Tools Integration', 'ai-tools-integration', 'Cutting-edge AI solutions for your business', 4999.00, '["AI Chatbots", "Process Automation", "Data Analysis", "Custom AI Models", "Integration Support"]', true),
('Lead Generation', 'lead-generation', 'Generate high-quality leads for your business', 2299.00, '["Lead Magnets", "Landing Pages", "Email Sequences", "CRM Setup", "Lead Scoring"]', true),
('Cloud Services', 'cloud-services', 'Scalable cloud infrastructure and migration', 3499.00, '["Cloud Migration", "Infrastructure Setup", "Security Configuration", "Monitoring", "24/7 Support"]', true),
('Data Analytics', 'data-analytics', 'Turn your data into actionable insights', 3799.00, '["Data Visualization", "Custom Dashboards", "Reporting Automation", "Predictive Analytics", "Training"]', true);

-- Insert sample users (passwords are hashed version of 'password123')
INSERT INTO users (email, password_hash, name, role) VALUES
('admin@zenbourg.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6uk6L7Q1NO', 'Admin User', 'admin'),
('user@example.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6uk6L7Q1NO', 'Test User', 'user'),
('john.doe@example.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6uk6L7Q1NO', 'John Doe', 'user');

-- Insert two demo users with plaintext passwords.
-- In production, replace with bcrypt-hashed passwords.
INSERT INTO users (name, email, password, role)
VALUES
  ('Administrator', 'admin@zenbourg.com', 'password123', 'admin'),
  ('Demo User', 'user@example.com', 'password123', 'user')
ON CONFLICT (email) DO NOTHING;  -- Prevent duplicates on re-runs

-- Insert sample bookings
INSERT INTO bookings (booking_id, user_id, full_name, email, phone, service, booking_date, time_slot, timezone, notes, status) VALUES
('ZB-1234567890-abc123', 2, 'John Doe', 'john.doe@example.com', '+1-555-0123', 'Website Development', '2024-01-15', '10:00 AM', 'America/New_York', 'Looking to build an e-commerce website', 'confirmed'),
('ZB-1234567891-def456', 3, 'Jane Smith', 'jane.smith@example.com', '+1-555-0124', 'UI/UX Design', '2024-01-16', '2:00 PM', 'America/Los_Angeles', 'Need to redesign our mobile app', 'confirmed');

-- Insert sample custom requests
INSERT INTO custom_requests (user_id, full_name, email, phone, business_name, project_description, budget_range, preferred_timeline, status) VALUES
(2, 'John Doe', 'john.doe@example.com', '+1-555-0123', 'Doe Enterprises', 'Need a custom CRM system with advanced reporting capabilities', '$10,000 - $25,000', '3-4 months', 'pending'),
(3, 'Jane Smith', 'jane.smith@example.com', '+1-555-0124', 'Smith Solutions', 'Looking for AI-powered customer service chatbot integration', '$5,000 - $10,000', '2-3 months', 'quoted');

-- Insert sample contacts
INSERT INTO contacts (full_name, email, subject, message, status) VALUES
('Mike Johnson', 'mike@example.com', 'Partnership Inquiry', 'Interested in discussing potential partnership opportunities', 'unread'),
('Sarah Wilson', 'sarah@example.com', 'Technical Support', 'Having issues with the booking system', 'read');

-- Insert sample newsletter subscriptions
INSERT INTO newsletter_subscriptions (email, status) VALUES
('subscriber1@example.com', 'active'),
('subscriber2@example.com', 'active'),
('unsubscribed@example.com', 'inactive');
