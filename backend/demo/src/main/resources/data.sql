-- Insert admin user (password: admin123 - BCrypt encoded)
INSERT INTO users (name, email, password, role, created_at)
SELECT 'Admin', 'admin@gmail.com', '$2a$10$U1MWjUGxSKnQHRV.44.OMuApVv7FIcZRLueZXlJXYbWFk7AcC8n3a', 'ADMIN', NOW() WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'admin@gmail.com');

