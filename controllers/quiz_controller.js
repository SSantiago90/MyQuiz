var models = require('../models/models.js');
//GET questions
exports.index = function(req,res){
	models.Quiz.findAll().then(function(quizes){
		res.render('quizes/index', {quizes: quizes});
	});
};

//GET quiz
exports.question = function(req,res){
	models.Quiz.find(req.params.quizId).then(function(quiz){
		res.render('quizes/question', {quiz: quiz})
	});
};
//GET answer
exports.answer = function(req,res){
	models.Quiz.find(req.params.quizId).then(function(quiz){
		var usrResp = req.query.respuesta.toLowerCase();
		if (usrResp === quiz.respuesta){
			res.render('quizes/answer',{respuesta: "Correcto!", quiz: quiz, respUsuario: usrResp});
			} 
		else{
			res.render('quizes/answer',{respuesta: "Inorrecto", quiz: quiz, respUsuario: usrResp});
			}
		});	
};