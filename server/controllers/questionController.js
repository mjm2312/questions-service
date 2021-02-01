const { Question } = require('../db/mongo.js');
const { validationResult } = require('express-validator');

module.exports = {
  getQuestions: (req, res) => {
    // Responds with error if any of the route validations fail
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    Question.findByProductId(req.query.product_id, req.query.page, req.query.count)
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => {
        console.error(err);
        res.status(422).send(err.message);
      });

  },
  addQuestion: (req, res) => {
    // Responds with error if any of the route validations fail
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    // Build the question object
    let {body, name, email, product_id } = req.body;
    // save question object
    let question = new Question(
      { body, name, email, product_id}
    );
    question.save()
      .then(result => {
        res.sendStatus(201);
      })
      .catch( err => {
        res.sendStatus(500);
      });

  },
  markQuestionHelpful: (req, res) => {
    // Responds with error if any of the route validations fail
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    Question.markHelpful(req.params.question_id)
      .then(results => {
        res.sendStatus(204);
      })
      .catch( err => {
        res.sendStatus(500);
      });
  },
  reportQuestion: (req, res) => {
    // Responds with error if any of the route validations fail
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    Question.report(req.params.question_id)
      .then(results => {
        res.sendStatus(204);
      })
      .catch( err => {
        res.sendStatus(500);
      });
  },
};
