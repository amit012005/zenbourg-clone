-- Ensure a test user and a test service exist.
-- This assumes a user with id=1 exists from your initial user seeding.
-- If not, you'll need to insert one or adjust user_id.
-- Example: INSERT INTO users (id, name, email, password_hash) VALUES (1, 'Test Client', 'client@example.com', 'hashed_password') ON CONFLICT (id) DO NOTHING;

-- Seed Client Services (assuming user_id=1 exists)
INSERT INTO client_services (user_id, service_name, description, status, progress, start_date, estimated_completion_date, service_details)
VALUES
(1, 'Zenbourg Premium Website Development', 'Full development of a new corporate website with CMS integration.', 'In Progress', 65, '2024-05-01', '2024-08-15', '{"milestones": ["Design Approved", "Frontend Development", "Backend Integration"], "current_milestone": "Backend Integration"}'),
(1, 'Monthly SEO & Content Marketing', 'Ongoing SEO optimization and content creation for blog and social media.', 'Active', 100, '2024-06-01', '2024-06-30', '{"reports_due": "Monthly", "last_report_date": "2024-06-28"}')
ON CONFLICT (id) DO NOTHING;


-- Seed Client Invoices (pdf_url will be NULL initially)
-- Assuming client_service_id=1 exists from the above client_services insert
INSERT INTO client_invoices (user_id, client_service_id, invoice_number, issue_date, due_date, amount, currency, status, notes)
VALUES
(1, 1, 'INV-2024-001', '2024-06-15', '2024-06-30', 2500.00, 'USD', 'Paid', 'Initial deposit for website development.'),
(1, 2, 'INV-2024-002', '2024-07-01', '2024-07-15', 800.00, 'USD', 'Unpaid', 'June SEO & Content Marketing services.')
ON CONFLICT (invoice_number) DO NOTHING;

-- Seed Client Contracts (document_url will be NULL initially)
-- Assuming client_service_id=1 exists
INSERT INTO client_contracts (user_id, client_service_id, contract_title, contract_number, effective_date, expiry_date, status, version, notes)
VALUES
(1, 1, 'Website Development Agreement', 'AGR-2024-WD-001', '2024-04-25', '2024-08-31', 'Active', '1.0', 'Standard terms and conditions for web development project.'),
(1, 2, 'SEO Services Retainer', 'AGR-2024-SEO-001', '2024-06-01', NULL, 'Active', '1.1', 'Monthly retainer for SEO services. Auto-renews unless terminated.')
ON CONFLICT (contract_number) DO NOTHING;
