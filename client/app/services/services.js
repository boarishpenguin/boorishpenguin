angular.module('boorish.services', [])

.factory('Questions', function($http, $location) {
  return {
    // add a question from /ask
    addQuestion: function(question) {
      $http({
        method: 'POST',
        url: 'townhall/ask',
        data: JSON.stringify({
          text: question.text,
          points: 0,
          person: question.person, // these are not setup yet
          course: question.course,  // these are not setup yet
          tags: question.tags,  // these are not setup yet
          isAnswered: false,
          isGood: false,
        })
      })
      .then(function() {
        console.log('question sent');
      })
    },

    getAllQuestions: function() {
      return $http({
        method: 'GET',
        url: '/townhall/questions/'
      })
      .then(function(res) {
        return res.data;
      })
    },

    getQuestion: function($location) { // TODO: Ask Steven about how to send this GET
      return $http({
        method: 'GET',
        url: '/townhall/questions/:id'
      })
    },

    updateQuestion: function(questionID) {
      // code to update a question when there is a new like or has been marked as answered
    },

    removeQuestion: function(questionID) {
      // code to remove a question by the user who posted it or isAdmin
    }
  }
})

.factory('Answers', function($http) {

  return {
    getAnswers: function() {
      return $http({
        method: 'GET',
        url: 'townhall/answers',
      })
      .then(function(res) {
        return res.data;
      })
    }, 

    addAnswer: function(answer) {
      console.log('clicked')
      $http({
        method: 'POST',
        url: 'townhall/answers',
        data: JSON.stringify({
          text: answer.text,
          points: 0,
          answersQuestions: '', // what is this??
          isGood: false,
          id_Question: '', // TODO: pull question ID
          person: question.user // TODO: pull question ID
        })
      })
      .then(function() {
        console.log('question sent');
      })
    },

    removeAnswer: function(answerID) {
      // code to delete answer from the data base by answerer or isAdmin
    }
  }
})