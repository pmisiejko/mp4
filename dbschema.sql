CREATE DATABASE  IF NOT EXISTS `flowers_store` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `flowers_store`;
-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: flowers_store
-- ------------------------------------------------------
-- Server version	8.0.19

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `administrator`
--

DROP TABLE IF EXISTS `administrator`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `administrator` (
  `ID_administratora` int NOT NULL,
  `imie` varchar(20) NOT NULL,
  `nazwisko` varchar(20) NOT NULL,
  `login` varchar(20) NOT NULL,
  `haslo` varchar(64) NOT NULL,
  `dostep` int NOT NULL,
  `adres_maila` varchar(20) NOT NULL,
  PRIMARY KEY (`ID_administratora`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `administrator`
--

LOCK TABLES `administrator` WRITE;
/*!40000 ALTER TABLE `administrator` DISABLE KEYS */;
/*!40000 ALTER TABLE `administrator` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dostawa`
--

DROP TABLE IF EXISTS `dostawa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dostawa` (
  `ID_dostawy` int NOT NULL,
  `cena` int NOT NULL,
  `sposob_dostawy` varchar(30) NOT NULL,
  `przyblizony_czas` varchar(10) NOT NULL,
  PRIMARY KEY (`ID_dostawy`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dostawa`
--

LOCK TABLES `dostawa` WRITE;
/*!40000 ALTER TABLE `dostawa` DISABLE KEYS */;
/*!40000 ALTER TABLE `dostawa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `klient`
--

DROP TABLE IF EXISTS `klient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `klient` (
  `ID_klienta` int NOT NULL,
  `imie` varchar(20) NOT NULL,
  `nazwisko` varchar(20) NOT NULL,
  `adres_zamieszkania` varchar(50) NOT NULL,
  `punkty` int NOT NULL,
  `login` varchar(20) NOT NULL,
  `haslo` varchar(64) NOT NULL,
  `adres_mail` varchar(30) NOT NULL,
  `nr_telefonu` varchar(15) NOT NULL,
  PRIMARY KEY (`ID_klienta`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `klient`
--

LOCK TABLES `klient` WRITE;
/*!40000 ALTER TABLE `klient` DISABLE KEYS */;
INSERT INTO `klient` (`ID_klienta`, `imie`, `nazwisko`, `adres_zamieszkania`, `punkty`, `login`, `haslo`, `adres_mail`, `nr_telefonu`) VALUES (1,'Stan','Zan','Polna 3',0,'user1','user1','stan@zan.com','111222333'),(2,'Forrest','Pies','Buda 5',0,'user2','user2','pies@dog.hau','222444555'),(3,'Gosia','Szofer','Radzowie 7',0,'user3','user3','gox@xog.gx','546879546');
/*!40000 ALTER TABLE `klient` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `produkt`
--

DROP TABLE IF EXISTS `produkt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `produkt` (
  `ID_produktu` int NOT NULL,
  `kategoria` varchar(20) NOT NULL,
  `cena` int NOT NULL,
  `opis` varchar(200) NOT NULL,
  `kraj_pochodzenia` varchar(30) NOT NULL,
  `podkategoria` varchar(30) NOT NULL,
  `nazwa` varchar(20) NOT NULL,
  PRIMARY KEY (`ID_produktu`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produkt`
--

LOCK TABLES `produkt` WRITE;
/*!40000 ALTER TABLE `produkt` DISABLE KEYS */;
INSERT INTO `produkt` (`ID_produktu`, `kategoria`, `cena`, `opis`, `kraj_pochodzenia`, `podkategoria`, `nazwa`) VALUES (111,'Roślina',80,'Monstera dziurawa jest rośliną tolerancyjną na różne warunki. Dobrze rośnie nawet w zacienionych miejscach, dlatego często jest wybierana do biur i mieszkań.','Brazylia','Rośliny doniczkowe','Monstera dziurawa'),(222,'Roślina',70,'Pelargonia jest rośliną tolerancyjną na różne warunki. Dobrze rośnie nawet w zacienionych miejscach, dlatego często jest wybierana do biur i mieszkań.','Polska','Rośliny doniczkowe','Pelargonia');
/*!40000 ALTER TABLE `produkt` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `produkt_w_zamowieniu`
--

DROP TABLE IF EXISTS `produkt_w_zamowieniu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `produkt_w_zamowieniu` (
  `Zamowienie_ID_zamowienia` int NOT NULL,
  `Produkt_ID_produktu` int NOT NULL,
  `ilosc_produktow` int NOT NULL,
  `ID_produkt_w_zamowieniu` int NOT NULL,
  `koszt` int NOT NULL,
  PRIMARY KEY (`ID_produkt_w_zamowieniu`),
  KEY `Produkt_w_zamowieniu_Produkt` (`Produkt_ID_produktu`),
  KEY `Produkt_w_zamowieniu_Zamowienie` (`Zamowienie_ID_zamowienia`),
  CONSTRAINT `Produkt_w_zamowieniu_Produkt` FOREIGN KEY (`Produkt_ID_produktu`) REFERENCES `produkt` (`ID_produktu`),
  CONSTRAINT `Produkt_w_zamowieniu_Zamowienie` FOREIGN KEY (`Zamowienie_ID_zamowienia`) REFERENCES `zamowienie` (`ID_zamowienia`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produkt_w_zamowieniu`
--

LOCK TABLES `produkt_w_zamowieniu` WRITE;
/*!40000 ALTER TABLE `produkt_w_zamowieniu` DISABLE KEYS */;
/*!40000 ALTER TABLE `produkt_w_zamowieniu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sposob_platnosci`
--

DROP TABLE IF EXISTS `sposob_platnosci`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sposob_platnosci` (
  `ID_sposobu_platnosci` int NOT NULL,
  `rodzaj` varchar(20) NOT NULL,
  PRIMARY KEY (`ID_sposobu_platnosci`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sposob_platnosci`
--

LOCK TABLES `sposob_platnosci` WRITE;
/*!40000 ALTER TABLE `sposob_platnosci` DISABLE KEYS */;
/*!40000 ALTER TABLE `sposob_platnosci` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `zamowienie`
--

DROP TABLE IF EXISTS `zamowienie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `zamowienie` (
  `ID_zamowienia` int NOT NULL,
  `data_zamowienia` date NOT NULL,
  `data_dostawy` date NOT NULL,
  `adres_dostawy` varchar(50) NOT NULL,
  `Klient_ID_klienta` int NOT NULL,
  `status` varchar(20) NOT NULL,
  `rabat` int NOT NULL,
  `imie_klienta` varchar(20) NOT NULL,
  `nazwisko_klienta` varchar(20) NOT NULL,
  PRIMARY KEY (`ID_zamowienia`),
  KEY `Zamowienie_Klient` (`Klient_ID_klienta`),
  CONSTRAINT `Zamowienie_Klient` FOREIGN KEY (`Klient_ID_klienta`) REFERENCES `klient` (`ID_klienta`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `zamowienie`
--

LOCK TABLES `zamowienie` WRITE;
/*!40000 ALTER TABLE `zamowienie` DISABLE KEYS */;
INSERT INTO `zamowienie` (`ID_zamowienia`, `data_zamowienia`, `data_dostawy`, `adres_dostawy`, `Klient_ID_klienta`, `status`, `rabat`, `imie_klienta`, `nazwisko_klienta`) VALUES (1,'2020-01-12','2020-01-14','Radziwie 7',1,'W trakcie',0,'Stan','Zan'),(2,'2020-01-12','2020-01-15','Buda 3',2,'Do wyslania',1,'Forrest','Pies');
/*!40000 ALTER TABLE `zamowienie` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-01-14 23:26:55
