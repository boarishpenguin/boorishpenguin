angular.module('boorish.answers', [])

.controller('answersController', function($scope, $location, Answers, Questions) {
  $scope.data = {};
  $scope.newAnswer = {};
  
  Questions.getQuestion().then(function(data) {
    $scope.data.question = data;
    $scope.data
  })

  $scope.removeQuestion = function() {
    Questions.removeQuestion()
  }

  $scope.addAnswer = function() {
    console.log('you clicked')
    console.log($scope.newAnswer);
    Answers.addAnswer($scope.newAnswer);
  };
})