-- Blog Database Schema
-- Run this script to create the database and tables

CREATE DATABASE IF NOT EXISTS blog_db;
USE blog_db;

-- Authors table
CREATE TABLE IF NOT EXISTS authors (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  image VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Posts table with foreign key to authors
CREATE TABLE IF NOT EXISTS posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(100) NOT NULL,
  author_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (author_id) REFERENCES authors(id) ON DELETE CASCADE
);

-- Sample data for testing
INSERT INTO authors (name, email, image) VALUES
  ('Juan García', 'juan@example.com', 'https://example.com/avatars/juan.jpg'),
  ('María López', 'maria@example.com', 'https://example.com/avatars/maria.jpg'),
  ('Carlos Rodríguez', 'carlos@example.com', NULL);

INSERT INTO posts (title, description, category, author_id) VALUES
  ('Introducción a Node.js', 'Node.js es un entorno de ejecución para JavaScript...', 'Tecnología', 1),
  ('Diseño de APIs REST', 'Las APIs REST son fundamentales en el desarrollo web moderno...', 'Desarrollo', 1),
  ('MySQL para principiantes', 'MySQL es un sistema de gestión de bases de datos relacional...', 'Bases de datos', 2),
  ('Express.js: Guía completa', 'Express es el framework más popular para Node.js...', 'Desarrollo', 3);
