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


INSERT INTO `classes`
(`id`,
`value`)
VALUES
(3,	'Coimbra: Adultos'),
(1,	'Coimbra: Infantil 1'),
(2,	'Coimbra: Infantil 2'),
(5,	'Figueira da Foz Adultos'),
(4,	'Figueira da Foz: Infantil'),
(6,	'Pampilhosa');


alter table students add nickname varchar(250);
alter table students add graduationId int;