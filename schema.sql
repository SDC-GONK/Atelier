DROP DATABASE IF EXISTS qna;
CREATE DATABASE qna;
\connect qna;

DROP TABLE IF EXISTS questions CASCADE;
CREATE TABLE IF NOT EXISTS questions (
  id SERIAL PRIMARY KEY,
  product_id INT NOT NULL,
  body VARCHAR(999) NOT NULL,
  date_written BIGINT NOT NULL,
  asker_name VARCHAR(30) NOT NULL,
  asker_email VARCHAR(50) NOT NULL,
  reported BOOLEAN NOT NULL DEFAULT false,
  helpful INT NOT NULL DEFAULT 0
);

DROP TABLE IF EXISTS answers CASCADE;
CREATE TABLE IF NOT EXISTS answers (
  id SERIAL PRIMARY KEY,
  question_id INT NOT NULL,
  body VARCHAR(999) NOT NULL,
  date_written BIGINT NOT NULL,
  answerer_name VARCHAR(30) NOT NULL,
  answerer_email VARCHAR(50) NOT NULL,
  reported BOOLEAN NOT NULL DEFAULT false,
  helpful INT NOT NULL DEFAULT 0,
  FOREIGN KEY (question_id) REFERENCES questions(id)
    on delete cascade on update cascade
);

DROP TABLE IF EXISTS photos CASCADE;
CREATE TABLE IF NOT EXISTS photos (
  id SERIAL PRIMARY KEY,
  answer_id INT NOT NULL,
  url VARCHAR(999) NOT NULL,
  FOREIGN KEY (answer_id) REFERENCES answers(id)
    on delete cascade on update cascade
);