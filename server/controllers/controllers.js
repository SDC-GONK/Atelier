const models = require("../models/models.js");

exports.getQuestions = (req, res) => {
  models.findAllQuestions(req.query, (err, questions) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.status(200).send(questions);
    }
  });
};

exports.getAnswers = (req, res) => {
  models.findAllAnswers(req.query, req.params.question_id, (err, answers) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.status(200).send(answers);
    }
  });
};

exports.postQuestion = (req, res) => {
  models.createQuestion(req.body, (err, success) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(201);
    }
  });
};

exports.postAnswer = (req, res) => {
  models.createAnswer(req.params.question_id, req.body, (err, success) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(201);
    }
  });
};

exports.markHelpfulQuestion = (req, res) => {
  models.markQuestionHelpful(req.params.question_id, (err, success) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(204);
    }
  });
};

exports.reportQuestion = (req, res) => {
  models.reportQuestionToggle(req.params.question_id, (err, success) => {
    if (err) {
      console.log(err)
      res.sendStatus(500);
    } else {
      res.sendStatus(204);
    }
  });
};

exports.markHelpfulAnswer = (req, res) => {
  models.markAnswerHelpful(req.params.answer_id, (err, success) => {
    if (err) {
      console.log(err)
      res.sendStatus(500);
    } else {
      res.sendStatus(204);
    }
  });
};

exports.reportAnswer = (req, res) => {
  models.reportAnswerToggle(req.params.answer_id, (err, success) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(204);
    }
  });
};
