CREATE DATABASE  IF NOT EXISTS `sql7256433` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `sql7256433`;

CREATE TABLE `users` (
  `username` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  PRIMARY KEY (`username`,`password`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `classes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `value` varchar(200) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `value_UNIQUE` (`value`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

CREATE TABLE `students` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(120) NOT NULL,
  `citizen_number` varchar(20) DEFAULT NULL,
  `nationality` varchar(20) DEFAULT NULL,
  `contacts` varchar(200) DEFAULT NULL,
  `responsible` varchar(250) DEFAULT NULL,
  `musicality` tinyint(4) DEFAULT '0',
  `comments` varchar(500) DEFAULT NULL,
  `class_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `students_classes_fk` (`class_id`),
  CONSTRAINT `students_classes_fk` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=latin1;


alter table students add nickname varchar(250);
alter table students add graduationId int;

CREATE TABLE `grades` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `value` varchar(200) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `value_UNIQUE` (`value`)
);


INSERT INTO `classes`
(`id`,`value`)
VALUES
(3,	'Coimbra: Adultos'),
(1,	'Coimbra: Infantil 1'),
(2,	'Coimbra: Infantil 2'),
(5,	'Figueira da Foz Adultos'),
(4,	'Figueira da Foz: Infantil'),
(6,	'Pampilhosa');

insert into `grades`
(`id`,`value`)
Values
(1, 'Crua'),
(2, 'Crua-Cinza'),
(3, 'Crua-Amarela'),
(4, 'Crua-Laranja'),
(5, 'Crua-Verde'),
(6, 'Crua-Vermelho'),
(7, 'Crua-Azul'),
(8, 'Cinza-Laranja'),
(9, 'Cinza-Verde'),
(10, 'Cinza-Vermelho'),
(11, 'Cinza-Azul'),
(12, 'Amarelo-Verde'),
(13, 'Amarelo-Vermelho'),
(14, 'Amarelo-Azul'),
(15, 'Laranja-Vermelho'),
(16, 'Laranja-Azul'),
(17, 'Verde-Azul'),
(18, 'Cinza'),
(19, 'Cinza-Amarelo'),
(20, 'Amarelo'),
(21, 'Amarelo-Laranja'),
(22, 'Laranja'),
(23, 'Laranja-Verde'),
(24, 'Verde'),
(25, 'Verde-Vermelho'),
(26, 'Vermelho-Azul'),
(27, 'Azul');