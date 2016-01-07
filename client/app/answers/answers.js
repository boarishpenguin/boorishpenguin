angular.module('boorish.answers', [])

.factory('Answers', function($http) {

  return {
    getAnswers: function() {
      return $http({
        method: 'GET',
        url: 'townhall/answers',
      }).then(function() {
        return res.data
      })
    }, 

    addAnswer: function(answer) {
      $http({
        method: 'POST',
        url: 'townhall/answers',
        data: JSON.stringify({
          text: answer.text,
          points: 0,
          isGood: false,
          id_Question: // TODO: pull question ID
          isAnswered: false,
          name: question.user
        })
      })
      .then(function() {
        console.log('question sent');
      })
    }
  }
})

.controller('answersController', function($scope, Answers) {
  $scope.answer = {};
})