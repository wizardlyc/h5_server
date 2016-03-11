var express = require('express');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var game = req.query.game;

  if(!game) {
    game = 'default';
  }
  console.log("enter game: "+ game);
  res.render(game, { title: game} );
});

module.exports = router;
