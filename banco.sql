  DROP DATABASE gravacoes;
  CREATE DATABASE gravacoes;
  USE gravacoes;

  CREATE TABLE court (
    id INT PRIMARY KEY,
    name VARCHAR(255)
  );

  CREATE TABLE dateNow (
    id INT PRIMARY KEY AUTO_INCREMENT,
    data VARCHAR(255),
    court_id INT NOT NULL,
    isDone BOOLEAN DEFAULT false,
    FOREIGN KEY (court_id) REFERENCES court(id)
  );

  CREATE TABLE clips (
    id INT PRIMARY KEY AUTO_INCREMENT,
    file TEXT,
    dateNow_id INT NOT NULL,
    FOREIGN KEY (dateNow_id) REFERENCES dateNow(id)
  );
