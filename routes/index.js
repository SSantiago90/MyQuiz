var express = require('express');
var router = express.Router();
var quizController = require('../controllers/quiz_controller.js');
var commentController = require('../controllers/comment_controller.js');
var sessionController = require('../controllers/session_controller.js');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'MyQuiz' });
});
router.param('quizId', quizController.load);
router.param('commentId', commentController.load);
//Quizes routes
router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', 		quizController.question);
router.get('/quizes/:quizId(\\d+)/answer',  quizController.answer);
router.get('/quizes/new', 					sessionController.loginReq, quizController.new);
router.post('/quizes/create', 				sessionController.loginReq, quizController.create);
router.get('/quizes/:quizId(\\d+)/edit', 	sessionController.loginReq, quizController.edit);
router.put('/quizes/:quizId(\\d+)', 		sessionController.loginReq, quizController.update);
router.delete('/quizes/:quizId(\\d+)', 		sessionController.loginReq, quizController.delete);
//Comments routes
router.get('/quizes/:quizId(\\d+)/comments/new', 			commentController.new);
router.post('/quizes/:quizId(\\d+)/comments',		commentController.create);
router.put('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)', sessionController.loginReq, commentController.publish);
//Session routes
router.get('/login',				sessionController.new);
router.post('/login',				sessionController.create);
router.delete('/login',				sessionController.destroy);
router.get('/help', (req,res) =>{
  res.redirect('https://es.wikipedia.org/wiki/Quizz');
});

module.exports = router;
