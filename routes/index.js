var express = require('express');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var game = req.query.game;
  console.log("enter game: "+ game);
  if(!game) {
    game = 'test_ui';
  }
  res.render(game, { title: game} );
});

module.exports = router;
