const mongoose = require("mongoose");

// 1. Use mongoose to establish a connection to MongoDB
mongoose.connect('mongodb://localhost/QnA');
// 2. Set up any schema and models needed by the app

const QnASchema = mongoose.Schema({
  product_id: Number,
  question_body: String,
  question_date: String,
  asker_name: String,
  asker_email: String,
  question_helpfulness: Number,
  reported: Boolean,
  answers: [{
    id: Number,
    body: String,
    date: String,
    answerer_name: String,
    answerer_email: String,
    helpfulness: Number,
    answer_reported: Boolean,
    photos: [{
      type: String,
    }],
  }],
});

const QnA = mongoose.model('QnA', QnASchema);
module.exports.QnA = QnA;
