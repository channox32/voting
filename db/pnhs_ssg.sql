-- phpMyAdmin SQL Dump
-- version 4.3.11
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Dec 05, 2015 at 03:25 AM
-- Server version: 5.6.24
-- PHP Version: 5.6.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `pnhs_ssg`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_info`
--

CREATE TABLE IF NOT EXISTS `admin_info` (
  `admin_id` int(5) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(100) NOT NULL,
  `firstname` varchar(20) NOT NULL,
  `lastname` varchar(20) NOT NULL,
  `role` int(5) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admin_info`
--

INSERT INTO `admin_info` (`admin_id`, `username`, `password`, `firstname`, `lastname`, `role`) VALUES
(11, 'jsanchez', '57b2ad99044d337197c0c39fd3823568ff81e48a', 'Joema', 'Sanchez', 1);

-- --------------------------------------------------------

--
-- Table structure for table `candidate_list`
--

CREATE TABLE IF NOT EXISTS `candidate_list` (
  `candidate_id` int(5) NOT NULL,
  `party_id` int(5) NOT NULL,
  `fullname` varchar(50) NOT NULL,
  `position` varchar(50) NOT NULL,
  `profile_picture` varchar(50) NOT NULL,
  `motto` varchar(100) NOT NULL,
  `year` int(5) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `candidate_list`
--

INSERT INTO `candidate_list` (`candidate_id`, `party_id`, `fullname`, `position`, `profile_picture`, `motto`, `year`) VALUES
(1, 2, 'Christian Rey Flores', 'president', '\\path\\to\\image', 'Time is Gold', 10),
(2, 1, 'Christopher Calumba', 'president', '\\path\\to\\image', 'God is Good', 10),
(3, 1, 'Amador Busalanan', 'vice_president', '/path/to/image', 'Bao ko', 10),
(4, 2, 'Junrey Camposo', 'vice_president', '/path/to/image', 'ToYeah!', 10),
(5, 1, 'Juvelyn Lobingco', 'secretary', '/path/to/image', 'Loves me!', 10),
(6, 2, 'Nholyn Marie Reyes', 'secretary', '/path/to/profile', 'Lahoooos', 10),
(7, 1, 'Norman Pulod', 'treasurer', '/path/to/image', 'Dota 2', 10),
(8, 2, 'Lyndon Centinales', 'treasurer', '/path/to/image', 'Dota 2', 10),
(9, 1, 'Stephen Padilla', 'pio', '/path/to/image', 'Bayot', 10),
(10, 2, 'Vincent Amaro', 'pio', '/path/to/image', 'House of IT is cool!', 10),
(11, 1, 'Stephen Padilla', 'auditor', '/path/to/image', 'Bayot', 10),
(12, 2, 'Vincent Amaro', 'auditor', '/path/to/image', 'House of IT is cool!', 10),
(13, 1, 'Julieto Asenjo', 'fourth', '/path/', 'Julieto on the move', 10),
(14, 2, 'Kenneth Cagat-cagat', 'fourth', '/path', 'Dota 2 boy', 10),
(15, 1, 'Julieto Asenjo', 'third', '/path/', 'Julieto on the move', 10),
(16, 2, 'Kenneth Cagat-cagat', 'third', '/path', 'Dota 2 boy', 10),
(17, 1, 'Julieto Asenjo', 'second', '/path/', 'Julieto on the move', 10),
(18, 2, 'Kenneth Cagat-cagat', 'second', '/path', 'Dota 2 boy', 10);

-- --------------------------------------------------------

--
-- Table structure for table `config`
--

CREATE TABLE IF NOT EXISTS `config` (
  `config_id` int(11) NOT NULL,
  `date_started` date NOT NULL,
  `date_ended` date NOT NULL,
  `status` varchar(11) NOT NULL,
  `passcode` varchar(64) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `config`
--

INSERT INTO `config` (`config_id`, `date_started`, `date_ended`, `status`, `passcode`) VALUES
(1, '2015-09-09', '2015-09-18', 'Active', '676b369b6ca09b5177b16037ee043399faaa47fb');

-- --------------------------------------------------------

--
-- Table structure for table `party_list`
--

CREATE TABLE IF NOT EXISTS `party_list` (
  `party_id` int(5) NOT NULL,
  `name` varchar(60) NOT NULL,
  `description` longtext NOT NULL,
  `platform` longtext NOT NULL,
  `date_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `party_list`
--

INSERT INTO `party_list` (`party_id`, `name`, `description`, `platform`, `date_created`) VALUES
(1, 'Christmas Party', 'Vote us for we celebrate christmas party everyday! For we believe that everyday is a savings day!', 'Free gifts. No class everyday!', '2015-09-12 00:11:28'),
(2, 'Halloween Party', 'Vote us for we celebrate halloween party everyday! For we believe that everyday is a savings day!', 'Trick or treat ? want it ?', '2015-09-12 00:11:28');

-- --------------------------------------------------------

--
-- Table structure for table `student_info`
--

CREATE TABLE IF NOT EXISTS `student_info` (
  `student_id` int(5) NOT NULL,
  `lrn` int(11) NOT NULL,
  `firstname` varchar(20) NOT NULL,
  `lastname` varchar(20) NOT NULL,
  `middlename` varchar(20) NOT NULL,
  `gender` varchar(10) NOT NULL,
  `birthdate` varchar(25) NOT NULL,
  `yearlevel` varchar(5) NOT NULL,
  `section` varchar(20) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `student_info`
--

INSERT INTO `student_info` (`student_id`, `lrn`, `firstname`, `lastname`, `middlename`, `gender`, `birthdate`, `yearlevel`, `section`, `date`) VALUES
(76, 2147483647, 'Christian Rey', 'Flores', 'Saquilabon', 'Male', 'June162004', '8', 'Fleming', '2015-12-05 01:55:55');

-- --------------------------------------------------------

--
-- Table structure for table `vote_data`
--

CREATE TABLE IF NOT EXISTS `vote_data` (
  `vote_id` int(5) NOT NULL,
  `voters_id` int(5) NOT NULL,
  `president` varchar(20) NOT NULL,
  `vice_president` varchar(20) NOT NULL,
  `secretary` varchar(20) NOT NULL,
  `treasurer` varchar(20) NOT NULL,
  `pio` varchar(20) NOT NULL,
  `auditor` varchar(20) NOT NULL,
  `fourth` varchar(20) NOT NULL,
  `third` varchar(20) NOT NULL,
  `second` varchar(20) NOT NULL,
  `date_voted` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `vote_data`
--

INSERT INTO `vote_data` (`vote_id`, `voters_id`, `president`, `vice_president`, `secretary`, `treasurer`, `pio`, `auditor`, `fourth`, `third`, `second`, `date_voted`) VALUES
(32, 0, 'Christian Rey Flores', 'Junrey Camposo', 'Nholyn Marie Reyes', 'Lyndon Centinales', 'Vincent Amaro', 'Vincent Amaro', 'Kenneth Cagat-cagat', 'Kenneth Cagat-cagat', 'Kenneth Cagat-cagat', '2015-12-05 09:57:43');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_info`
--
ALTER TABLE `admin_info`
  ADD PRIMARY KEY (`admin_id`);

--
-- Indexes for table `candidate_list`
--
ALTER TABLE `candidate_list`
  ADD PRIMARY KEY (`candidate_id`);

--
-- Indexes for table `config`
--
ALTER TABLE `config`
  ADD PRIMARY KEY (`config_id`);

--
-- Indexes for table `party_list`
--
ALTER TABLE `party_list`
  ADD PRIMARY KEY (`party_id`);

--
-- Indexes for table `student_info`
--
ALTER TABLE `student_info`
  ADD PRIMARY KEY (`student_id`);

--
-- Indexes for table `vote_data`
--
ALTER TABLE `vote_data`
  ADD PRIMARY KEY (`vote_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin_info`
--
ALTER TABLE `admin_info`
  MODIFY `admin_id` int(5) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT for table `candidate_list`
--
ALTER TABLE `candidate_list`
  MODIFY `candidate_id` int(5) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=19;
--
-- AUTO_INCREMENT for table `config`
--
ALTER TABLE `config`
  MODIFY `config_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `party_list`
--
ALTER TABLE `party_list`
  MODIFY `party_id` int(5) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `student_info`
--
ALTER TABLE `student_info`
  MODIFY `student_id` int(5) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=77;
--
-- AUTO_INCREMENT for table `vote_data`
--
ALTER TABLE `vote_data`
  MODIFY `vote_id` int(5) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=33;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
