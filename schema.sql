DROP DATABASE IF EXISTS qna WITH (FORCE);
CREATE DATABASE qna;
\connect qna;

DROP TABLE IF EXISTS questions;
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
  helpful INT NOT NULL DEFAULT 0
);

DROP TABLE IF EXISTS photos CASCADE;
CREATE TABLE IF NOT EXISTS photos (
  id SERIAL PRIMARY KEY,
  answer_id INT NOT NULL,
  url VARCHAR(999) NOT NULL
);

COPY questions FROM '/Users/bearwy/Documents/Service_QnA/questions.csv' DELIMITER ',' CSV HEADER;
COPY answers FROM '/Users/bearwy/Documents/Service_QnA/answers.csv' DELIMITER ',' CSV HEADER;
COPY photos FROM '/Users/bearwy/Documents/Service_QnA/answers_photos.csv' DELIMITER ',' CSV HEADER;

ALTER TABLE questions ADD formatted_date TIMESTAMP WITHOUT TIME ZONE NULL;
UPDATE questions SET formatted_date = to_timestamp(date_written/1000)::TIMESTAMP;
ALTER TABLE questions ALTER COLUMN date_written TYPE TIMESTAMP WITHOUT TIME ZONE USING formatted_date;
ALTER TABLE questions DROP COLUMN formatted_date;


ALTER TABLE answers ADD formatted_date TIMESTAMP WITHOUT TIME ZONE NULL;
UPDATE answers SET formatted_date = to_timestamp(date_written/1000)::TIMESTAMP;
ALTER TABLE answers ALTER COLUMN date_written TYPE TIMESTAMP WITHOUT TIME ZONE USING formatted_date;
ALTER TABLE answers DROP COLUMN formatted_date;

CREATE INDEX product_id ON questions(product_id);
CREATE INDEX question_id ON answers(question_id);
CREATE INDEX answer_id ON photos(answer_id);
