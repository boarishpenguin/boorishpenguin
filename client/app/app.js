angular.module('boorishpenguin', [
  'boorish.services',
  'boorish.ask',
  'boorish.questions',
  'boorish.answers',
  'ngRoute'
  ])

.config(function ($routeProvider) {
  $routeProvider
    .when('/ask', {
      templateUrl: 'app/ask/ask.html',
      controller: 'askController'
    })
    .when('/questions', {
      templateUrl: 'app/questions/questions.html'
    })
    .when('/questions/:id', {
      templateUrl: 'app/answers/answers.html'
    })
    .otherwise({
      routeTo: 'app/index.html'
    })
});