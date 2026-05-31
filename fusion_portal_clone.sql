-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 31, 2026 at 01:45 PM
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
-- Table structure for table `branches`
--

CREATE TABLE `branches` (
  `branch_code` varchar(10) NOT NULL,
  `branch_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `branches`
--

INSERT INTO `branches` (`branch_code`, `branch_name`) VALUES
('CSE', 'Computer Science and Engineering'),
('DS', 'Bachelor of Design'),
('ECE', 'Electronics and Communication Engineering'),
('ME', 'Mechanical Engineering'),
('SM', 'Smart Manufacturing');

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `course_code` varchar(10) NOT NULL,
  `course_name` varchar(200) NOT NULL,
  `credits` int(11) DEFAULT NULL,
  `discipline_code` varchar(10) DEFAULT NULL,
  `course_type` varchar(20) DEFAULT 'Core'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`course_code`, `course_name`, `credits`, `discipline_code`, `course_type`) VALUES
('BTP4001', 'BTP', 9, NULL, 'Elective'),
('CS1001', 'Introduction to Profession', 1, 'CSE', 'Core'),
('CS2002', 'Computer Organization and Architecture', 4, 'CSE', 'Core'),
('CS2003', 'Database Management Systems', 4, 'CSE', 'Core'),
('CS2004', 'Introduction to Data Science', 4, 'CSE', 'Core'),
('CS2006', 'Operating Systems (02 Batches)', 4, 'CSE', 'Core'),
('CS2007', 'Design & Analysis of Algorithm (02 Batches)', 4, 'CSE', 'Core'),
('CS2008', 'Computer Network', 4, 'CSE', 'Core'),
('CS2009', 'IOT and Embedded Systems (02 Batches)', 4, 'CSE', 'Core'),
('CS3009', 'Network Security & Cryptography (02 Batches)', 3, NULL, 'Core'),
('CS3010', 'Software Engineering (02 Batches)', 4, NULL, 'Core'),
('CS3011', 'Artificial Intelligence (02 Batches)', 3, NULL, 'Core'),
('CS8004', 'Deep Learning and Applications', 3, NULL, 'Core'),
('CS8007', 'Social Network Analysis', 3, NULL, 'Core'),
('CS8009', 'Image Processing', 3, 'CSE', 'Core'),
('CS8010', 'Digital watermarking', 3, 'CSE', 'Core'),
('CS8011', 'Machine Learning', 3, 'CSE', 'Core'),
('CS8013', 'Mobile and Wireless Networks', 3, NULL, 'Core'),
('CS8015', 'Computer Vision with Deep Learning', 3, NULL, 'Core'),
('CS8016', 'Cloud Computing', 3, NULL, 'Core'),
('CS8018', 'Web Mining', 3, NULL, 'Core'),
('CS8025', 'Fuzzy Sets, Logic and Applications', 3, NULL, 'Core'),
('CS8027', 'Distributed Systems', 3, NULL, 'Core'),
('CS8028', 'Hardware Security', 3, NULL, 'Core'),
('CS8031', 'Cyber Security', 3, NULL, 'Core'),
('CS8033', 'Generative AI', 3, NULL, 'Core'),
('CS8034', 'Clustering', 3, NULL, 'Core'),
('CS8035', 'UAV Software Systems and Applications in Computer Science', 3, NULL, 'Core'),
('CS8036', 'Quantum Computing - Foundation, Algorithms and Applications', 3, NULL, 'Core'),
('CS8037', 'Data Engineering', 3, NULL, 'Core'),
('CS8038', 'Advanced Algorithms', 3, 'CSE', 'Core'),
('CS8039', 'Experimental Software Engineering', 3, NULL, 'Core'),
('DS1001', 'Introduction to Profession', 1, 'DS', 'Core'),
('DS1002', 'Design Fundamentals 1', 3, 'DS', 'Core'),
('DS1003', 'Design Drawing', 2, 'DS', 'Core'),
('DS1004', 'Representation Technique', 3, 'DS', 'Core'),
('DS1005', 'Engineering Graphics', 3, 'ME', 'Core'),
('DS1006', 'Design Fundamentals 2', 3, 'DS', 'Core'),
('DS1007', 'Introduction to Ergonomics in Design', 3, 'DS', 'Core'),
('DS1008', 'Software Skills', 2, 'DS', 'Core'),
('DS2005', 'Studies in Form', 3, 'DS', 'Core'),
('DS2006', 'Industrial Design 1', 3, 'DS', 'Core'),
('DS2007', 'Communication Design 1', 3, 'DS', 'Core'),
('DS2008', 'Design Project 1', 3, 'DS', 'Core'),
('DS2009', 'Industrial Design 2', 4, 'DS', 'Core'),
('DS2010', 'Material and Processes', 3, 'DS', 'Core'),
('DS2011', 'Communication Design 2', 4, 'DS', 'Core'),
('DS2012', 'Design Project 2', 4, 'DS', 'Core'),
('DS2013', 'Digital Media Studies', 3, 'DS', 'Core'),
('DS3001', 'Engineering Design –Including Design and Fabrication Project', 4, NULL, 'Core'),
('DS3009', 'Service Design', 3, NULL, 'Core'),
('DS3010', 'Sustainable Design', 3, NULL, 'Core'),
('DS3011', 'Design Management', 3, NULL, 'Core'),
('DS3012', 'Design Project 3', 3, NULL, 'Core'),
('DS3013', 'Design Project 4', 4, 'DS', 'Core'),
('DS3014', 'Minor Design Project', 3, 'DS', 'Core'),
('DS3015', 'Interaction Design', 4, 'DS', 'Core'),
('DS4013', 'Design Seminar I', 2, NULL, 'Core'),
('DS4014', 'Design Thesis 1', 15, NULL, 'Core'),
('DS4015', 'Design Seminar II', 2, NULL, 'Core'),
('DS4016', 'Design Thesis 2', 15, NULL, 'Core'),
('DS5018', 'Photography', 3, 'DS', 'Core'),
('EC1001', 'Introduction to Profession', 1, 'ECE', 'Core'),
('EC2002', 'Digital Electronics and Microprocessor Interfacing', 4, 'ECE', 'Core'),
('EC2005', 'Digital Signal Processing', 4, 'ECE', 'Core'),
('EC2006', 'Control Systems', 4, 'ECE', 'Core'),
('EC2008', 'Electronic Devices', 4, 'ECE', 'Core'),
('EC203a', 'Principle of Analog Communications', 2, NULL, 'Core'),
('EC203b', 'Network Theory (Analysis and Synthesis)', 2, NULL, 'Core'),
('EC204a', 'Electronics Devices and Circuits', 2, NULL, 'Core'),
('EC204b', 'Instrumentation and Measurement', 2, NULL, 'Core'),
('EC207a', 'Analog Circuits', 4, 'ECE', 'Core'),
('EC207b', 'Principles of Communication', 4, 'ECE', 'Core'),
('EC3009', 'VLSI System Design (VLSI IC desien, logic synthesis using V', 3, NULL, 'Core'),
('EC3010', 'Fundamentals of Electromagnetic Theory', 3, NULL, 'Core'),
('EC3011', 'Digital Communications', 3, NULL, 'Core'),
('EC5009', 'Nano Scale Integrated Computing', 3, NULL, 'Core'),
('EC5010', 'Advanced Embedded System Design', 3, 'ECE', 'Core'),
('EC5011', 'Principles of Analog Integrated Circuits Design', 3, 'ECE', 'Core'),
('EC5C01', 'Advanced Digital Communication', 3, NULL, 'Core'),
('EC5M02', 'Advanced Signal Processing', 3, NULL, 'Core'),
('EC5M03', 'Time Frequency Analysis', 3, NULL, 'Core'),
('EC5N01', 'Physics of Semiconductor Devices', 3, NULL, 'Core'),
('EC5N02', 'Digital VLSI Design', 3, NULL, 'Core'),
('EC5N03', 'Device Fabrication Technology', 3, NULL, 'Core'),
('EC8004', 'Pattern Recognition and Machine Learning', 3, NULL, 'Core'),
('EC8008', 'Information Theory and Coding', 3, 'ECE', 'Core'),
('EC8021', 'Fundamentals of 5G and beyond 5G Mobile Network', 3, NULL, 'Core'),
('EC8023', 'Fiber Optic Communication System', 3, 'ECE', 'Core'),
('EC8025', 'Wavelet and Filter Bank', 3, NULL, 'Core'),
('EC8029', 'Computer Vision and Applications', 3, 'ECE', 'Core'),
('EC8041', 'RF and Microwave engineering', 3, NULL, 'Core'),
('Elective c', 'Offer by CSE Discipline', 90, NULL, 'Core'),
('ES1002', 'Fundamentals of Electrical and Electronics Engineering', 4, 'ECE', 'Core'),
('ES1003', 'Innovation Theory and Practice', 2, 'TBD', 'Core'),
('HS1001', 'Effective Communications', 2, 'LA', 'Core'),
('HS1002', 'Indian Culture, Ethics and Human Values', 3, 'LA', 'Core'),
('HS3004', 'Ecology & Environment Science', 2, 'LA', 'Core'),
('IT1001', 'Introduction to Programming In C', 3, 'CSE', 'Core'),
('IT1002', 'Introduction to Programming In Python', 3, 'ECE', 'Core'),
('IT2001', 'Data Structure in C', 4, 'CSE', 'Core'),
('IT2002', 'Data Structure in Python', 4, 'ECE', 'Core'),
('IT2C01', 'IT Workshop I', 2, 'CSE', 'Core'),
('IT2C02', 'IT workshop II (02 Batches)', 2, NULL, 'Core'),
('IT2E01', 'Matlab and Simulink, Pspice', 2, NULL, 'Core'),
('IT2E02', 'IT Workshop II', 2, NULL, 'Core'),
('IT2M01', 'IT workshop I (Solid Works)', 2, NULL, 'Core'),
('IT2M02', 'IT Workshop II', 2, NULL, 'Core'),
('IT2S01', 'IT workshop I (Solid Works)', 2, NULL, 'Core'),
('IT2S02', 'IT Workshop II', 2, NULL, 'Core'),
('IT3C01', 'IT workshop III (02 Batches)', 2, NULL, 'Core'),
('IT3C03', 'IT workshop IV', 2, NULL, 'Elective'),
('IT3E01', 'Tanner Tool (Tspice), VHDL and Verilog', 2, NULL, 'Core'),
('IT3E03', 'IT workshop IV', 2, NULL, 'Core'),
('IT3M01', 'IT workshop III (Matlab + Simulink)', 2, NULL, 'Core'),
('IT3M03', 'IT workshop IV', 2, NULL, 'Core'),
('IT3S01', 'IT workshop III (Matlab + Simulink)', 2, NULL, 'Core'),
('IT3S03', 'IT workshop IV', 2, NULL, 'Core'),
('ME1001', 'Introduction to Profession', 1, 'ME', 'Core'),
('ME2002', 'Manufacturing Process', 4, 'ME', 'Core'),
('ME2003', 'Solid Mechanics', 4, 'ME', 'Core'),
('ME2004', 'Engineering Thermodynamics', 4, 'ME', 'Core'),
('ME2005', 'Engineering Materials and Characterization', 3, 'ME', 'Core'),
('ME2006', 'Kinematics and Dynamics of Machines', 4, 'ME', 'Core'),
('ME2007', 'Fluid Mechanics and Machinery', 4, 'ME', 'Core'),
('ME2008', 'Machining Science', 3, 'ME', 'Core'),
('ME3009', 'Design of Mechanical Components', 3, NULL, 'Core'),
('ME3010', 'Industrial Internet of Things', 3, NULL, 'Core'),
('ME3011', 'Heat Transfer', 4, NULL, 'Core'),
('ME5D02', 'Mechanical Vibrations and Condition', 3, NULL, 'Core'),
('ME5D03', 'Finite Element Methods for Mechanical Engineering', 3, NULL, 'Core'),
('ME8002', 'Design for Experiments', 3, NULL, 'Core'),
('ME8007', 'Smart Materials and Structures', 3, NULL, 'Core'),
('ME8011', 'Mechanic of Composite Materials', 3, NULL, 'Core'),
('ME8014', 'Mechanical Vibrations', 3, 'ME', 'Core'),
('ME8016', 'Biomaterials Science and Engineering', 3, NULL, 'Core'),
('ME8018', 'Fracture and Fatigue', 3, NULL, 'Core'),
('ME8019', 'Robotics and Intelligent Systems', 3, 'ME', 'Core'),
('ME8021', 'Design of Refrigeration & Air-Conditioning System', 3, 'ME', 'Core'),
('ME8025', 'Design & Simulation of Tribological', 3, NULL, 'Core'),
('ME8027', 'Refrigeration and Air Conditioning', 3, NULL, 'Core'),
('ME8028', 'Supply Chain Management', 3, 'ME', 'Core'),
('MT5003', 'Advances in Sensors and Actuators', 3, NULL, 'Core'),
('NP8008', 'Nano Technology', 3, NULL, 'Core'),
('NS1001', 'Mathematics-I', 4, 'NS', 'Core'),
('NS1002', 'Engineering Mechanics', 4, 'NS', 'Core'),
('NS1004', 'Physics II', 4, 'NS', 'Core'),
('NS103a', 'Mathematics II', 4, 'NS', 'Core'),
('NS103b', 'Mathematics II', 4, 'NS', 'Core'),
('NS2001', 'Biology for Engineers', 2, 'LA', 'Core'),
('OE07 (Choo', '', NULL, NULL, 'Core'),
('OE08 (Choo', '', NULL, NULL, 'Core'),
('OE09 (Choo', '', NULL, NULL, 'Core'),
('OE1 (Choos', '', NULL, NULL, 'Core'),
('OE10 (Choo', '', NULL, NULL, 'Core'),
('OE11 (Choo', '', NULL, NULL, 'Core'),
('OE13 (Choo', '', NULL, NULL, 'Core'),
('OE14 (Choo', '', NULL, NULL, 'Core'),
('OE2 (Choos', '', NULL, NULL, 'Core'),
('OE2C02', 'Discrete Structure', 3, NULL, 'Elective'),
('OE2C03', 'Language Theory', 3, NULL, 'Elective'),
('OE2C09', 'Graph Theory', 3, NULL, 'Elective'),
('OE2C10', 'Game Theory', 3, NULL, 'Elective'),
('OE2C12', 'Mathematics for AI', 3, NULL, 'Elective'),
('OE2D05', 'Packaging Design and Branding', 3, NULL, 'Elective'),
('OE2D06', 'Interface Design', 3, NULL, 'Elective'),
('OE2D11', 'Design Thinking', 3, NULL, 'Elective'),
('OE2D14', 'Science and Culture-A Comparison', 3, NULL, 'Elective'),
('OE2E03', 'Fundamentals of Signals and Systems', 3, 'ECE', 'Elective'),
('OE2E04', 'Introduction to Deep Learning', 3, NULL, 'Elective'),
('OE2E05', 'Random Variables and Random Processes', 3, NULL, 'Elective'),
('OE2M06', 'Fundamental of Robotics', 3, NULL, 'Elective'),
('OE2M07', 'Operations Research', 3, NULL, 'Elective'),
('OE2M10', 'Energy System Design', 3, NULL, 'Elective'),
('OE2N05', 'Complex Analysis & Linear Algebra', 3, NULL, 'Elective'),
('OE2N12', 'Numerical Methods for Engineer', 3, NULL, 'Elective'),
('OE2S09', 'Management Concept and Technology', 3, NULL, 'Elective'),
('OE3 (Choos', '', NULL, NULL, 'Core'),
('OE3C41', 'Agile Software Development Process', 3, NULL, 'Elective'),
('OE3C42', 'Data Warehousing and Data Mining', 3, NULL, 'Elective'),
('OE3D06', 'Indian Philosophy and Literature in', 3, NULL, 'Elective'),
('OE3D12', 'Communication Skills Management', 3, NULL, 'Elective'),
('OE3D16', 'Visual Ergonomics', 3, NULL, 'Elective'),
('OE3D20', 'Industrial Design', 3, NULL, 'Elective'),
('OE3D21', 'Communication Design', 3, NULL, 'Elective'),
('OE3D38', 'Human Computer Interaction', 3, NULL, 'Core'),
('OE3E09', 'IC Fabrication', 3, NULL, 'Elective'),
('OE3E15', 'Information theory and coding', 3, NULL, 'Elective'),
('OE3E25', 'VLSI Design and Modelling', 3, NULL, 'Elective'),
('OE3E30', 'Fibre Optics', 3, NULL, 'Elective'),
('OE3E35', 'Speech Processing', 3, NULL, 'Elective'),
('OE3E40', 'Computation Genomic & Proteomic', 3, NULL, 'Elective'),
('OE3M27', 'Vibrations of Mechanical Systems', 3, NULL, 'Elective'),
('OE3M34', 'Introduction to Non Destructive', 3, NULL, 'Elective'),
('OE3M35', 'Advance welding technology', 3, NULL, 'Elective'),
('OE3M36', 'Generative AI for Product', 3, NULL, 'Elective'),
('OE3M37', 'Industrial Engineering', 3, NULL, 'Elective'),
('OE3N32', 'Materials science and Engineering', 3, NULL, 'Elective'),
('OE3N36', 'Probability & Statistics', 3, NULL, 'Elective'),
('OE3N37', 'Optimization Theory and Application', 3, NULL, 'Elective'),
('OE4 (Choos', '', NULL, NULL, 'Core'),
('OE4E21', 'Power Electronics', 3, NULL, 'Elective'),
('OE4E25', 'Advance Antenna Theory Design', 3, NULL, 'Core'),
('OE4L01', 'Japanese Language Course Level-1', 3, NULL, 'Elective'),
('OE4L02', 'Japanese Language Course Level-2', 3, NULL, 'Elective'),
('OE4L73', 'Life Skills Management', 3, NULL, 'Elective'),
('OE4M22', 'Industrial Instrumentation & Metrology', 3, NULL, 'Elective'),
('OE4M27', 'Computer Integrated', 3, NULL, 'Elective'),
('OE4M35', 'Advanced Manufacturing Processes and Technologies', 3, NULL, 'Core'),
('OE4M41', 'Micro and Nano manufacturing', 3, NULL, 'Core'),
('OE4M52', 'Rapid Product Development Technologies', 3, NULL, 'Core'),
('OE4M74', 'AI and ML for Engineering', 3, NULL, 'Elective'),
('OE4M76', 'Digital Twins in Manufacturing', 3, NULL, 'Elective'),
('OE5 (Choos', '', NULL, NULL, 'Core'),
('OE6 (Choos', '', NULL, NULL, 'Core'),
('PC1001', 'Professional Development Course', 1, 'TBD', 'Core'),
('PC1002', 'Professional Development Course', 1, 'PR', 'Core'),
('PC2002', 'Professional Development Course', 1, 'TBD', 'Core'),
('PC3001', 'Soft Skills for Careers', 1, 'TBD', 'Core'),
('PC3002', 'Placement Readiness Skills', 1, 'TBD', 'Core'),
('PC3003', 'Professional Development Course', 1, NULL, 'Core'),
('PR2002', 'Discipline Project', 2, 'TBD', 'Core'),
('PR3003', 'Optional Project', 2, 'TBD', 'Elective'),
('PR4001', 'Project-based Internship (15C)', 15, NULL, 'Elective'),
('PR4002', 'Project-based Internship (9C)', 9, NULL, 'Elective'),
('SM1001', 'Introduction to Profession', 1, 'SM', 'Core'),
('SM2002', 'Manufacturing Process', 4, 'ME', 'Core'),
('SM2003', 'Solid Mechanics + Design of Mechanical Components', 4, 'SM', 'Core'),
('SM2004', 'Engineering Thermodynamics + Heat Transfer', 4, 'SM', 'Core'),
('SM2005', 'Engineering Materials and Characterization', 3, 'SM', 'Core'),
('SM2006', 'Kinematics and Dynamics of Machines', 4, 'SM', 'Core'),
('SM2007', 'Fluid Mechanics and Machinery + Fluid Power', 4, 'SM', 'Core'),
('SM2008', 'Advanced Machining Processes', 3, 'SM', 'Core'),
('SM3009', 'Additive and Subtractive Manufacturing Processes', 3, NULL, 'Core'),
('SM3010', 'Computer Aided Product Development', 3, NULL, 'Core'),
('SM3011', 'Industrial Automation', 4, NULL, 'Core'),
('SM3012', 'Advanced Cyber Physical System', 3, NULL, 'Core'),
('SW2001', 'SWAYAM 1', 0, 'TBD', 'Elective'),
('SW2002', 'SWAYAM 2', 0, 'TBD', 'Elective'),
('SW3001', 'SWAYAM 3', 0, NULL, 'Elective'),
('SW3004', 'SWAYAM 4', 0, 'TBD', 'Elective'),
('SW3005', 'SWAYAM 5', 0, 'TBD', 'Elective'),
('SW3006', 'SWAYAM 6', 0, 'TBD', 'Elective'),
('SW4010', 'SWAYAM 10', 0, NULL, 'Elective'),
('SW4011', 'SWAYAM 11', 0, NULL, 'Elective'),
('SW4013', 'SWAYAM13', 0, NULL, 'Elective'),
('SW4014', 'SWAYAM 14', 0, NULL, 'Elective');

-- --------------------------------------------------------

--
-- Table structure for table `course_branches`
--

CREATE TABLE `course_branches` (
  `course_code` varchar(10) NOT NULL,
  `branch_code` varchar(10) NOT NULL,
  `semester_number` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `course_branches`
--

INSERT INTO `course_branches` (`course_code`, `branch_code`, `semester_number`) VALUES
('CS1001', 'CSE', 1),
('CS2002', 'CSE', 3),
('CS2003', 'CSE', 3),
('CS2004', 'CSE', 3),
('CS2006', 'CSE', 4),
('CS2007', 'CSE', 4),
('CS2008', 'CSE', 4),
('CS2009', 'CSE', 4),
('CS3009', 'CSE', 5),
('CS3010', 'CSE', 5),
('CS3011', 'CSE', 5),
('CS8004', 'CSE', 7),
('CS8007', 'CSE', 7),
('CS8009', 'CSE', 6),
('CS8010', 'CSE', 6),
('CS8011', 'CSE', 6),
('CS8013', 'CSE', 7),
('CS8015', 'CSE', 8),
('CS8016', 'CSE', 5),
('CS8018', 'CSE', 7),
('CS8025', 'CSE', 7),
('CS8027', 'CSE', 8),
('CS8028', 'CSE', 5),
('CS8031', 'CSE', 7),
('CS8033', 'CSE', 8),
('CS8034', 'CSE', 8),
('CS8035', 'CSE', 8),
('CS8036', 'CSE', 7),
('CS8037', 'CSE', 7),
('CS8038', 'CSE', 6),
('CS8039', 'CSE', 8),
('DS1001', 'DS', 1),
('DS1002', 'DS', 1),
('DS1003', 'DS', 1),
('DS1004', 'DS', 1),
('DS1005', 'CSE', 2),
('DS1005', 'DS', 1),
('DS1005', 'ECE', 1),
('DS1005', 'ME', 1),
('DS1005', 'ME', 2),
('DS1005', 'SM', 1),
('DS1006', 'DS', 2),
('DS1007', 'DS', 2),
('DS1008', 'DS', 2),
('DS2005', 'DS', 3),
('DS2006', 'DS', 3),
('DS2007', 'DS', 3),
('DS2008', 'DS', 3),
('DS2009', 'DS', 4),
('DS2010', 'DS', 3),
('DS2011', 'DS', 4),
('DS2012', 'DS', 4),
('DS2013', 'DS', 4),
('DS3009', 'DS', 5),
('DS3010', 'DS', 5),
('DS3011', 'DS', 5),
('DS3012', 'DS', 5),
('DS3013', 'DS', 6),
('DS3015', 'DS', 6),
('DS4013', 'DS', 7),
('DS4014', 'DS', 7),
('DS4015', 'DS', 8),
('DS4016', 'DS', 8),
('DS5018', 'DS', 6),
('EC1001', 'ECE', 1),
('EC2002', 'ECE', 3),
('EC2005', 'ECE', 4),
('EC2006', 'ECE', 4),
('EC2008', 'ECE', 4),
('EC203a', 'ECE', 3),
('EC203b', 'ECE', 3),
('EC204a', 'ECE', 3),
('EC204b', 'ECE', 3),
('EC207a', 'ECE', 4),
('EC207b', 'ECE', 4),
('EC3009', 'ECE', 5),
('EC3010', 'ECE', 5),
('EC3011', 'ECE', 5),
('EC5009', 'ECE', 8),
('EC5010', 'ECE', 6),
('EC5011', 'ECE', 6),
('EC5C01', 'ECE', 7),
('EC5M02', 'ECE', 7),
('EC5M03', 'ECE', 7),
('EC5N01', 'ECE', 7),
('EC5N02', 'ECE', 7),
('EC5N03', 'ECE', 7),
('EC8004', 'ECE', 7),
('EC8008', 'ECE', 6),
('EC8021', 'ECE', 8),
('EC8023', 'ECE', 6),
('EC8025', 'ECE', 8),
('EC8029', 'ECE', 6),
('EC8041', 'ECE', 7),
('ES1002', 'CSE', 1),
('ES1002', 'ECE', 1),
('ES1002', 'ECE', 2),
('ES1003', 'CSE', 1),
('ES1003', 'CSE', 2),
('ES1003', 'DS', 1),
('ES1003', 'DS', 2),
('ES1003', 'ECE', 1),
('ES1003', 'ECE', 2),
('ES1003', 'ME', 1),
('ES1003', 'ME', 2),
('ES1003', 'SM', 1),
('ES1003', 'SM', 2),
('HS1001', 'CSE', 1),
('HS1001', 'DS', 1),
('HS1001', 'ECE', 1),
('HS1001', 'ME', 1),
('HS1001', 'SM', 1),
('HS1002', 'CSE', 2),
('HS1002', 'DS', 2),
('HS1002', 'ECE', 2),
('HS1002', 'ME', 2),
('HS1002', 'SM', 2),
('IT1001', 'CSE', 1),
('IT1002', 'ECE', 1),
('IT1002', 'ME', 1),
('IT2001', 'CSE', 3),
('IT2002', 'ECE', 3),
('IT2002', 'ME', 3),
('IT2C01', 'CSE', 3),
('IT2C02', 'CSE', 4),
('IT2E01', 'ECE', 3),
('IT2E02', 'ECE', 4),
('IT2M01', 'ME', 3),
('IT2M02', 'ME', 4),
('IT2S01', 'ME', 3),
('IT2S02', 'ME', 4),
('IT3C01', 'CSE', 5),
('IT3C03', 'CSE', 6),
('IT3E01', 'ECE', 5),
('IT3E03', 'ECE', 6),
('IT3M01', 'ME', 5),
('IT3M03', 'ME', 6),
('IT3S01', 'ME', 5),
('IT3S03', 'ME', 6),
('ME1001', 'ME', 1),
('ME2002', 'ME', 3),
('ME2002', 'ME', 4),
('ME2003', 'ME', 3),
('ME2004', 'ME', 3),
('ME2005', 'ME', 4),
('ME2006', 'ME', 4),
('ME2007', 'ME', 4),
('ME2008', 'ME', 4),
('ME3009', 'ME', 5),
('ME3010', 'ME', 5),
('ME3011', 'ME', 5),
('ME5D02', 'ME', 6),
('ME5D03', 'ME', 7),
('ME8002', 'ME', 7),
('ME8007', 'ME', 8),
('ME8011', 'ME', 8),
('ME8014', 'ME', 6),
('ME8016', 'ME', 7),
('ME8018', 'ME', 8),
('ME8019', 'ME', 6),
('ME8021', 'ME', 6),
('ME8025', 'ME', 8),
('ME8027', 'ME', 8),
('ME8028', 'ME', 6),
('MT5003', 'ME', 7),
('NS1001', 'CSE', 1),
('NS1001', 'DS', 1),
('NS1001', 'ECE', 1),
('NS1001', 'ME', 1),
('NS1001', 'SM', 1),
('NS1002', 'CSE', 1),
('NS1002', 'DS', 1),
('NS1002', 'ECE', 1),
('NS1002', 'ME', 1),
('NS1002', 'SM', 1),
('NS1004', 'CSE', 2),
('NS1004', 'ECE', 2),
('NS1004', 'ME', 2),
('NS1004', 'SM', 2),
('NS103a', 'ECE', 2),
('NS103a', 'ME', 2),
('NS103a', 'SM', 2),
('NS103b', 'CSE', 2),
('NS2001', 'CSE', 3),
('NS2001', 'CSE', 4),
('PC1001', 'CSE', 1),
('PC1001', 'DS', 1),
('PC1001', 'ECE', 1),
('PC1001', 'ME', 1),
('PC1001', 'SM', 1),
('PC1002', 'CSE', 2),
('PC1002', 'DS', 2),
('PC1002', 'ECE', 2),
('PC1002', 'ME', 2),
('PC1002', 'SM', 2),
('PC2002', 'CSE', 4),
('PC2002', 'DS', 4),
('PC2002', 'ECE', 4),
('PC2002', 'ME', 4),
('PC2002', 'SM', 4),
('PR2002', 'CSE', 4),
('SM1001', 'SM', 1),
('SM2002', 'ME', 3),
('SM2003', 'SM', 3),
('SM2004', 'SM', 3),
('SM2005', 'SM', 4),
('SM2006', 'SM', 4),
('SM2007', 'SM', 4),
('SM2008', 'ECE', 4),
('SM3009', 'ME', 5),
('SM3010', 'ME', 5),
('SM3011', 'SM', 5),
('SM3012', 'ME', 5);

-- --------------------------------------------------------

--
-- Table structure for table `disciplines`
--

CREATE TABLE `disciplines` (
  `discipline_code` varchar(10) NOT NULL,
  `discipline_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `disciplines`
--

INSERT INTO `disciplines` (`discipline_code`, `discipline_name`) VALUES
('CSE', 'Computer Science and Engineering'),
('DS', 'Design'),
('ECE', 'Electronics and Communication Engineering'),
('LA', 'Liberal Arts'),
('ME', 'Mechanical Engineering'),
('MT', 'Mechatronics'),
('NS', 'Natural Sciences'),
('PR', 'Placement'),
('SM', 'Smart Manufacturing'),
('SW', 'SWAYAM'),
('TBD', 'To Be Determined');

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



-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `roll_number` varchar(20) NOT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `current_semester` int(11) DEFAULT NULL,
  `branch_code` varchar(10) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `contact_number` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `branches`
--
ALTER TABLE `branches`
  ADD PRIMARY KEY (`branch_code`);

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`course_code`),
  ADD KEY `discipline_code` (`discipline_code`);

