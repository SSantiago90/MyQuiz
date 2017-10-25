var models = require('../models/models.js');

//GET comments/new 
exports.new = function(req,res,next){
	res.render('comments/new.ejs', {quizid: req.params.quizId});
};

//POST comment
exports.create = function (req,res,next){
	var comment = models.Comment.build({
		texto: req.body.comment.text,
		QuizId: req.params.quizId
	});

	comment
	.validate()
	.then(function(){
			comment.save({fields: ['QuizId','texto']});
			res.redirect('/quizes/'+req.params.quizId);
		}
	)
	.catch(function(err,next) { 
		console.log("Error guardando el comentario");
		res.render('/quizes/'+req.params.quizId, {errors:err.errors});	
	});
}


