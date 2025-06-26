-- Add columns for selected service information
ALTER TABLE enterprise_consultations 
ADD COLUMN IF NOT EXISTS selected_service VARCHAR(255),
ADD COLUMN IF NOT EXISTS service_price VARCHAR(50);
