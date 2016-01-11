var db = require('../db/index.js');
var UCtrl = require('./userControllers.js');

module.exports = {
  newAnswer: function(req, res) {
    var txt = req.body.text;
    var reqName = req.user.profile.emails[0].value;
    var qid = req.body.id_question;

    db.Post.findById(qid)
    .then(function(question) {
      if (!question.isClosed) {
        question.update({
          responses: question.responses + 1
        })
        .then(function() {
          return db.User.findOne({
            where: {
              username: reqName,
            }
          })
        })
        .then(function(user) {
          db.Post.create({
            text: txt,
            isAnAnswer: true,
            UserId: user.id,
            QuestionId: qid,
            CourseId: question.CourseId,
            TagId: question.TagId
          })
          .then(function(answer) {
            user.update({
              points: user.points + 1
            })
            .then(function() {
              res.status(201).json(answer);
            });
          });
        });
      } else {
        res.sendStatus(404);
      }
    });
  },

  modAnswer: function(req, res) {
    var aid = req.params.id;
    var mod = req.body.mod;
    var reqName = req.user.profile.emails[0].value;

    db.Post.findById(aid)
    .then(function(answer) {
      var uid = answer.UserId;

      db.User.findById(uid)
      .then(function(user) {
        if (mod === 'good' && UCtrl.isUserTeacher(reqName)) {
          answer.update({
            isGood: !answer.isGood
          })
          .then(function(answer) {
            if (answer.isGood) {
              return user.update({
                points: user.points + 1
              })
            } else {
              return user.update({
                points: user.points - 1
              })
            }
          })
          .then(function() {
            res.status(201).json(answer);
          });
        } else if (mod === 'like') {
          answer.getVote({where: ['UserId='+user.id+' AND PostId='+answer.id]})
          .then(function(result) {
            if (!result.length) {
              return answer.addVote(user)
              .then(function() {
                return answer.update({
                  points: answer.points + 1
                });
              })
              .then(function(answer) {
                return user.update({
                  points: user.points + 1
                });
              });
            } else {
              return answer.removeVote(user)
              .then(function() {
                return answer.update({
                  points: answer.points - 1
                });
              })
              .then(function(answer) {
                return user.update({
                  points: user.points - 1
                });
              });
            }
          })
          .then(function() {
            res.status(201).json(answer);
          });
        } else {
          res.sendStatus(404);
        }
      });
    });
  },

  deleteAnswer: function(req, res) {
    var aid = req.body.id_answer;
    var reqName = req.user.profile.emails[0].value;

    db.Post.findById(aid)
    .then(function(answer) {
      var uid = answer.UserId;

      db.User.findById(uid)
      .then(function(user) {
        var authorname = user.username;

        if (reqName === authorname || UCtrl.isUserTeacher(reqName)) {
          var qid = answer.QuestionId;

          db.Post.findById(qid)
          .then(function(question) {
            return question.update({
              responses: question.responses - 1
            })
          })
          .then(function() {
            return user.update({
              points: user.points - 1
            });
          })
          .then(function() {
            return answer.destroy()
            .then(function() {
              res.sendStatus(204);
            });
          });
        } else {
          res.sendStatus(404);
        }
      });
    });
  }
};
