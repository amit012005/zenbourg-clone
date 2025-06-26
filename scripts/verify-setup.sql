-- Verification script to check database setup
-- Run this after setting up the database

-- Check if all tables exist
SELECT 
    table_name,
    table_type
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- Check if all indexes exist
SELECT 
    indexname,
    tablename
FROM pg_indexes 
WHERE schemaname = 'public'
ORDER BY tablename, indexname;

-- Check if triggers exist
SELECT 
    trigger_name,
    event_object_table,
    action_timing,
    event_manipulation
FROM information_schema.triggers
WHERE trigger_schema = 'public'
ORDER BY event_object_table;

-- Check sample data
SELECT 'users' as table_name, count(*) as row_count FROM users
UNION ALL
SELECT 'services', count(*) FROM services
UNION ALL
SELECT 'bookings', count(*) FROM bookings
UNION ALL
SELECT 'payments', count(*) FROM payments
UNION ALL
SELECT 'contacts', count(*) FROM contacts
UNION ALL
SELECT 'custom_requests', count(*) FROM custom_requests;

-- Test database functions
SELECT NOW() as current_time;
SELECT uuid_generate_v4() as sample_uuid;
