-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Vært: 127.0.0.1
-- Genereringstid: 27. 02 2018 kl. 22:40:47
-- Serverversion: 10.1.25-MariaDB
-- PHP-version: 5.6.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kso`
--

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `login_token` text,
  `media_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `application`
--

CREATE TABLE `application` (
  `id` int(11) NOT NULL,
  `comment` text,
  `customer_id` varchar(255) NOT NULL,
  `course_id` int(11) NOT NULL,
  `payment_token` varchar(255) DEFAULT NULL,
  `status` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `course`
--

CREATE TABLE `course` (
  `id` int(11) NOT NULL,
  `title` varchar(100) DEFAULT NULL,
  `description` text,
  `created` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `school_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `course_module`
--

CREATE TABLE `course_module` (
  `id` int(11) NOT NULL,
  `title` varchar(100) DEFAULT NULL,
  `description` text,
  `date` datetime DEFAULT NULL,
  `course_id` int(11) DEFAULT NULL,
  `status` tinyint(4) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `customer`
--

CREATE TABLE `customer` (
  `id_token` varchar(255) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `street` varchar(500) DEFAULT NULL,
  `zip` int(11) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `login_token` text,
  `media_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `media`
--

CREATE TABLE `media` (
  `id` int(11) NOT NULL,
  `name` varchar(240) DEFAULT NULL,
  `uuid` varchar(45) DEFAULT NULL,
  `ext` varchar(45) DEFAULT NULL,
  `mime` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `school`
--

CREATE TABLE `school` (
  `id` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `description` varchar(45) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `street` varchar(500) DEFAULT NULL,
  `zip` int(11) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `media_id` int(11) DEFAULT NULL,
  `id_token` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Begrænsninger for dumpede tabeller
--

--
-- Indeks for tabel `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email_UNIQUE` (`email`),
  ADD KEY `admin_media_id_fk` (`media_id`);

--
-- Indeks for tabel `application`
--
ALTER TABLE `application`
  ADD PRIMARY KEY (`id`),
  ADD KEY `application_course_id_fk` (`course_id`),
  ADD KEY `application_customer_id_token_fk` (`customer_id`);

--
-- Indeks for tabel `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`id`),
  ADD KEY `course_school_id_fk` (`school_id`);

--
-- Indeks for tabel `course_module`
--
ALTER TABLE `course_module`
  ADD PRIMARY KEY (`id`),
  ADD KEY `course_module_course_id_fk` (`course_id`);

--
-- Indeks for tabel `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`id_token`),
  ADD UNIQUE KEY `email_UNIQUE` (`email`),
  ADD KEY `customer_media_id_fk` (`media_id`);

--
-- Indeks for tabel `media`
--
ALTER TABLE `media`
  ADD PRIMARY KEY (`id`);

--
-- Indeks for tabel `school`
--
ALTER TABLE `school`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email_UNIQUE` (`email`),
  ADD KEY `school_media_id_fk` (`media_id`);

--
-- Brug ikke AUTO_INCREMENT for slettede tabeller
--

--
-- Tilføj AUTO_INCREMENT i tabel `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- Tilføj AUTO_INCREMENT i tabel `application`
--
ALTER TABLE `application`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;
--
-- Tilføj AUTO_INCREMENT i tabel `course`
--
ALTER TABLE `course`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=135;
--
-- Tilføj AUTO_INCREMENT i tabel `course_module`
--
ALTER TABLE `course_module`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- Tilføj AUTO_INCREMENT i tabel `media`
--
ALTER TABLE `media`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- Tilføj AUTO_INCREMENT i tabel `school`
--
ALTER TABLE `school`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- Begrænsninger for dumpede tabeller
--

--
-- Begrænsninger for tabel `admin`
--
ALTER TABLE `admin`
  ADD CONSTRAINT `admin_media_id_fk` FOREIGN KEY (`media_id`) REFERENCES `media` (`id`);

--
-- Begrænsninger for tabel `application`
--
ALTER TABLE `application`
  ADD CONSTRAINT `application_course_id_fk` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`),
  ADD CONSTRAINT `application_customer_id_token_fk` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id_token`);

--
-- Begrænsninger for tabel `course`
--
ALTER TABLE `course`
  ADD CONSTRAINT `course_school_id_fk` FOREIGN KEY (`school_id`) REFERENCES `school` (`id`);

--
-- Begrænsninger for tabel `course_module`
--
ALTER TABLE `course_module`
  ADD CONSTRAINT `course_module_course_id_fk` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`);

--
-- Begrænsninger for tabel `customer`
--
ALTER TABLE `customer`
  ADD CONSTRAINT `customer_media_id_fk` FOREIGN KEY (`media_id`) REFERENCES `media` (`id`);

--
-- Begrænsninger for tabel `school`
--
ALTER TABLE `school`
  ADD CONSTRAINT `school_media_id_fk` FOREIGN KEY (`media_id`) REFERENCES `media` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
