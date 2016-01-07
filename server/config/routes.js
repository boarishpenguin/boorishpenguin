var questionControllers = require ('../controllers/questionControllers.js');
var answerControllers = require ('../controllers/answerControllers.js');
var userControllers = require ('../controllers/userControllers.js');

module.exports = function(app, express) {
  app.get('/townhall/questions', questionControllers.allQuestions);
  app.post('/townhall/ask', questionControllers.newQuestion);
  // app.delete('/townhall/questions', questionControllers.deleteQuestion);

  app.get('/townhall/questions/:id', questionControllers.readQuestion);
  app.post('/townhall/questions/:id', questionControllers.modQuestion);

  app.post('/townhall/answers', answerControllers.newAnswer);
  app.post('/townhall/questions/:id/answers/:id', answerControllers.modAnswer);
  app.delete('/townhall/questions/:id/answers', answerControllers.deleteAnswer);

  app.get('/townhall/users', userControllers.allUsers);
  app.post('/townhall/signup', userControllers.newUser);
};
