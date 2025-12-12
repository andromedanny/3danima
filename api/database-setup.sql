-- HandTalk Database Setup
-- Run this SQL in phpMyAdmin to create the database and tables

-- Create database (if it doesn't exist)
CREATE DATABASE IF NOT EXISTS `handtalk_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `handtalk_db`;

-- Table for sign language vocabulary
CREATE TABLE IF NOT EXISTS `signs` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `word_phrase` VARCHAR(255) NOT NULL,
  `glb_file_path` VARCHAR(500) NOT NULL,
  `language` ENUM('asl', 'bsl', 'libras') DEFAULT 'asl',
  `category` VARCHAR(100) DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_sign` (`word_phrase`, `language`),
  INDEX `idx_language` (`language`),
  INDEX `idx_word` (`word_phrase`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table for translation history
CREATE TABLE IF NOT EXISTS `translations` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `user_text` TEXT NOT NULL,
  `language` ENUM('asl', 'bsl', 'libras') DEFAULT 'asl',
  `signs_used` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_created` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert sample data
INSERT INTO `signs` (`word_phrase`, `glb_file_path`, `language`, `category`) VALUES
('hello', 'assets/models/asl/hello.glb', 'asl', 'greeting'),
('goodbye', 'assets/models/asl/goodbye.glb', 'asl', 'greeting'),
('yes', 'assets/models/asl/yes.glb', 'asl', 'response'),
('no', 'assets/models/asl/no.glb', 'asl', 'response'),
('thank you', 'assets/models/asl/thank-you.glb', 'asl', 'courtesy'),
('please', 'assets/models/asl/please.glb', 'asl', 'courtesy'),
('sorry', 'assets/models/asl/sorry.glb', 'asl', 'courtesy'),
('help', 'assets/models/asl/help.glb', 'asl', 'action'),
('good morning', 'assets/models/asl/good-morning.glb', 'asl', 'greeting'),
('good afternoon', 'assets/models/asl/good-afternoon.glb', 'asl', 'greeting'),
('good night', 'assets/models/asl/good-night.glb', 'asl', 'greeting'),
('how are you', 'assets/models/asl/how-are-you.glb', 'asl', 'greeting'),
('thank you very much', 'assets/models/asl/thank-you-very-much.glb', 'asl', 'courtesy'),
('good', 'assets/models/asl/good.glb', 'asl', 'adjective'),
('night', 'assets/models/asl/night.glb', 'asl', 'noun'),
('morning', 'assets/models/asl/morning.glb', 'asl', 'noun'),
('afternoon', 'assets/models/asl/afternoon.glb', 'asl', 'noun')
ON DUPLICATE KEY UPDATE `glb_file_path` = VALUES(`glb_file_path`);

