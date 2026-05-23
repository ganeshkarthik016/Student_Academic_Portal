-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 23, 2026 at 07:36 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fusion_portal_clone`
--

-- --------------------------------------------------------

--
-- Table structure for table `enrollments`
--

CREATE TABLE `enrollments` (
  `enrollment_id` int(11) NOT NULL,
  `roll_number` varchar(20) DEFAULT NULL,
  `course_code` varchar(10) DEFAULT NULL,
  `semester_execution` varchar(20) DEFAULT NULL,
  `grade` varchar(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `enrollments`
--

INSERT INTO `enrollments` (`enrollment_id`, `roll_number`, `course_code`, `semester_execution`, `grade`) VALUES
(1, '24BCS117', 'HS1001', '1', 'B+'),
(2, '24BCS117', 'NS1001', '1', 'B+'),
(3, '24BCS117', 'ES1002', '1', 'B+'),
(4, '24BCS117', 'NS1002', '1', 'D+'),
(5, '24BCS117', 'IT1001', '1', 'B+'),
(6, '24BCS117', 'CS1001', '1', 'S'),
(7, '24BCS117', 'HS1002', '2', 'C'),
(8, '24BCS117', 'ES1003', '2', 'D+'),
(9, '24BCS117', 'NS103b', '2', 'B'),
(10, '24BCS117', 'DS1005', '2', 'A'),
(11, '24BCS117', 'NS1004', '2', 'B+'),
(12, '24BCS117', 'OE2E03', '3', 'B'),
(13, '24BCS117', 'CS2004', '3', 'B'),
(14, '24BCS117', 'IT2C01', '3', 'B+'),
(15, '24BCS117', 'IT2001', '3', 'A+'),
(16, '24BCS117', 'CS2003', '3', 'A'),
(17, '24BCS117', 'NS2001', '3', 'B'),
(18, '24BCS117', 'CS2002', '3', 'A'),
(19, '24BCS054', 'ES1002', '1', 'C+'),
(20, '24BCS054', 'HS1001', '1', 'B+'),
(21, '24BCS054', 'NS1001', '1', 'B'),
(22, '24BCS054', 'NS1002', '1', 'B+'),
(23, '24BCS054', 'IT1001', '1', 'B+'),
(24, '24BCS054', 'CS1001', '1', 'S'),
(25, '24BCS054', 'HS1002', '2', 'D+'),
(26, '24BCS054', 'ES1003', '2', 'D+'),
(27, '24BCS054', 'NS103b', '2', 'B'),
(28, '24BCS054', 'DS1005', '2', 'A'),
(29, '24BCS054', 'NS1004', '2', 'B+'),
(30, '24BCS054', 'OE2E03', '3', 'C+'),
(31, '24BCS054', 'CS2004', '3', 'C+'),
(32, '24BCS054', 'IT2C01', '3', 'A'),
(33, '24BCS054', 'IT2001', '3', 'A'),
(34, '24BCS054', 'CS2003', '3', 'B'),
(35, '24BCS054', 'NS2001', '3', 'B'),
(36, '24BCS054', 'CS2002', '3', 'C+'),
(37, '24BCS054', 'CS2004', '3', 'B'),
(38, '24BCS054', 'CS2004', '3', 'B'),
(39, '24BCS054', 'CS2004', '3', 'B'),
(40, '24BCS054', 'CS2004', '3', 'B');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `enrollments`
--
ALTER TABLE `enrollments`
  ADD PRIMARY KEY (`enrollment_id`),
  ADD KEY `roll_number` (`roll_number`),
  ADD KEY `course_code` (`course_code`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `enrollments`
--
ALTER TABLE `enrollments`
  MODIFY `enrollment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `enrollments`
--
ALTER TABLE `enrollments`
  ADD CONSTRAINT `enrollments_ibfk_1` FOREIGN KEY (`roll_number`) REFERENCES `students` (`roll_number`),
  ADD CONSTRAINT `enrollments_ibfk_2` FOREIGN KEY (`course_code`) REFERENCES `courses` (`course_code`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
