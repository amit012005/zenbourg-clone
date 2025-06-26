-- Table for "Why Choose Zenbourg?" features
CREATE TABLE IF NOT EXISTS homepage_features (
    id SERIAL PRIMARY KEY,
    icon_name VARCHAR(50) NOT NULL, -- e.g., "Zap", "Users", "Award" to map to Lucide icons
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    display_order INT DEFAULT 0
);

-- Table for "What Our Clients Say" testimonials
CREATE TABLE IF NOT EXISTS homepage_testimonials (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    company VARCHAR(255),
    text TEXT NOT NULL,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    display_order INT DEFAULT 0
    -- avatar_url VARCHAR(255) -- Optional: if you want to add avatars later
);

-- Table for "Our Services" section on the homepage
-- This can be a curated list, potentially linking to a more detailed services table
CREATE TABLE IF NOT EXISTS homepage_services (
    id SERIAL PRIMARY KEY,
    service_slug VARCHAR(100) UNIQUE NOT NULL, -- e.g., "website-development"
    name VARCHAR(255) NOT NULL,
    price NUMERIC(10, 2),
    description TEXT,
    features JSONB, -- Store features list as a JSON array of strings
    is_popular BOOLEAN DEFAULT FALSE,
    display_order INT DEFAULT 0
);

-- Table for "Our Recent Work" section on the homepage
-- This can be a curated list, potentially linking to a more detailed projects table
CREATE TABLE IF NOT EXISTS homepage_projects (
    id SERIAL PRIMARY KEY,
    project_slug VARCHAR(100) UNIQUE NOT NULL, -- e.g., "techflow-saas"
    name VARCHAR(255) NOT NULL,
    domain VARCHAR(100),
    image_path VARCHAR(255) NOT NULL, -- Path to image in /public folder
    description TEXT,
    live_url VARCHAR(255),
    metrics VARCHAR(255),
    display_order INT DEFAULT 0
);

-- Add indexes for ordering
CREATE INDEX IF NOT EXISTS idx_homepage_features_display_order ON homepage_features(display_order);
CREATE INDEX IF NOT EXISTS idx_homepage_testimonials_display_order ON homepage_testimonials(display_order);
CREATE INDEX IF NOT EXISTS idx_homepage_services_display_order ON homepage_services(display_order);
CREATE INDEX IF NOT EXISTS idx_homepage_projects_display_order ON homepage_projects(display_order);