--
-- Indexes for table `course_branches`
--
ALTER TABLE `course_branches`
  ADD PRIMARY KEY (`course_code`,`branch_code`,`semester_number`),
  ADD KEY `branch_code` (`branch_code`);

--
-- Indexes for table `disciplines`
--
ALTER TABLE `disciplines`
  ADD PRIMARY KEY (`discipline_code`);

--
-- Indexes for table `enrollments`
--
ALTER TABLE `enrollments`
  ADD PRIMARY KEY (`enrollment_id`),
  ADD KEY `roll_number` (`roll_number`),
  ADD KEY `course_code` (`course_code`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`roll_number`),
  ADD KEY `branch_code` (`branch_code`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `enrollments`
--
ALTER TABLE `enrollments`
  MODIFY `enrollment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `courses`
--
ALTER TABLE `courses`
  ADD CONSTRAINT `courses_ibfk_1` FOREIGN KEY (`discipline_code`) REFERENCES `disciplines` (`discipline_code`);

--
-- Constraints for table `course_branches`
--
ALTER TABLE `course_branches`
  ADD CONSTRAINT `course_branches_ibfk_1` FOREIGN KEY (`course_code`) REFERENCES `courses` (`course_code`),
  ADD CONSTRAINT `course_branches_ibfk_2` FOREIGN KEY (`branch_code`) REFERENCES `branches` (`branch_code`);

--
-- Constraints for table `enrollments`
--
ALTER TABLE `enrollments`
  ADD CONSTRAINT `enrollments_ibfk_1` FOREIGN KEY (`roll_number`) REFERENCES `students` (`roll_number`),
  ADD CONSTRAINT `enrollments_ibfk_2` FOREIGN KEY (`course_code`) REFERENCES `courses` (`course_code`);

--
-- Constraints for table `students`
--
ALTER TABLE `students`
  ADD CONSTRAINT `students_ibfk_1` FOREIGN KEY (`branch_code`) REFERENCES `branches` (`branch_code`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
