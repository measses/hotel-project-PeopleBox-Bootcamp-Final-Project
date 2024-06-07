-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Anamakine: 127.0.0.1
-- Üretim Zamanı: 07 Haz 2024, 21:11:51
-- Sunucu sürümü: 10.4.32-MariaDB
-- PHP Sürümü: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Veritabanı: `hotel`
--

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `expenses`
--

CREATE TABLE `expenses` (
  `id` int(11) NOT NULL,
  `description` varchar(255) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `date` date NOT NULL,
  `category` enum('salary','maintenance','utilities','supplies','other') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `expenses`
--

INSERT INTO `expenses` (`id`, `description`, `amount`, `date`, `category`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Ofis malzemeleri alındı 2', 150.00, '2024-06-04', 'supplies', '2024-06-04 19:32:59', '2024-06-04 19:42:52', '2024-06-04 19:42:52'),
(2, 'Kırtasiye malzemeleri alındı', 300.00, '2024-06-04', 'supplies', '2024-06-04 19:43:17', '2024-06-04 19:43:17', NULL),
(3, 'Praesentium ut est h', 29.00, '2024-06-04', 'salary', '2024-06-05 12:58:23', '2024-06-05 12:58:23', NULL),
(4, 'Debitis Nam qui aute', 500.00, '2024-04-30', 'utilities', '2024-06-05 12:58:38', '2024-06-05 12:58:38', NULL);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `reservations`
--

CREATE TABLE `reservations` (
  `id` int(11) NOT NULL,
  `room_id` int(11) NOT NULL,
  `guest_name` varchar(100) NOT NULL,
  `checkin_date` date NOT NULL,
  `checkout_date` date NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL,
  `status` enum('confirmed','pending','cancelled') DEFAULT 'pending',
  `total_price` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `reservations`
--

INSERT INTO `reservations` (`id`, `room_id`, `guest_name`, `checkin_date`, `checkout_date`, `created_at`, `updated_at`, `deleted_at`, `status`, `total_price`) VALUES
(2, 1, 'sss', '2024-06-04', '2024-06-05', '2024-06-04 19:05:52', '2024-06-04 23:09:53', '2024-06-04 23:09:53', 'confirmed', 0),
(3, 3, 'Mert 2 Araz 2', '2024-06-05', '2024-06-08', '2024-06-04 22:56:40', '2024-06-04 23:09:54', '2024-06-04 23:09:54', 'confirmed', 0),
(4, 3, 'mami', '2024-06-05', '2024-06-06', '2024-06-04 23:04:47', '2024-06-04 23:09:55', '2024-06-04 23:09:55', 'confirmed', 0),
(5, 3, 'Mert', '2024-06-05', '2024-06-08', '2024-06-04 23:10:17', '2024-06-05 15:31:23', '2024-06-05 15:31:23', 'confirmed', 0),
(6, 2, 'deneme', '2024-06-05', '2024-06-08', '2024-06-04 23:18:25', '2024-06-05 15:54:04', '2024-06-05 15:54:04', 'confirmed', 0),
(7, 1, 'Melisa', '2024-05-14', '2024-05-17', '2024-06-05 14:44:33', '2024-06-05 15:54:05', '2024-06-05 15:54:05', 'confirmed', 0),
(8, 4, 'Mert', '2024-06-01', '2024-06-04', '2024-06-05 14:50:58', '2024-06-05 15:31:20', '2024-06-05 15:31:20', 'confirmed', 0),
(9, 5, 'ddd', '2024-06-05', '2024-06-07', '2024-06-05 15:21:38', '2024-06-05 15:31:21', '2024-06-05 15:31:21', 'confirmed', 0),
(10, 6, 'Mert Test', '2024-06-05', '2024-06-07', '2024-06-05 15:32:05', '2024-06-05 15:52:19', '2024-06-05 15:52:19', 'confirmed', 0),
(11, 7, 'Mert Deneme', '2024-06-05', '2024-06-06', '2024-06-05 15:36:17', '2024-06-05 15:43:36', '2024-06-05 15:43:36', 'confirmed', 0),
(12, 7, 'mertaraz1', '2024-06-05', '2024-06-06', '2024-06-05 15:37:10', '2024-06-05 15:42:56', '2024-06-05 15:42:56', 'confirmed', 0),
(13, 7, 'sss', '2024-06-05', '2024-06-06', '2024-06-05 15:43:06', '2024-06-05 15:43:28', '2024-06-05 15:43:28', 'confirmed', 0),
(14, 6, 'qweqwe', '2024-06-04', '2024-06-06', '2024-06-05 15:44:21', '2024-06-05 15:52:17', '2024-06-05 15:52:17', 'confirmed', 0),
(15, 6, 'ytyt', '2024-06-03', '2024-06-06', '2024-06-05 15:44:49', '2024-06-05 15:52:21', '2024-06-05 15:52:21', 'confirmed', 0),
(16, 8, 'ytu', '2024-06-05', '2024-06-06', '2024-06-05 15:55:28', '2024-06-05 15:59:17', '2024-06-05 15:59:17', 'confirmed', 0),
(17, 8, 'wwww', '2024-06-05', '2024-06-07', '2024-06-05 17:09:48', '2024-06-05 17:17:37', '2024-06-05 17:17:37', 'confirmed', 0),
(18, 8, 'ssss', '2024-06-05', '2024-06-06', '2024-06-05 17:10:05', '2024-06-05 17:13:12', '2024-06-05 17:13:12', 'confirmed', 0),
(19, 8, 'asdasd', '2024-06-05', '2024-06-06', '2024-06-05 17:10:21', '2024-06-05 17:13:14', '2024-06-05 17:13:14', 'confirmed', 0),
(20, 9, 'merto', '2024-06-05', '2024-06-07', '2024-06-05 17:17:52', '2024-06-05 17:18:45', '2024-06-05 17:18:45', 'confirmed', 0),
(21, 9, 'asdasdsa', '2024-06-08', '2024-06-16', '2024-06-05 17:19:41', '2024-06-05 17:25:36', '2024-06-05 17:25:36', 'confirmed', 0),
(22, 10, 'Test ', '2024-06-05', '2024-06-06', '2024-06-05 17:34:41', '2024-06-07 13:01:30', '2024-06-07 13:01:30', 'cancelled', 0),
(23, 11, 'Test ', '2024-06-05', '2024-06-06', '2024-06-05 17:38:21', '2024-06-05 18:05:36', '2024-06-05 18:05:36', 'cancelled', 0),
(24, 13, 'Test ', '2024-06-05', '2024-06-06', '2024-06-05 18:05:05', '2024-06-05 18:05:13', '2024-06-05 18:05:13', 'cancelled', 0),
(25, 11, 'Test ', '2024-06-05', '2024-06-06', '2024-06-05 18:05:45', '2024-06-05 18:05:50', '2024-06-05 18:05:50', 'cancelled', 0),
(26, 11, 'Test ', '2024-06-05', '2024-06-06', '2024-06-05 18:05:59', '2024-06-07 11:35:11', '2024-06-07 11:35:11', 'cancelled', 0),
(27, 14, 'test', '2024-06-06', '2024-06-10', '2024-06-06 18:45:21', '2024-06-07 11:39:19', '2024-06-07 11:39:19', 'cancelled', 0),
(28, 12, 'mamito', '2024-06-07', '2024-06-13', '2024-06-07 11:35:31', '2024-06-07 11:36:37', '2024-06-07 11:36:37', 'cancelled', 0),
(29, 16, 'mert araz', '2024-06-07', '2024-06-08', '2024-06-07 11:39:37', '2024-06-07 11:45:32', '2024-06-07 11:45:32', 'cancelled', 0),
(30, 17, 'mert araz', '2024-06-07', '2024-06-08', '2024-06-07 11:45:44', '2024-06-07 12:06:59', '2024-06-07 12:06:59', 'cancelled', 0),
(31, 17, 'mert araz', '2024-06-09', '2024-06-10', '2024-06-07 12:06:31', '2024-06-07 12:07:00', '2024-06-07 12:07:00', 'cancelled', 0),
(32, 18, 'mert araz', '2024-06-07', '2024-06-09', '2024-06-07 12:07:28', '2024-06-07 12:10:18', '2024-06-07 12:10:18', 'cancelled', 0),
(33, 19, 'mert araz', '2024-06-07', '2024-06-08', '2024-06-07 12:10:42', '2024-06-07 12:12:54', '2024-06-07 12:12:54', 'cancelled', 0),
(34, 20, 'Regan Cooley', '2024-06-07', '2024-06-09', '2024-06-07 12:13:11', '2024-06-07 12:29:49', '2024-06-07 12:29:49', 'cancelled', 0),
(35, 20, 'mert araz', '2024-06-10', '2024-06-11', '2024-06-07 12:13:37', '2024-06-07 12:29:50', '2024-06-07 12:29:50', 'cancelled', 0),
(36, 21, 'mert araz', '2024-06-13', '2024-06-14', '2024-06-07 12:15:48', '2024-06-07 12:29:51', '2024-06-07 12:29:51', 'cancelled', 0),
(37, 22, 'mert araz', '2024-06-07', '2024-06-06', '2024-06-07 12:16:25', '2024-06-07 12:19:45', '2024-06-07 12:19:45', 'cancelled', 0),
(38, 22, 'mert araz', '2024-06-12', '2024-06-14', '2024-06-07 12:20:20', '2024-06-07 12:29:52', '2024-06-07 12:29:52', 'cancelled', 0),
(39, 22, 'Vanna Daugherty', '2024-06-19', '2024-06-20', '2024-06-07 12:29:43', '2024-06-07 12:41:07', '2024-06-07 12:41:07', 'cancelled', 21),
(40, 20, 'mert araz', '2024-06-12', '2024-06-13', '2024-06-07 12:46:05', '2024-06-07 12:49:45', '2024-06-07 12:49:45', 'cancelled', 127),
(41, 22, 'mert araz', '2024-06-12', '2024-06-13', '2024-06-07 12:49:26', '2024-06-07 12:49:26', NULL, 'confirmed', 100),
(42, 23, 'Mert', '2024-06-08', '2024-06-09', '2024-06-07 14:50:36', '2024-06-07 14:50:36', NULL, 'confirmed', 100);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `revenue`
--

CREATE TABLE `revenue` (
  `id` int(11) NOT NULL,
  `description` varchar(255) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `revenue_date` date NOT NULL,
  `category` enum('room_rent','services','other') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL,
  `reservation_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `revenue`
--

INSERT INTO `revenue` (`id`, `description`, `amount`, `revenue_date`, `category`, `created_at`, `updated_at`, `deleted_at`, `reservation_id`) VALUES
(1, 'Room rental for conference', 500.00, '2024-06-04', 'room_rent', '2024-06-04 19:51:38', '2024-06-04 19:58:09', '2024-06-04 19:58:09', NULL),
(3, 'Room Reservation 4', 1000.00, '2024-06-05', 'room_rent', '2024-06-04 23:04:47', '2024-06-07 11:36:42', '2024-06-07 11:36:42', NULL),
(5, 'Room Reservation 6', 777.00, '2024-06-05', 'room_rent', '2024-06-04 23:18:25', '2024-06-07 11:36:43', '2024-06-07 11:36:43', NULL),
(6, 'Room Reservation 7', 750.00, '2024-05-14', 'room_rent', '2024-06-05 14:44:33', '2024-06-07 11:36:44', '2024-06-07 11:36:44', NULL),
(7, 'Room Reservation 8', 800.00, '2024-06-01', 'room_rent', '2024-06-05 14:50:58', '2024-06-07 11:36:45', '2024-06-07 11:36:45', NULL),
(8, 'Room Reservation 9', 1800.00, '2024-06-05', 'room_rent', '2024-06-05 15:21:38', '2024-06-07 11:36:46', '2024-06-07 11:36:46', NULL),
(9, 'Room Reservation 11', 1997.00, '2024-06-05', 'room_rent', '2024-06-05 15:36:29', '2024-06-07 11:36:47', '2024-06-07 11:36:47', NULL),
(10, 'Room Reservation 12', 1997.00, '2024-06-05', 'room_rent', '2024-06-05 15:37:10', '2024-06-07 11:36:48', '2024-06-07 11:36:48', NULL),
(11, 'Room Reservation 13', 1997.00, '2024-06-05', 'room_rent', '2024-06-05 15:43:06', '2024-06-07 11:36:49', '2024-06-07 11:36:49', NULL),
(12, 'Room Reservation 14', 1000.00, '2024-06-04', 'room_rent', '2024-06-05 15:44:21', '2024-06-07 11:36:50', '2024-06-07 11:36:50', NULL),
(13, 'Room Reservation 15', 1500.00, '2024-06-03', 'room_rent', '2024-06-05 15:44:49', '2024-06-07 11:36:51', '2024-06-07 11:36:51', NULL),
(14, 'Room Reservation 16', 150.00, '2024-06-05', 'room_rent', '2024-06-05 15:55:28', '2024-06-07 11:36:52', '2024-06-07 11:36:52', 16),
(15, 'Room Reservation 14', 150.00, '2024-06-05', 'room_rent', '2024-06-05 15:55:28', '2024-06-07 11:36:53', '2024-06-07 11:36:53', 14),
(16, 'Room Reservation 17', 150.00, '2024-06-05', 'room_rent', '2024-06-05 17:09:48', '2024-06-07 11:36:54', '2024-06-07 11:36:54', NULL),
(17, 'Room Reservation 16', 150.00, '2024-06-05', 'room_rent', '2024-06-05 17:09:48', '2024-06-07 11:36:54', '2024-06-07 11:36:54', 16),
(18, 'Room Reservation 18', 150.00, '2024-06-05', 'room_rent', '2024-06-05 17:10:05', '2024-06-07 11:36:55', '2024-06-07 11:36:55', NULL),
(19, 'Room Reservation 18', 150.00, '2024-06-05', 'room_rent', '2024-06-05 17:10:05', '2024-06-07 11:36:56', '2024-06-07 11:36:56', 18),
(20, 'Room Reservation 19', 150.00, '2024-06-05', 'room_rent', '2024-06-05 17:10:21', '2024-06-07 11:36:57', '2024-06-07 11:36:57', NULL),
(21, 'Room Reservation 20', 150.00, '2024-06-05', 'room_rent', '2024-06-05 17:10:21', '2024-06-07 11:37:00', '2024-06-07 11:37:00', 20),
(22, 'Room Reservation 17', 150.00, '2024-06-05', 'room_rent', '2024-06-05 17:11:55', '2024-06-07 11:37:01', '2024-06-07 11:37:01', NULL),
(23, 'Room Reservation 17', 150.00, '2024-06-05', 'room_rent', '2024-06-05 17:12:51', '2024-06-07 11:37:02', '2024-06-07 11:37:02', NULL),
(24, 'Room Reservation 17', 200.00, '2024-06-05', 'room_rent', '2024-06-05 17:12:59', '2024-06-07 11:37:03', '2024-06-07 11:37:03', NULL),
(25, 'Room Reservation 20', 200.00, '2024-06-05', 'room_rent', '2024-06-05 17:17:52', '2024-06-07 11:37:04', '2024-06-07 11:37:04', NULL),
(26, 'Room Reservation 25', 200.00, '2024-06-05', 'room_rent', '2024-06-05 17:17:52', '2024-06-07 11:37:05', '2024-06-07 11:37:05', 25),
(27, 'Room Reservation 21', 800.00, '2024-06-08', 'room_rent', '2024-06-05 17:19:41', '2024-06-07 11:37:06', '2024-06-07 11:37:06', NULL),
(28, 'Room Reservation 27', 800.00, '2024-06-08', 'room_rent', '2024-06-05 17:19:41', '2024-06-07 11:37:07', '2024-06-07 11:37:07', 27),
(29, 'Room Reservation 22', 100.00, '2024-06-05', 'room_rent', '2024-06-05 17:34:41', '2024-06-07 11:37:08', '2024-06-07 11:37:08', NULL),
(30, 'Room Reservation 29', 100.00, '2024-06-05', 'room_rent', '2024-06-05 17:34:41', '2024-06-07 11:37:09', '2024-06-07 11:37:09', 29),
(31, 'Room Reservation 23', 200.00, '2024-06-05', 'room_rent', '2024-06-05 17:38:21', '2024-06-07 11:37:09', '2024-06-07 11:37:09', NULL),
(32, 'Room Reservation 31', 200.00, '2024-06-05', 'room_rent', '2024-06-05 17:38:21', '2024-06-07 11:37:10', '2024-06-07 11:37:10', 31),
(33, 'Room Reservation 24', 100.00, '2024-06-05', 'room_rent', '2024-06-05 18:05:05', '2024-06-07 11:37:11', '2024-06-07 11:37:11', NULL),
(34, 'Room Reservation 33', 100.00, '2024-06-05', 'room_rent', '2024-06-05 18:05:05', '2024-06-07 11:37:12', '2024-06-07 11:37:12', 33),
(35, 'Room Reservation 25', 200.00, '2024-06-05', 'room_rent', '2024-06-05 18:05:45', '2024-06-07 11:37:14', '2024-06-07 11:37:14', NULL),
(36, 'Room Reservation 35', 200.00, '2024-06-05', 'room_rent', '2024-06-05 18:05:45', '2024-06-07 11:37:15', '2024-06-07 11:37:15', 35),
(37, 'Room Reservation 26', 200.00, '2024-06-05', 'room_rent', '2024-06-05 18:05:59', '2024-06-07 11:37:16', '2024-06-07 11:37:16', NULL),
(38, 'Room Reservation 37', 200.00, '2024-06-05', 'room_rent', '2024-06-05 18:05:59', '2024-06-05 18:05:59', NULL, 37),
(39, 'Room Reservation 27', 4800.00, '2024-06-06', 'room_rent', '2024-06-06 18:45:21', '2024-06-07 11:37:18', '2024-06-07 11:37:18', NULL),
(40, 'Room Reservation 39', 4800.00, '2024-06-06', 'room_rent', '2024-06-06 18:45:21', '2024-06-07 11:37:19', '2024-06-07 11:37:19', 39),
(41, 'Room Reservation 26', 200.00, '2024-06-05', 'room_rent', '2024-06-07 07:17:48', '2024-06-07 07:17:48', NULL, NULL),
(42, 'Room Reservation 28', 1800.00, '2024-06-07', 'room_rent', '2024-06-07 11:35:31', '2024-06-07 11:35:31', NULL, NULL),
(43, 'Room Reservation 42', 1800.00, '2024-06-07', 'room_rent', '2024-06-07 11:35:31', '2024-06-07 11:35:31', NULL, 42),
(44, 'Room Reservation 29', 500.00, '2024-06-07', 'room_rent', '2024-06-07 11:39:37', '2024-06-07 11:39:37', NULL, NULL),
(45, 'Room Reservation 44', 500.00, '2024-06-07', 'room_rent', '2024-06-07 11:39:37', '2024-06-07 11:39:37', NULL, 44),
(46, 'Room Reservation 29', 100.00, '2024-06-07', 'room_rent', '2024-06-07 11:40:14', '2024-06-07 11:40:14', NULL, NULL),
(47, 'Room Reservation 30', 700.00, '2024-06-07', 'room_rent', '2024-06-07 11:45:44', '2024-06-07 11:45:44', NULL, NULL),
(48, 'Room Reservation 47', 700.00, '2024-06-07', 'room_rent', '2024-06-07 11:45:44', '2024-06-07 11:45:44', NULL, 47),
(49, 'Room Reservation 31', 700.00, '2024-06-09', 'room_rent', '2024-06-07 12:06:31', '2024-06-07 12:06:31', NULL, NULL),
(50, 'Room Reservation 32', 750.00, '2024-06-07', 'room_rent', '2024-06-07 12:07:28', '2024-06-07 12:07:28', NULL, NULL),
(51, 'Room Reservation 32', 1500.00, '2024-06-07', 'room_rent', '2024-06-07 12:08:27', '2024-06-07 12:08:27', NULL, NULL),
(52, 'Room Reservation 33', 400.00, '2024-06-07', 'room_rent', '2024-06-07 12:10:42', '2024-06-07 12:10:42', NULL, NULL),
(53, 'Room Reservation 34', 1000.00, '2024-06-07', 'room_rent', '2024-06-07 12:13:11', '2024-06-07 12:13:11', NULL, NULL),
(54, 'Room Reservation 35', 500.00, '2024-06-10', 'room_rent', '2024-06-07 12:13:37', '2024-06-07 12:13:37', NULL, NULL),
(55, 'Room Reservation 36', 100.00, '2024-06-13', 'room_rent', '2024-06-07 12:15:48', '2024-06-07 12:15:48', NULL, NULL),
(56, 'Room Reservation 37', 100.00, '2024-06-07', 'room_rent', '2024-06-07 12:16:25', '2024-06-07 12:16:25', NULL, NULL),
(57, 'Room Reservation 38', 200.00, '2024-06-12', 'room_rent', '2024-06-07 12:20:20', '2024-06-07 12:20:20', NULL, NULL),
(58, 'Room Reservation 39', 21.00, '2024-06-19', 'room_rent', '2024-06-07 12:29:43', '2024-06-07 12:29:43', NULL, NULL),
(59, 'Room Reservation 40', 500.00, '2024-06-12', 'room_rent', '2024-06-07 12:46:05', '2024-06-07 12:46:05', NULL, NULL),
(60, 'Room Reservation 41', 100.00, '2024-06-12', 'room_rent', '2024-06-07 12:49:26', '2024-06-07 12:49:26', NULL, NULL),
(61, 'Room Reservation 42', 100.00, '2024-06-08', 'room_rent', '2024-06-07 14:50:36', '2024-06-07 14:50:36', NULL, NULL);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `rooms`
--

CREATE TABLE `rooms` (
  `id` int(11) NOT NULL,
  `room_number` varchar(50) NOT NULL,
  `type` varchar(50) NOT NULL,
  `status` varchar(20) NOT NULL,
  `cleaning_status` varchar(20) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `rooms`
--

INSERT INTO `rooms` (`id`, `room_number`, `type`, `status`, `cleaning_status`, `price`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, '101', 'Single', 'Available', 'Clean', 100.00, '2024-06-04 17:38:47', '2024-06-05 15:54:13', '2024-06-05 15:54:13'),
(2, '102', 'Süit', 'Available', 'Temiz', 5000.00, '2024-06-04 17:51:55', '2024-06-05 15:54:08', '2024-06-05 15:54:08'),
(3, '103', 'Tek Kişilik', 'Occupied', 'Temiz', 1000.00, '2024-06-04 22:56:06', '2024-06-05 15:31:07', '2024-06-05 15:31:07'),
(4, '104', 'Çift Kişilik', 'Occupied', 'Temiz', 800.00, '2024-06-05 14:50:02', '2024-06-05 15:31:06', '2024-06-05 15:31:06'),
(5, '105', 'Süit', 'Available', 'Temiz', 900.00, '2024-06-05 14:50:16', '2024-06-05 15:31:05', '2024-06-05 15:31:05'),
(6, '103', 'Suite', 'Available', 'Temiz', 500.00, '2024-06-05 15:31:48', '2024-06-05 15:54:11', '2024-06-05 15:54:11'),
(7, '104', 'Single', 'Available', 'Temiz', 1997.00, '2024-06-05 15:35:57', '2024-06-05 15:54:10', '2024-06-05 15:54:10'),
(8, '201', 'Single ', 'Occupied', 'Clean', 150.00, '2024-06-05 15:55:08', '2024-06-05 17:17:05', '2024-06-05 17:17:05'),
(9, '301', 'Single ', 'Available', 'Clean', 100.00, '2024-06-05 17:17:29', '2024-06-05 17:33:35', '2024-06-05 17:33:35'),
(10, '102', 'Single ', 'Available', 'Clean', 100.00, '2024-06-05 17:33:57', '2024-06-05 17:58:38', '2024-06-05 17:53:35'),
(11, '', 'Single', 'Available', 'Dirty', 200.00, '2024-06-05 17:34:07', '2024-06-07 11:35:11', '2024-06-07 11:35:01'),
(12, '', 'Single', 'Available', 'Temiz', 300.00, '2024-06-05 17:34:27', '2024-06-07 11:37:31', '2024-06-07 11:37:31'),
(13, '101', 'Single', 'Available', 'Temiz', 100.00, '2024-06-05 17:58:03', '2024-06-07 11:37:32', '2024-06-07 11:37:32'),
(14, '104', 'Single', 'Available', 'Temiz', 1200.00, '2024-06-06 18:43:51', '2024-06-07 11:39:19', '2024-06-07 11:37:33'),
(15, '', 'Single', 'Available', 'Clean', 500.00, '2024-06-07 11:38:12', '2024-06-07 11:45:28', '2024-06-07 11:45:28'),
(16, '', 'Double', 'Available', 'Temiz', 100.00, '2024-06-07 11:38:27', '2024-06-07 11:45:32', '2024-06-07 11:45:29'),
(17, '', 'Suite', 'Available', 'Temiz', 700.00, '2024-06-07 11:38:50', '2024-06-07 12:07:02', '2024-06-07 12:07:02'),
(18, '', 'Suite', 'Available', 'Temiz', 750.00, '2024-06-07 11:39:10', '2024-06-07 12:10:18', '2024-06-07 12:10:14'),
(19, '', 'Single', 'Available', 'Temiz', 400.00, '2024-06-07 12:10:12', '2024-06-07 12:12:57', '2024-06-07 12:12:57'),
(20, '106', 'Double', 'Available', 'Temiz', 500.00, '2024-06-07 12:10:33', '2024-06-07 12:49:45', NULL),
(21, '107', 'Suite', 'Occupied', 'Temiz', 100.00, '2024-06-07 12:15:35', '2024-06-07 12:49:38', '2024-06-07 12:49:38'),
(22, '108', 'Single', 'Occupied', 'Temiz', 100.00, '2024-06-07 12:16:12', '2024-06-07 12:49:26', NULL),
(23, '109', 'Suite', 'Occupied', 'Temiz', 100.00, '2024-06-07 14:48:18', '2024-06-07 14:50:36', NULL);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `sessions`
--

CREATE TABLE `sessions` (
  `id` int(11) NOT NULL,
  `session_id` varchar(255) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `expires_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `todos`
--

CREATE TABLE `todos` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `is_completed` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL,
  `dueDate` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `todos`
--

INSERT INTO `todos` (`id`, `user_id`, `title`, `description`, `is_completed`, `created_at`, `updated_at`, `deleted_at`, `dueDate`) VALUES
(6, 27, 'Est a qui adipisci ', '23345567', 0, '2024-06-06 22:42:27', '2024-06-07 07:21:39', '2024-06-06 23:37:29', '2024-06-01'),
(8, 27, 'Ea deserunt consequa', '1232', 0, '2024-06-06 23:09:53', '2024-06-06 23:50:10', NULL, '2024-06-26'),
(10, 27, 'Repudiandae maiores ', 'Consectetur vel et o', 0, '2024-06-06 23:13:24', '2024-06-06 23:13:24', NULL, '2024-06-08'),
(12, 27, 'A blanditiis sed rei', 'Et aut vel aliquam q', 0, '2024-06-06 23:23:50', '2024-06-06 23:50:35', '2024-06-06 23:50:35', '2024-06-01');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `user_type` enum('admin','user') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `profile_picture` varchar(255) DEFAULT NULL,
  `verification_code` varchar(100) DEFAULT NULL,
  `email_verified_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `user_type`, `created_at`, `updated_at`, `profile_picture`, `verification_code`, `email_verified_at`) VALUES
(27, 'measses', 'mert@gmail.com', '$2y$10$jGv0AAofGIp/lHShkmkv2Ok2LM1BI7iGKs5ptnhxMXFFLUbRTPxJG', 'admin', '2024-06-06 18:12:01', '2024-06-07 14:44:19', 'cagimid_imagine_promptAcademic_and_professional_AI_in_education_a51b077c-5283-4ce7-a2ba-aab309717063.png', NULL, NULL),
(28, 'jyqipiweji', 'saqeq@mailinator.com', '$2y$10$uvGZtLnoLzruer66oBmhjeRDaHDz6xOiojFg5XGamMx0sbrKAcGlq', 'user', '2024-06-06 18:31:50', '2024-06-06 18:41:00', 'cagimid_imagine_promptAcademic_and_professional_AI_in_education.png', NULL, NULL),
(29, 'xoboryw', 'sepiryd@mailinator.com', '$2y$10$VsQ/Om5QElwwZy.O7OcylujMuetpO1mLXZ0Iz9tUoLfF7rMwyGJSG', 'user', '2024-06-06 18:42:57', '2024-06-06 18:46:15', 'profile_photo.jpg', NULL, NULL),
(30, 'sigesyjeho', 'zuvubugux@mailinator.com', '$2y$10$hpnNZcV2euAsRjAU67cpWO4CM7HzhzpO/zvapNPiC2u39ROvB.v8C', 'user', '2024-06-07 07:30:13', '2024-06-07 07:30:13', NULL, NULL, NULL),
(56, 'qiryn', 'mertaraz1907@gmail.com', '$2y$10$Axskv455CUkvyvfUcIOHkuCHCCm1rBqFacu7CTlGJ9ZfMzQmsmu/e', 'user', '2024-06-07 11:09:48', '2024-06-07 11:09:58', NULL, NULL, '2024-06-07 14:09:58'),
(57, 'murside', 'mursidetuncay@gmail.com', '$2y$10$uiQHGRuykiqcwOpRf8L48uBC6mNQ3KyOEOr.V/La9FJ1g1H8UriAe', 'user', '2024-06-07 11:10:43', '2024-06-07 11:11:38', 'profile_photo.jpg', NULL, '2024-06-07 14:11:07'),
(59, 'mertaraz', 'mertaraz7@gmail.com', '$2y$10$Fe4qorEd..Cy1cVKwQfK0OXJZqbMn2repb5tlb20uZ4GptGkxECMW', 'user', '2024-06-07 11:30:24', '2024-06-07 11:30:40', NULL, NULL, '2024-06-07 14:30:40');

--
-- Dökümü yapılmış tablolar için indeksler
--

--
-- Tablo için indeksler `expenses`
--
ALTER TABLE `expenses`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `reservations`
--
ALTER TABLE `reservations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `room_id` (`room_id`);

--
-- Tablo için indeksler `revenue`
--
ALTER TABLE `revenue`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `session_id` (`session_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Tablo için indeksler `todos`
--
ALTER TABLE `todos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Tablo için indeksler `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Dökümü yapılmış tablolar için AUTO_INCREMENT değeri
--

--
-- Tablo için AUTO_INCREMENT değeri `expenses`
--
ALTER TABLE `expenses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Tablo için AUTO_INCREMENT değeri `reservations`
--
ALTER TABLE `reservations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- Tablo için AUTO_INCREMENT değeri `revenue`
--
ALTER TABLE `revenue`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- Tablo için AUTO_INCREMENT değeri `rooms`
--
ALTER TABLE `rooms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- Tablo için AUTO_INCREMENT değeri `sessions`
--
ALTER TABLE `sessions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Tablo için AUTO_INCREMENT değeri `todos`
--
ALTER TABLE `todos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Tablo için AUTO_INCREMENT değeri `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- Dökümü yapılmış tablolar için kısıtlamalar
--

--
-- Tablo kısıtlamaları `reservations`
--
ALTER TABLE `reservations`
  ADD CONSTRAINT `reservations_ibfk_1` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`id`);

--
-- Tablo kısıtlamaları `sessions`
--
ALTER TABLE `sessions`
  ADD CONSTRAINT `sessions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Tablo kısıtlamaları `todos`
--
ALTER TABLE `todos`
  ADD CONSTRAINT `todos_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
