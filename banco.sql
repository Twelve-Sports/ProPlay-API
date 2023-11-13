DROP DATABASE gravacoes;
CREATE DATABASE gravacoes;
USE gravacoes;

CREATE TABLE record (
  id int PRIMARY KEY AUTO_INCREMENT,
  file varchar(255),
  data datetime,
  court varchar(50)
);

CREATE TABLE clips(
  id int PRIMARY KEY AUTO_INCREMENT,
  file varchar(255),
  timestamp datetime,
  record_id INT NOT NULL,
  FOREIGN KEY (record_id) REFERENCES record(id)
);

