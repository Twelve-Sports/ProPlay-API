CREATE DATABASE gravacoes;
USE gravacoes;

CREATE TABLE gravacoes (
  id int(11) PRIMARY KEY AUTO_INCREMENT,
  arquivo varchar(255) NOT NULL,
  data datetime NOT NULL,
  quadra varchar(50) NOT NULL
) ENGINE=MyISAM  DEFAULT CHARSET=utf8;