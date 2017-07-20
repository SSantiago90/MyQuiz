var models = require('../models/models.js');
//router PARAMS Autoload MW
exports.load = function(req,res,next, quizId){
	models.Quiz.find(quizId).then(function(quiz){
		if (quiz){
			req.quiz = quiz;
			next();
		} else {
			next (new Error('No existe el quiz con el ID solicitado: '+quizId));
		}
	}).catch(function(error) {next (error);});
}
//GET questions
exports.index = function(req,res){
	models.Quiz.findAll().then(function(quizes){
		res.render('quizes/index', {quizes: quizes});
	});
};
//GET quiz
exports.question = function(req,res){
	res.render('quizes/question', {quiz: req.quiz});	
};
//GET answer
exports.answer = function(req,res){
	var usrResp = req.query.respuesta.toLowerCase();
	if (usrResp === req.quiz.respuesta){
		res.render('quizes/answer',{respuesta: "Correcto!", quiz: req.quiz, respUsuario: usrResp});
		} 
	else{
		res.render('quizes/answer',{respuesta: "Inorrecto", quiz: req.quiz, respUsuario: usrResp});
		}
};	
//GET new
exports.new = function(req,res){
	var tmp_quiz = models.Quiz.build(
		{pregunta:'ingresar pregunta',respuesta:'ingresar respuesta'}
	);
	res.render('quizes/new',{quiz: tmp_quiz});
};
//POST create
exports.create = function(req,res){
	var quiz = models.Quiz.build(req.body.quiz);
	//save and then redirect
	quiz.save({fields: ['pregunta','respuesta']})
	.then(function(){
		res.redirect('/quizes');
	});
}