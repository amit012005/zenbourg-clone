-- Seed data for homepage_features
INSERT INTO homepage_features (icon_name, title, description, display_order) VALUES
('Zap', 'Fast Delivery', 'Quick turnaround times without compromising quality', 1),
('Users', 'Expert Team', 'Experienced professionals in every field', 2),
('Award', 'Premium Quality', 'Top-tier solutions that exceed expectations', 3)
ON CONFLICT (title) DO NOTHING; -- Basic conflict handling, adjust as needed

-- Seed data for homepage_testimonials
INSERT INTO homepage_testimonials (name, company, text, rating, display_order) VALUES
('Sarah Johnson', 'TechStart Inc.', 'Zenbourg transformed our online presence completely. The results exceeded our expectations!', 5, 1),
('Michael Chen', 'Growth Co.', 'Professional service and outstanding results. Highly recommend their digital marketing services.', 5, 2),
('Emily Davis', 'Creative Studio', 'The UI/UX design work was exceptional. Our users love the new interface!', 5, 3)
ON CONFLICT (name, company) DO NOTHING;

-- Seed data for homepage_services
INSERT INTO homepage_services (service_slug, name, price, description, features, is_popular, display_order) VALUES
('website-development', 'Website Development', 2999, 'Custom websites built for performance and scalability', '["Responsive Design", "SEO Optimized", "Fast Loading", "Mobile First", "CMS Integration"]', FALSE, 1),
('ui-ux-design', 'UI/UX Design', 1999, 'Beautiful, user-friendly interfaces that convert', '["User Research", "Wireframing", "Prototyping", "Design Systems", "Usability Testing"]', TRUE, 2),
('seo-optimization', 'SEO Optimization', 1499, 'Boost your search rankings and organic traffic', '["Keyword Research", "On-Page SEO", "Technical SEO", "Content Strategy", "Analytics"]', FALSE, 3),
('digital-marketing', 'Digital Marketing', 2499, 'Comprehensive marketing strategies that drive results', '["Social Media", "PPC Campaigns", "Email Marketing", "Content Marketing", "Analytics"]', FALSE, 4),
('ai-tools-integration', 'AI Tools Integration', 4999, 'Cutting-edge AI solutions for your business', '["AI Chatbots", "Process Automation", "Data Analysis", "Custom AI Models", "Integration Support"]', TRUE, 5),
('business-growth', 'Business Growth', 3999, 'Strategic consulting to scale your business', '["Growth Strategy", "Market Analysis", "Process Optimization", "Team Training", "KPI Tracking"]', FALSE, 6)
ON CONFLICT (service_slug) DO NOTHING;

-- Seed data for homepage_projects
INSERT INTO homepage_projects (project_slug, name, domain, image_path, description, live_url, metrics, display_order) VALUES
('techflow-saas', 'TechFlow SaaS Platform', 'Technology', '/projects/techflow-homepage.png', 'AI-powered project management with 2,500+ users', 'https://techflow-demo.vercel.app', '300% user engagement increase', 1),
('medicare-plus', 'MediCare Plus', 'Healthcare', '/projects/medicare-homepage.png', 'HIPAA-compliant telemedicine platform', 'https://medicare-plus-demo.vercel.app', '15K+ consultations completed', 2),
('edulearn-academy', 'EduLearn Academy', 'Education', '/projects/edulearn-homepage.png', 'Interactive e-learning with AI personalization', 'https://edulearn-academy-demo.vercel.app', '10K+ students, 85% completion rate', 3),
('financeflow-pro', 'FinanceFlow Pro', 'Finance', '/projects/financeflow-homepage.png', 'Advanced financial management platform', 'https://financeflow-pro-demo.vercel.app', '$50M+ transactions processed', 4),
('retailmax-commerce', 'RetailMax Commerce', 'E-commerce', '/projects/retailmax-homepage.png', 'Multi-vendor marketplace with AI recommendations', 'https://retailmax-commerce-demo.vercel.app', '$2M+ monthly revenue', 5),
('propertypro-real-estate', 'PropertyPro Real Estate', 'Real Estate', '/projects/propertypro-homepage.png', 'Virtual tours and automated property valuation', 'https://propertypro-demo.vercel.app', '25K+ properties, 100K+ virtual tours', 6)
ON CONFLICT (project_slug) DO NOTHING;
