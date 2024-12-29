CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(20),
    password VARCHAR(255) NOT NULL
);

INSERT INTO users (email, phone, password) VALUES ('test@example.com', '1234567890', 'hashed_password');

SELECT * FROM users;

UPDATE users SET phone = '0987654321' WHERE email = 'test@example.com';

DELETE FROM users WHERE email = 'test@example.com';
