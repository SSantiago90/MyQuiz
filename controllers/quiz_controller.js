var models = require('../models/models.js');
//GET question
exports.question = function(req,res){
	models.Quiz.findAll().success(function(quiz){
	res.render('quizes/question',{pregunta: quiz[0].pregunta})
	});
};
//GET answer
exports.answer = function(req,res){
	models.Quiz.findAll().success(function(quiz){
		if (req.query.respuesta.toLowerCase() === quiz[0].respuesta){
			res.render('quizes/answer',{respuesta: "Correcto!"});
		} 
		else{
			console.log(quiz[0].respuesta);
			res.render('quizes/answer',{respuesta: "Inorrecto :("});
		}
	});	
};