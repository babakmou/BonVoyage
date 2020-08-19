var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('login', { message: "", title: 'Planificateur du voyage' });
});

module.exports = router;
