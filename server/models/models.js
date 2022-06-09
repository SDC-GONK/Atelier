const pool = require("../db.js");

exports.findAllQuestions = (callback) => {
  const query = 'SELECT * from questions ORDER BY id ASC LIMIT 5';
  pool.query(query)
    .then((questions) => {
      callback(null, questions.rows);
    })
    .catch((err) => callback(err));
};

exports.findAllAnswers = (question_id, callback) => {
  const query = 'SELECT * from answers WHERE question_id = $1';
  const queryArg = [question_id];
  pool.query(query, queryArg)
    .then((answers) => {
      callback(null, answers.rows);
    })
    .catch((err) => callback(err));
};

exports.createQuestion = (inputs, callback) => {
  const query = "INSERT INTO questions(product_id, body, date_written, asker_name, asker_email) VALUES ($1, $2, to_char(current_timestamp, 'yyyymmddhh24miss')::bigint,$3, $4)";
  const queryArg = [inputs.product_id, inputs.body, inputs.asker_name, inputs.asker_email];
  pool.query(query, queryArg)
    .then((data) => {
      callback(null, data);
    })
    .catch((err) => callback(err));
};

exports.createAnswer = (question_id, inputs, callback) => {
  const query = "INSERT INTO answers(question_id, body, date_written, answerer_name, answerer_email) VALUES ($1, $2, to_char(current_timestamp, 'yyyymmddhh24miss')::bigint, $3, $4)";
  const queryArg = [question_id, inputs.body, inputs.answerer_name, inputs.answerer_email];
  pool.query(query, queryArg)
    .then((data) => {
      callback(null, data);
    })
    .catch((err) => callback(err));
};

exports.markQuestionHelpful = (question_id, callback) => {
  const query = 'UPDATE questions SET helpful = helpful + 1 WHERE id = $1';
  const queryArg = [question_id];
  pool.query(query, queryArg)
    .then((change) => {
      callback(null, change);
    })
    .catch((err) => callback(err));
};

exports.reportQuestionToggle = (question_id, callback) => {
  const query = 'UPDATE questions SET reported = NOT reported WHERE id = $1';
  const queryArg = [question_id];
  pool.query(query, queryArg)
    .then((change) => {
      callback(null, change);
    })
    .catch((err) => callback(err));
};

exports.markAnswerHelpful = (answer_id, callback) => {
  const query = 'UPDATE answers SET helpful = helpful + 1 WHERE id = $1';
  const queryArg = [answer_id];
  pool.query(query, queryArg)
    .then((change) => {
      callback(null, change);
    })
    .catch((err) => callback(err));
};

exports.reportAnswerToggle = (answer_id, callback) => {
  const query = 'UPDATE answers SET reported = NOT reported WHERE id = $1';
  const queryArg = [answer_id];
  pool.query(query, queryArg)
    .then((change) => {
      callback(null, change);
    })
    .catch((err) => callback(err));
};
