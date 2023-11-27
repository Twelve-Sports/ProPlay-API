  DROP DATABASE gravacoes;
  CREATE DATABASE gravacoes;
  USE gravacoes;

  CREATE TABLE court (
    id INT PRIMARY KEY,
    name VARCHAR(255)
  );

  CREATE TABLE record (
    id INT PRIMARY KEY AUTO_INCREMENT,
    file VARCHAR(255),
    data DATETIME
  );

  CREATE TABLE clips (
    id INT PRIMARY KEY AUTO_INCREMENT,
    file VARCHAR(255),
    timestamp DATETIME,
    record_id INT NOT NULL,
    FOREIGN KEY (record_id) REFERENCES record(id)
  );

  CREATE TABLE dateNow (
    id INT PRIMARY KEY AUTO_INCREMENT,
    data VARCHAR(255),
    court_id INT NOT NULL,
    isDone BOOLEAN DEFAULT false,
    FOREIGN KEY (court_id) REFERENCES court(id)
  );

