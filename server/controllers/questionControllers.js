//question controllers go in here
module.exports = {
  allQuestions: function() {
    console.log('request for all questions received');
  },

  newQuestion: function(req, res) {
    console.log('new question received', req.body);
  },

  deleteQuestion: function() {
    console.log('request to delete question received');
  },

  readQuestion: function() {
    console.log('get request for question received', res.body);
  },

  modQuestion: function() {
    console.log('post request to modify a question received');
  }
};
