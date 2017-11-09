-- MySQL dump 10.13  Distrib 5.7.20, for Win64 (x86_64)
--
-- Host: localhost    Database: hpmdfin_development
-- ------------------------------------------------------
-- Server version	5.7.20-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `ar_internal_metadata`
--

DROP TABLE IF EXISTS `ar_internal_metadata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ar_internal_metadata` (
  `key` varchar(255) NOT NULL,
  `value` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ar_internal_metadata`
--

LOCK TABLES `ar_internal_metadata` WRITE;
/*!40000 ALTER TABLE `ar_internal_metadata` DISABLE KEYS */;
INSERT INTO `ar_internal_metadata` VALUES ('environment','development','2017-11-05 03:41:29','2017-11-05 03:41:29');
/*!40000 ALTER TABLE `ar_internal_metadata` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `devices`
--

DROP TABLE IF EXISTS `devices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `devices` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `mac_address` text,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `devices`
--

LOCK TABLES `devices` WRITE;
/*!40000 ALTER TABLE `devices` DISABLE KEYS */;
/*!40000 ALTER TABLE `devices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `districts`
--

DROP TABLE IF EXISTS `districts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `districts` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` text,
  `states_id` int(11) DEFAULT NULL,
  `code` text,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `districts`
--

LOCK TABLES `districts` WRITE;
/*!40000 ALTER TABLE `districts` DISABLE KEYS */;
INSERT INTO `districts` VALUES (1,'Laxminagar',1,'LAX','2017-11-05 04:28:56','2017-11-05 04:28:56');
/*!40000 ALTER TABLE `districts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `handpumps`
--

DROP TABLE IF EXISTS `handpumps`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `handpumps` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `state_id` int(11) DEFAULT NULL,
  `district_id` int(11) DEFAULT NULL,
  `sim_phone_number` text,
  `model_no` text,
  `device_id` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `water_consumption` int(11) DEFAULT NULL,
  `people_used` int(11) DEFAULT NULL,
  `usage` int(11) DEFAULT NULL,
  `pump_condition` text,
  `pump_condition_bucket` text,
  `water_level` int(11) DEFAULT NULL,
  `lat` double DEFAULT NULL,
  `lng` double DEFAULT NULL,
  `label` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `handpumps`
--

LOCK TABLES `handpumps` WRITE;
/*!40000 ALTER TABLE `handpumps` DISABLE KEYS */;
INSERT INTO `handpumps` VALUES (1,1,1,'8800846150','Afri Dev',1,'2017-11-05 04:28:56','2017-11-05 04:28:56',100,120,18,'PERFECT','satisfactory',20,28.6308,77.277,'DEL-LAX-1');
/*!40000 ALTER TABLE `handpumps` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `monitoring_data`
--

DROP TABLE IF EXISTS `monitoring_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `monitoring_data` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `handpump_id` int(11) DEFAULT NULL,
  `time` int(11) DEFAULT NULL,
  `zone1` int(11) DEFAULT NULL,
  `zone2` int(11) DEFAULT NULL,
  `zone3` int(11) DEFAULT NULL,
  `zone4` int(11) DEFAULT NULL,
  `usage` int(11) DEFAULT NULL,
  `people_used` int(11) DEFAULT NULL,
  `water_consumed_actual` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `monitoring_data`
--

LOCK TABLES `monitoring_data` WRITE;
/*!40000 ALTER TABLE `monitoring_data` DISABLE KEYS */;
INSERT INTO `monitoring_data` VALUES (23,1,1509762600,10,10,12,14,8,12,100,'2017-11-05 07:13:43','2017-11-05 07:13:43'),(24,1,1509766200,12,12,12,12,9,18,120,'2017-11-05 07:13:48','2017-11-05 07:13:48'),(25,1,1509769800,1,1,1,1,9,12,120,'2017-11-05 07:13:52','2017-11-05 07:13:52'),(26,1,1509773400,12,12,12,12,10,10,140,'2017-11-05 07:14:00','2017-11-05 07:14:00'),(27,1,1509777000,18,18,18,18,8,10,100,'2017-11-05 07:14:05','2017-11-05 07:14:05'),(28,1,1509780600,19,19,19,19,7,10,80,'2017-11-05 07:14:10','2017-11-05 07:14:10'),(29,1,1509784200,34,34,34,34,6,4,90,'2017-11-05 07:14:15','2017-11-05 07:14:15'),(30,1,1509787800,21,21,21,21,1,1,7,'2017-11-05 07:14:20','2017-11-05 07:14:20'),(31,1,1509791400,21,21,21,21,8,10,102,'2017-11-05 07:14:25','2017-11-05 07:14:25'),(32,1,1509795000,34,34,34,34,9,10,102,'2017-11-05 07:14:30','2017-11-05 07:14:30'),(33,1,1509798600,40,40,40,40,3,12,29,'2017-11-05 07:14:35','2017-11-05 07:14:35'),(34,1,1509802200,41,41,41,41,5,13,98,'2017-11-05 07:14:43','2017-11-05 07:14:43'),(35,1,1509805800,42,42,42,42,0,0,1,'2017-11-05 07:14:48','2017-11-05 07:14:48'),(36,1,1509809400,56,56,56,56,8,10,100,'2017-11-05 07:14:53','2017-11-05 07:14:53');
/*!40000 ALTER TABLE `monitoring_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `schema_migrations`
--

DROP TABLE IF EXISTS `schema_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `schema_migrations` (
  `version` varchar(255) NOT NULL,
  PRIMARY KEY (`version`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schema_migrations`
--

LOCK TABLES `schema_migrations` WRITE;
/*!40000 ALTER TABLE `schema_migrations` DISABLE KEYS */;
INSERT INTO `schema_migrations` VALUES ('20171105033934'),('20171105034212'),('20171105034311'),('20171105034557'),('20171105040040'),('20171105042805'),('20171105061826'),('20171105063424');
/*!40000 ALTER TABLE `schema_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `states`
--

DROP TABLE IF EXISTS `states`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `states` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` text,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `code` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `states`
--

LOCK TABLES `states` WRITE;
/*!40000 ALTER TABLE `states` DISABLE KEYS */;
INSERT INTO `states` VALUES (1,'Delhi','2017-11-05 04:28:56','2017-11-05 04:28:56','DEL'),(2,'Andhra Pradesh','2017-11-05 04:28:56','2017-11-05 04:28:56','AD'),(3,'Arunachal Pradesh','2017-11-05 04:28:56','2017-11-05 04:28:56','AR'),(4,'Assam','2017-11-05 04:28:56','2017-11-05 04:28:56','AS'),(5,'Bihar','2017-11-05 04:28:56','2017-11-05 04:28:56','BR'),(6,'Chandigarh','2017-11-05 04:28:56','2017-11-05 04:28:56','CH'),(7,'Chattisgarh','2017-11-05 04:28:56','2017-11-05 04:28:56','CG'),(8,'Dadra and Nagar Haveli','2017-11-05 04:28:56','2017-11-05 04:28:56','DN'),(9,'Daman and Diu','2017-11-05 04:28:56','2017-11-05 04:28:56','DD'),(10,'Delhi','2017-11-05 04:28:56','2017-11-05 04:28:56','DL'),(11,'Goa','2017-11-05 04:28:56','2017-11-05 04:28:56','GA'),(12,'Gujarat','2017-11-05 04:28:56','2017-11-05 04:28:56','GJ'),(13,'Haryana','2017-11-05 04:28:56','2017-11-05 04:28:56','HR'),(14,'Himachal Pradesh','2017-11-05 04:28:56','2017-11-05 04:28:56','HP'),(15,'Jammu and Kashmir','2017-11-05 04:28:56','2017-11-05 04:28:56','JK'),(16,'Jharkhand','2017-11-05 04:28:56','2017-11-05 04:28:56','JH'),(17,'Karnataka','2017-11-05 04:28:56','2017-11-05 04:28:56','KA'),(18,'Kerala','2017-11-05 04:28:56','2017-11-05 04:28:56','KL'),(19,'Lakshadweep Islands','2017-11-05 04:28:56','2017-11-05 04:28:56','LD'),(20,'Madhya Pradesh','2017-11-05 04:28:56','2017-11-05 04:28:56','MP'),(21,'Maharashtra','2017-11-05 04:28:56','2017-11-05 04:28:56','MH'),(22,'Manipur','2017-11-05 04:28:56','2017-11-05 04:28:56','MN'),(23,'Meghalaya','2017-11-05 04:28:56','2017-11-05 04:28:56','ML'),(24,'Mizoram','2017-11-05 04:28:56','2017-11-05 04:28:56','MZ'),(25,'Nagaland','2017-11-05 04:28:56','2017-11-05 04:28:56','NL'),(26,'Odisha','2017-11-05 04:28:56','2017-11-05 04:28:56','OD'),(27,'Pondicherry','2017-11-05 04:28:56','2017-11-05 04:28:56','PY'),(28,'Punjab','2017-11-05 04:28:56','2017-11-05 04:28:56','PB'),(29,'Rajasthan','2017-11-05 04:28:56','2017-11-05 04:28:56','RJ'),(30,'Sikkim','2017-11-05 04:28:56','2017-11-05 04:28:56','SK'),(31,'Tamil Nadu','2017-11-05 04:28:56','2017-11-05 04:28:56','TN'),(32,'Telangana','2017-11-05 04:28:56','2017-11-05 04:28:56','TS'),(33,'Tripura','2017-11-05 04:28:56','2017-11-05 04:28:56','TR'),(34,'Uttar Pradesh','2017-11-05 04:28:56','2017-11-05 04:28:56','UP'),(35,'Uttarakhand','2017-11-05 04:28:56','2017-11-05 04:28:56','UK'),(36,'West Bengal','2017-11-05 04:28:56','2017-11-05 04:28:56','WB');
/*!40000 ALTER TABLE `states` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-11-05 14:55:07
