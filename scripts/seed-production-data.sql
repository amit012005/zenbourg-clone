-- Production seed data
-- Insert services
INSERT INTO services (name, slug, description, price, features, is_popular) VALUES
('Website Development', 'website-development', 'Custom websites built for performance and scalability', 2999.00, '["Responsive Design", "SEO Optimized", "Fast Loading", "Mobile First", "CMS Integration"]', false),
('UI/UX Design', 'ui-ux-design', 'Beautiful, user-friendly interfaces that convert', 1999.00, '["User Research", "Wireframing", "Prototyping", "Design Systems", "Usability Testing"]', true),
('SEO Optimization', 'seo-optimization', 'Boost your search rankings and organic traffic', 1499.00, '["Keyword Research", "On-Page SEO", "Technical SEO", "Content Strategy", "Analytics"]', false),
('Digital Marketing', 'digital-marketing', 'Comprehensive marketing strategies that drive results', 2499.00, '["Social Media", "PPC Campaigns", "Email Marketing", "Content Marketing", "Analytics"]', false),
('AI Tools Integration', 'ai-tools-integration', 'Cutting-edge AI solutions for your business', 4999.00, '["AI Chatbots", "Process Automation", "Data Analysis", "Custom AI Models", "Integration Support"]', true);

-- Insert admin user (password: admin123 - change this!)
INSERT INTO users (email, password_hash, name, role, email_verified) VALUES
('admin@zenbourg.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6uk6L7Q1NO', 'Administrator', 'admin', true);
