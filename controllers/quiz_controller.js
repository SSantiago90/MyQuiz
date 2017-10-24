var models = require('../models/models.js');
//router PARAMS Autoload MW
exports.load = function(req,res,next,quizId){
	models.Quiz.findOne({
		where: {id: Number(quizId)},
		include: [{model:models.Comment}]
	}).then(function(quiz){
		if (quiz){
			req.quiz = quiz;
			next();
		} else {
			next (new Error('No existe el quiz con el ID solicitado: '+quizId));
		}
	}).catch(function(error) {next (error);});
};
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
	res.render('quizes/new', {quiz: tmp_quiz});
};
//POST create
exports.create = function(req,res){
	//doesn't seem to work with last sequelize version -- possible bodyparser bug?
	//var quiz = models.Quiz.build(req.body.quiz);z
	var quiz = models.Quiz.build(req.body.quiz);

	quiz
	.validate()
	.then(function(){
			quiz.save({fields: ['pregunta','respuesta']});
			res.redirect('/quizes');
		}
	)	
	.catch(function(err) { 
		console.log("Error guardando la pregunta");
		res.render('quizes/new', {quiz:quiz, errors:err.errors});	
	});
}

//GET quizes/:quizId/edit
exports.edit = function(req,res){
	var quiz = req.quiz;
	res.render('quizes/edit', {quiz:quiz});	
}


//PUT quizes/:quizId
exports.update = function(req,res){
	req.quiz.pregunta = req.body.quiz.pregunta;
	req.quiz.respuesta = req.body.quiz.respuesta;
	req.quiz
	.validate()
	.then(function(){
			req.quiz.save({fields: ['pregunta','respuesta']});
			res.redirect('/quizes');
		}
	)	
	.catch(function(err) { 
		console.log('Error guardando cambios');
		res.render('quizes/edit', {quiz:req.quiz, errors:err.errors});	
	});
};

//DEL quizes/quizId
exports.delete = function(req,res){
	req.quiz.destroy()
	.then(function(){			
			res.redirect('/quizes');
		}
	)	
	.catch(function(err) { next(error)});
};
