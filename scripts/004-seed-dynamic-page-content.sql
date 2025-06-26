-- Seed data for page_content
INSERT INTO page_content (page_key, element_key, content_value) VALUES
('services_page', 'main_title', 'Our Services'),
('services_page', 'main_description', 'Choose from our comprehensive range of professional services designed to help your business grow and succeed.'),
('services_page', 'custom_section_title', 'Need Something Custom?'),
('services_page', 'custom_section_description', 'Have a unique project in mind? We specialize in custom solutions tailored to your specific needs. Let''s discuss your requirements and create something amazing together.'),
('services_page', 'custom_section_button_text', 'Request Custom Quote'),

('portfolio_page', 'main_title', 'Our Project Portfolio'),
('portfolio_page', 'main_description', 'Explore our successful projects across various industries. Each project showcases our expertise in delivering cutting-edge solutions that drive real business results.'),
('portfolio_page', 'cta_section_title', 'Ready to Start Your Project?'),
('portfolio_page', 'cta_section_description', 'Let''s discuss how we can bring your vision to life with our proven expertise.'),
('portfolio_page', 'cta_button1_text', 'Book Free Consultation'),
('portfolio_page', 'cta_button2_text', 'Get Custom Quote'),

('book_consultation_page', 'main_title', 'Book Your Free Consultation'),
('book_consultation_page', 'main_description', 'Schedule a personalized consultation with our experts to discuss your project requirements and goals.'),
('book_consultation_page', 'sidebar_timezone_title', 'Your Timezone'),
('book_consultation_page', 'sidebar_timezone_note', 'All times are shown in your local timezone'),
('book_consultation_page', 'sidebar_availability_title', 'Availability'),
('book_consultation_page', 'sidebar_availability_line1', 'Monday - Friday'),
('book_consultation_page', 'sidebar_availability_line2', '9:00 AM - 5:00 PM'),
('book_consultation_page', 'sidebar_availability_line3', '30-minute sessions'),
('book_consultation_page', 'sidebar_expect_title', 'What to Expect'),
('book_consultation_page', 'sidebar_expect_item1', 'Project requirements discussion'),
('book_consultation_page', 'sidebar_expect_item2', 'Timeline and budget planning'),
('book_consultation_page', 'sidebar_expect_item3', 'Technology recommendations'),
('book_consultation_page', 'sidebar_expect_item4', 'Next steps outline'),
('book_consultation_page', 'sidebar_expect_item5', 'Q&A session'),

('checkout_page', 'main_title', 'Complete Your Secure Payment'),
('checkout_page', 'main_description', 'Review your service details and complete the payment to get started.'),

('signin_page', 'main_title', 'Sign In'),
('signin_page', 'main_description', 'Enter your credentials to access your account'),
('signin_page', 'demo_credentials_title', 'Demo Credentials:'),
('signin_page', 'demo_email_text', 'Email: admin@zenbourg.com'),
('signin_page', 'demo_password_text', 'Password: password123')
ON CONFLICT (page_key, element_key) DO UPDATE SET content_value = EXCLUDED.content_value;

