CREATE DATABASE IF NOT EXISTS FishFeedingDB;
USE FishFeedingDB;

-- Crear la tabla de usuarios
CREATE TABLE IF NOT EXISTS Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- Crear la tabla de horarios
CREATE TABLE IF NOT EXISTS Schedules (
    id INT AUTO_INCREMENT PRIMARY KEY,
    time TIME NOT NULL
);