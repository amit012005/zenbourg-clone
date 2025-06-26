-- Table for detailed project information (for portfolio page)
CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    domain VARCHAR(100),
    category VARCHAR(100),
    description TEXT,
    image_url VARCHAR(255), -- Path to image in /public
    live_url VARCHAR(255),
    case_study_content TEXT, -- For individual project page /portfolio/[slug]
    completed_date_text VARCHAR(100), -- e.g., "March 2024"
    duration_text VARCHAR(100), -- e.g., "4 months"
    technologies JSONB, -- Array of strings: ["Next.js", "TypeScript"]
    features JSONB, -- Array of strings: ["AI-powered insights", "Real-time collaboration"]
    metrics JSONB, -- Object: {"users": "2,500+", "revenue": "$50K+ MRR"}
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table for project reviews (linked to projects table)
CREATE TABLE IF NOT EXISTS project_reviews (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
    reviewer_name VARCHAR(255),
    reviewer_role VARCHAR(255),
    reviewer_avatar_url VARCHAR(255), -- Path to image in /public
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT,
    review_date_text VARCHAR(100), -- e.g., "March 2024"
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table for generic page content (titles, descriptions, CTAs, etc.)
CREATE TABLE IF NOT EXISTS page_content (
    id SERIAL PRIMARY KEY,
    page_key VARCHAR(255) NOT NULL, -- e.g., 'services_page', 'portfolio_page', 'book_consultation_page'
    element_key VARCHAR(255) NOT NULL, -- e.g., 'main_title', 'main_description', 'cta_section_title'
    content_value TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (page_key, element_key)
);

-- Add some indexes
CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_project_reviews_project_id ON project_reviews(project_id);
CREATE INDEX IF NOT EXISTS idx_page_content_page_key ON page_content(page_key);
