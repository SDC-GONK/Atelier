const pool = require("../db.js");

exports.findAllQuestions = (inputs, callback) => {
  // const query = 'SELECT * from questions ORDER BY id DESC LIMIT 5';
  // pool.query(query)
  //   .then((questions) => {
  //     callback(null, questions.rows);
  //   })
  //   .catch((err) => callback(err));

  const query = `SELECT
  product_id,
  (
    SELECT coalesce(json_agg(
      json_build_object(
        'question_id', questions.id,
        'question_body', questions.body,
        'question_date', questions.date_written,
        'asker_name', questions.asker_name,
        'question_helpfulness', questions.helpful,
        'reported', questions.reported,

        'answers', (
          SELECT
            json_object_agg(
              id,
              (SELECT
                json_build_object(
                  'id', answers.id,
                  'body', answers.body,
                  'date', answers.date_written,
                  'answerer_name', answers.answerer_name,
                  'helpfulness', answers.helpful,

                  'photos', (
                    SELECT coalesce(json_agg(url), '[]'::json)
                    FROM photos
                    WHERE photos.answer_id = answers.id
                  )
                )
              )
            )
          FROM (SELECT * FROM answers
          WHERE answers.question_id = questions.id AND answers.reported = 'false'
          ORDER BY helpful
          LIMIT ${inputs.count} OFFSET ${(inputs.page - 1) * inputs.count}
          ) AS answers
        )
      )
      ORDER BY id ASC
    ))
  ) AS results
  FROM questions
  WHERE questions.product_id = ${inputs.product_id} AND questions.reported = 'false'
  GROUP BY product_id
  LIMIT ${inputs.count} OFFSET ${(inputs.page - 1) * inputs.count};
  `;
  pool.query(query)
    .then((questions) => {
      callback(null, questions.rows[0]);
    })
    .catch((err) => console.log(err));
};

exports.findAllAnswers = (inputs, question_id, callback) => {
  // const query = 'SELECT * from answers WHERE question_id = $1';
  // const queryArg = [question_id];
  // pool.query(query, queryArg)
  //   .then((answers) => {
  //     callback(null, answers.rows);
  //   })
  //   .catch((err) => callback(err));

  const query = `
  SELECT json_build_object(
    'question', ${question_id},
    'page', ${inputs.page},
    'count', ${inputs.count},
    'results', (
      SELECT json_agg(
        json_build_object(
          'answer_id', answers.id,
          'body', answers.body,
          'date', answers.date_written,
          'answerer_name', answers.answerer_name,
          'helpfulness', answers.helpful,

          'photos', (
            SELECT coalesce(json_agg(row_to_json(photo)), '[]'::json)
            FROM (SELECT id, url FROM photos
            WHERE photos.answer_id = answers.id)
            AS photo
          )
        )
      )
      FROM answers
      WHERE answers.question_id = ${question_id} AND answers.reported = false
      LIMIT ${inputs.count} OFFSET ${(inputs.page - 1) * inputs.count}
    )
  )
  `;
  pool.query(query)
    .then((answers) => {
      callback(null, answers.rows[0].json_build_object);
    })
    .catch((err) => console.log(err));
};

exports.createQuestion = (inputs, callback) => {
  const query = `
  INSERT INTO questions(product_id, body, date_written, asker_name, asker_email)
  VALUES ($1, $2, to_char(current_timestamp, 'yyyymmddhh24miss')::bigint,$3, $4)
  `;
  const queryArg = [inputs.product_id, inputs.body, inputs.asker_name, inputs.asker_email];
  pool.query(query, queryArg)
    .then((data) => {
      callback(null, data);
    })
    .catch((err) => callback(err));
};

exports.createAnswer = (question_id, inputs, callback) => {
  const query = `
  INSERT INTO answers(question_id, body, date_written, answerer_name, answerer_email)
  VALUES ($1, $2, to_char(current_timestamp, 'yyyymmddhh24miss')::bigint, $3, $4)
  `;
  const queryArg = [question_id, inputs.body, inputs.answerer_name, inputs.answerer_email];
  pool.query(query, queryArg)
    .then((data) => {
      callback(null, data);
    })
    .catch((err) => callback(err));
};

exports.markQuestionHelpful = (question_id, callback) => {
  const query = `
  UPDATE questions
  SET helpful = helpful + 1
  WHERE id = $1
  `;
  const queryArg = [question_id];
  pool.query(query, queryArg)
    .then((change) => {
      callback(null, change);
    })
    .catch((err) => callback(err));
};

exports.reportQuestionToggle = (question_id, callback) => {
  const query = `
  UPDATE questions
  SET reported = NOT reported
  WHERE id = $1
  `;
  const queryArg = [question_id];
  pool.query(query, queryArg)
    .then((change) => {
      callback(null, change);
    })
    .catch((err) => callback(err));
};

exports.markAnswerHelpful = (answer_id, callback) => {
  const query = `
  UPDATE answers
  SET helpful = helpful + 1
  WHERE id = $1
  `;
  const queryArg = [answer_id];
  pool.query(query, queryArg)
    .then((change) => {
      callback(null, change);
    })
    .catch((err) => callback(err));
};

exports.reportAnswerToggle = (answer_id, callback) => {
  const query = `
  UPDATE answers
  SET reported = NOT reported
  WHERE id = $1
  `;
  const queryArg = [answer_id];
  pool.query(query, queryArg)
    .then((change) => {
      callback(null, change);
    })
    .catch((err) => callback(err));
};
