-- Add IP address column to submissions table
ALTER TABLE submissions ADD COLUMN IF NOT EXISTS ip_address INET;