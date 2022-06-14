require('dotenv').config();
const express = require('express');
const controllers = require("./controllers/controllers.js");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.json());

// TODO: Define routes
app.get('/qa/questions', controllers.getQuestions);
app.get('/qa/questions/:question_id/answers', controllers.getAnswers);
app.post('/qa/questions', controllers.postQuestion);
app.post('/qa/questions/:question_id/answers', controllers.postAnswer);
app.put('/qa/questions/:question_id/helpful', controllers.markHelpfulQuestion);
app.put('/qa/questions/:question_id/report', controllers.reportQuestion);
app.put('/qa/answers/:answer_id/helpful', controllers.markHelpfulAnswer);
app.put('/qa/answers/:answer_id/report', controllers.reportAnswer);

app.listen(process.env.PORT, () => {
  console.log(`QA server listening on port:${process.env.PORT}`)
});
