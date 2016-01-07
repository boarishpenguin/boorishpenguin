angular.module('boorishpenguin', [
  'boorish.question'
  ])

.config(function ($routeProvider) {
  $routeProvider
    .when('/questions', {
      templateUrl: 'app/questions/questions.html',
      controller: 'questionController'
    })
});