angular.module('boorish.services', [])

.factory('Questions', function($http, $location) {
  return {
    // add a question from /ask
    addQuestion: function(question) {

      return $http({
        method: 'POST',
        url: '/townhall/questions',
        data: JSON.stringify({
          text: question.text,
          id_user: question.userId,
          course: question.course,  // these are not setup yet
          tag: question.tag,  // these are not setup yet
          title: question.title
        })
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

    getQuestion: function(path) { // TODO: Ask Steven about how to send this GET
      return $http({
        method: 'GET',
        url: '/townhall' + path
      })
      .then(function(res) {
        return res;
      })
    },

    updateQuestion: function(id, mod) {
      // code to update a question when there is a new like or has been marked as answered
      return $http({
        method: 'POST',
        url: 'townhall/questions/' + id,
        data: { mod: mod }
      })
    },

    removeQuestion: function(questionID) {
      // code to remove a question by the user who posted it or isAdmin
      return $http({
        method: 'DELETE',
        url: 'townhall/questions/' + questionID
      })
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

    addAnswer: function(answer, questionID) {

      return $http({
        method: 'POST',
        url: 'townhall/answers',
        data: JSON.stringify({
          text: answer.text,
          id_question: questionID,
          id_user: answer.user
        })
      })
    },

    updateAnswer: function(answerID, mod) {
      return $http({
        method: 'POST',
        url: 'townhall/answers/' + answerID,
        data: JSON.stringify({
          id_answer: answerID,
          mod: mod
        })
      })
    },

    removeAnswer: function(answerID) {
      return $http({
        method: 'DELETE',
        url: 'townhall/answers/' + answerID
      })
    }

  }
})

.factory('Users', function($http, $window){
    var allUsers = function(){
      return $http({
        method: 'GET',
        url: '/townhall/users'
      })
      .then(function(res){
        return res.data;
      });
    };


    var getUserWithId = function() {
      var userID = $window.localStorage.getItem('com.boorish');
      return $http({
        method: 'GET',
        url: '/townhall/users/' + userID
      }).then(function(res) {
        return res.data.results.id;
      })
    };

    var addUser = function(user){
      return $http({
        method: 'POST',
        url: '/townhall/users',
        data: JSON.stringify({
          username: user.username,
          password: user.password,
          name: user.name,
          isTeacher: user.isTeacher,
          points: 0,
          email: user.email,
          picture: user.picture
        })
      })
    };

    return {
      allUsers: allUsers,
      getUserWithId: getUserWithId,
      addOne: addUser
    }

  })

.factory('Tags', function($http) {
  return {
    getTags: function() {
      return $http({
        method: 'GET',
        url: '/townhall/tags'
      })
      .then(function(res) {
        return res.data;
      });
    }
  };
})

.factory('Courses', function($http) {
  return {
    getCourses: function() {
      return $http({
        method: 'GET',
        url: '/townhall/courses'

      })
      .then(function(res) {
        return res.data;
      });
    }
  };
})

.factory('Auth', function ($http, $location, $window) {
  var user = {};

  return {
    setUser: function () {
      return $http({
        method: 'GET',
        url: '/user'
      })
      .then(function (res) {
        user.google = res.data.email || res.data.profile.emails[0].value;

        return $http({
          method: 'GET',
          url: '/townhall/users'
        })
        .then(function(res) {
          var users = res.data.results;
          var isUser = false;
          for (var i = 0; i < users.length; i++) {
            if (users[i].email === user.google) {
              isUser = true;
              user.id = users[i].id;
            }
          }
          if (isUser) {
            $window.localStorage.setItem('com.boorish', user.id);
          } else {
            $location.path('/signin');
          }
        })
      });
  },

  isAuth: function () {
    return !!$window.localStorage.getItem('com.boorish');
  },

  signout: function () {
    $window.localStorage.removeItem('com.boorish');
    $location.path('/signin');
  }
}

});
