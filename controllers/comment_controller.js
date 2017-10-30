var models = require('../models/models.js');

//AUTOLOAD comment
exports.load = function(req,res,next,commentId){
	models.Comment.findOne({
		where: {id: Number(commentId)}		
		//include: [{model:models.User}] ¿?¿?¿?¿?¿
	}).then(function(comment){
		if (comment){
			req.comment = comment;
			next();
		} else {
			next (new Error('No existe el comentario con el ID solicitado: '+commentId));
		}
	}).catch(function(error) {next (error)});
};


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


//PUT /commentId?field=publish
exports.publish = function(req,res,next){
	const comment = req.comment;
	const field = req.body.publicado

	if(req.params.field = 'publicado'){
		comment.publicado = !(comment.publicado);
		comment.save({
			fields: ["publicado"]
		})
		.then(
			() => res.redirect('/quizes/'+req.params.quizId)
		)
		.catch(
			(error)=> next(error)
		);
	}
}