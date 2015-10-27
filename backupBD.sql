/*
SQLyog Ultimate v11.11 (64 bit)
MySQL - 5.5.24 : Database - dm107
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`dm107` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `dm107`;

/*Table structure for table `entrega` */

DROP TABLE IF EXISTS `entrega`;

CREATE TABLE `entrega` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `PedidoID` int(11) NOT NULL,
  `ClienteID` int(11) NOT NULL,
  `NomeRecebedor` varchar(50) DEFAULT NULL,
  `CPFRecebedor` char(11) DEFAULT NULL,
  `ProprioComprador` tinyint(1) DEFAULT NULL,
  `Data` datetime DEFAULT NULL,
  `Localizacao` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
