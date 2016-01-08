var db = require('../db/index.js');

module.exports = {
  newAnswer: function(req, res) {
    var txt = req.body.text;
    var uname = req.body.person;
    var qid = req.body.id_Question;
    
    db.User.findOne({
      where: {
        username: uname,
      }
    })
    .then(function(user) {
      db.Answer.create({
        text: txt,
        UserId: user.get('id'),
        QuestionId: qid;
      })
      .then(function() {
        return user.update({
          points: user.get('points') + 1
        })
      })
      .then(function() {
        res.sendStatus(201);
      });
    });
  },

  // TODO: 'good' needs admin auth; answered needs 
  modAnswer: function(req, res) {
    var aid = req.params.id;
    var mod = req.body.mod;

    db.Answer.findOne({
      where: {
        id: aid
      }
    })
    .then(function(answer) {
      var uid = answer.get('UserId');

      db.User.findOne({
        where: {
          id: uid
        }
      })
      .then(function(user) {
        if (mod === 'good') {
          // DO YOUR ADMIN AUTH CHECK AROUND THIS PROMISE CHAIN
          answer.update({
            isGood: !answer.get('isGood')
          })
          .then(function(user) {
            if (answer.get('isGood')) {
              return user.update({
                points: user.get('points') + 1
              })
            } else {
              return user.update({
                points: user.get('points') - 1
              })
            }
          })
          .then(function() {
            res.sendStatus(201);
          });
          // END OF CHAIN
        } else if (mod === 'like') {
          answer.update({
            points: answer.get('points') + 1
          })
          .then(function(user) {
            return user.update({
              points: user.get('points') + 1
            })
          })
          .then(function() {
            res.sendStatus(201);
          })
        }
      });
    });
  },

  // TODO: auth/same-user check 
  deleteAnswer: function(req, res) {
    var aid = req.body.id_Answer;

    db.Answer.destroy({
      where: {
        id: aid
      }
    })
    .then(function(id) {
      if (id) {
        res.sendStatus(204);
      }
    })
  }
};