-- Seed data for projects
INSERT INTO projects (
    slug, title, domain, category, description, image_url, live_url, case_study_content,
    completed_date_text, duration_text, technologies, features, metrics, is_published, tags
) VALUES (
    'techflow-saas-platform',
    'TechFlow SaaS Platform',
    'Technology',
    'SaaS Development',
    'A comprehensive project management platform with AI-powered analytics and team collaboration tools.',
    '/projects/techflow-homepage.png',
    'https://techflow-demo.vercel.app',
    'Detailed case study content for TechFlow...',
    'March 2024',
    '4 months',
    '{"Next.js", "TypeScript", "PostgreSQL", "Stripe", "OpenAI"}',
    '{"AI-powered project insights", "Real-time collaboration", "Advanced analytics dashboard", "Payment processing", "Multi-tenant architecture"}',
    '{"users": "2,500+", "revenue": "$50K+ MRR", "performance": "99.9% uptime"}',
    TRUE,
    '{"SaaS", "AI", "Project Management"}'
),
(
    'medicare-plus',
    'MediCare Plus',
    'Healthcare',
    'Healthcare Platform',
    'HIPAA-compliant telemedicine platform with appointment scheduling, video consultations, and patient management.',
    '/projects/medicare-homepage.png',
    'https://medicare-plus-demo.vercel.app',
    'Detailed case study content for MediCare Plus...',
    'February 2024',
    '6 months',
    '{"React", "Node.js", "MongoDB", "WebRTC", "AWS"}',
    '{"HIPAA-compliant infrastructure", "HD video consultations", "Electronic health records", "Prescription management", "Insurance integration"}',
    '{"users": "5,000+", "consultations": "15K+ completed", "satisfaction": "4.9/5 rating"}',
    TRUE,
    '{"Healthcare", "Telemedicine", "HIPAA"}'
),
(
    'edulearn-academy',
    'EduLearn Academy',
    'Education',
    'E-Learning Platform',
    'Interactive online learning platform with live classes, progress tracking, and AI-powered personalized learning paths.',
    '/projects/edulearn-homepage.png',
    'https://edulearn-academy-demo.vercel.app',
    'Detailed case study content for EduLearn Academy...',
    'January 2024',
    '5 months',
    '{"Vue.js", "Laravel", "MySQL", "WebRTC", "TensorFlow"}',
    '{"Live interactive classes", "AI-powered learning paths", "Progress analytics", "Gamification system", "Mobile-responsive design"}',
    '{"students": "10K+", "courses": "500+", "completion": "85% rate"}',
    TRUE,
    '{"E-Learning", "AI", "Education"}'
),
(
    'financeflow-pro',
    'FinanceFlow Pro',
    'Finance',
    'Fintech Application',
    'Advanced financial management platform with real-time analytics, automated reporting, and investment tracking.',
    '/projects/financeflow-homepage.png',
    'https://financeflow-pro-demo.vercel.app',
    'Detailed case study content for FinanceFlow Pro...',
    'December 2023',
    '7 months',
    '{"Angular", "Python", "PostgreSQL", "Redis", "Plaid API"}',
    '{"Real-time financial analytics", "Automated report generation", "Investment portfolio tracking", "Bank account integration", "Advanced security protocols"}',
    '{"users": "3,500+", "transactions": "$50M+ processed", "accuracy": "99.8% reporting"}',
    TRUE,
    '{"Fintech", "Analytics", "Finance"}'
),
(
    'retailmax-commerce',
    'RetailMax Commerce',
    'E-commerce',
    'E-commerce Platform',
    'Multi-vendor e-commerce platform with advanced inventory management, AI recommendations, and omnichannel support.',
    '/projects/retailmax-homepage.png',
    'https://retailmax-commerce-demo.vercel.app',
    'Detailed case study content for RetailMax Commerce...',
    'November 2023',
    '8 months',
    '{"Shopify Plus", "React", "GraphQL", "Elasticsearch", "AWS"}',
    '{"Multi-vendor marketplace", "AI-powered recommendations", "Advanced inventory management", "Omnichannel integration", "Real-time analytics"}',
    '{"vendors": "500+", "revenue": "$2M+ monthly", "conversion": "12.5% rate"}',
    TRUE,
    '{"E-commerce", "Marketplace", "Retail"}'
),
(
    'propertypro-real-estate',
    'PropertyPro Real Estate',
    'Real Estate',
    'Property Management',
    'Comprehensive real estate platform with virtual tours, CRM integration, and automated property valuation.',
    '/projects/propertypro-homepage.png',
    'https://propertypro-demo.vercel.app',
    'Detailed case study content for PropertyPro...',
    'October 2023',
    '6 months',
    '{"Next.js", "Prisma", "PostgreSQL", "Mapbox", "Three.js"}',
    '{"360° virtual property tours", "Automated property valuation", "CRM integration", "Advanced search filters", "Mobile-first design"}',
    '{"properties": "25K+", "agents": "1,200+", "tours": "100K+ virtual"}',
    TRUE,
    '{"Real Estate", "Proptech", "Virtual Tours"}'
)
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    domain = EXCLUDED.domain,
    category = EXCLUDED.category,
    description = EXCLUDED.description,
    image_url = EXCLUDED.image_url,
    live_url = EXCLUDED.live_url,
    case_study_content = EXCLUDED.case_study_content,
    completed_date_text = EXCLUDED.completed_date_text,
    duration_text = EXCLUDED.duration_text,
    technologies = EXCLUDED.technologies,
    features = EXCLUDED.features,
    metrics = EXCLUDED.metrics,
    is_published = EXCLUDED.is_published,
    tags = EXCLUDED.tags,
    updated_at = CURRENT_TIMESTAMP;

-- Seed data for project_reviews
INSERT INTO project_reviews (project_id, reviewer_name, reviewer_role, reviewer_avatar_url, rating, review_text, review_date_text)
SELECT id, 'Sarah Chen', 'CTO at TechFlow', '/avatars/sarah-chen.png', 5, 'Zenbourg delivered an exceptional SaaS platform that exceeded our expectations. The AI integration is seamless and our user engagement increased by 300%.', 'March 2024'
FROM projects WHERE slug = 'techflow-saas-platform'
ON CONFLICT DO NOTHING;

INSERT INTO project_reviews (project_id, reviewer_name, reviewer_role, reviewer_avatar_url, rating, review_text, review_date_text)
SELECT id, 'Michael Rodriguez', 'Product Manager', '/avatars/michael-rodriguez.png', 5, 'The attention to detail and technical expertise shown by the Zenbourg team was outstanding. Our platform now handles 10x more users efficiently.', 'April 2024'
FROM projects WHERE slug = 'techflow-saas-platform'
ON CONFLICT DO NOTHING;

INSERT INTO project_reviews (project_id, reviewer_name, reviewer_role, reviewer_avatar_url, rating, review_text, review_date_text)
SELECT id, 'Dr. Emily Watson', 'Chief Medical Officer', '/avatars/emily-watson.png', 5, 'This platform revolutionized our practice. Patient satisfaction increased dramatically, and we can now serve 3x more patients efficiently.', 'February 2024'
FROM projects WHERE slug = 'medicare-plus'
ON CONFLICT DO NOTHING;

INSERT INTO project_reviews (project_id, reviewer_name, reviewer_role, reviewer_avatar_url, rating, review_text, review_date_text)
SELECT id, 'James Thompson', 'Healthcare Administrator', '/avatars/james-thompson.png', 5, 'The HIPAA compliance and security features are top-notch. Our staff loves the intuitive interface and robust functionality.', 'March 2024'
FROM projects WHERE slug = 'medicare-plus'
ON CONFLICT DO NOTHING;