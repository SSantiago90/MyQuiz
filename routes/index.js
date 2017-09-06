var express = require('express');
var router = express.Router();
var quizController = require('../controllers/quiz_controller.js');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'MyQuiz' });
});
router.param('quizId', quizController.load);

router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', 		quizController.question);
router.get('/quizes/:quizId(\\d+)/answer',  quizController.answer);
router.get('/quizes/new', 					quizController.new);
router.post('/quizes/create', 				quizController.create);
router.get('/quizes/:quizId(\\d+)/edit', 	quizController.edit);
router.put('/quizes/:quizId(\\d+)', 		quizController.update);
router.delete('/quizes/:quizId(\\d+)', 		quizController.delete);

router.get('/help', (req,res) =>{
  res.redirect('https://es.wikipedia.org/wiki/Quizz');
});

module.exports = router;
