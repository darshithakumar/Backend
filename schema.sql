CREATE DATABASE courseai;
USE courseai;

CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(80) NOT NULL,
  email VARCHAR(120) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE courses (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(150) NOT NULL,
  description TEXT,
  url VARCHAR(255),
  domain VARCHAR(50),
  tags VARCHAR(200)
);

CREATE TABLE browsing_logs (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  url VARCHAR(255),
  keyword VARCHAR(120),
  count INT DEFAULT 1,
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- add your sample courses here (recommended)
