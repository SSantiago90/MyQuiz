exports.question = function(req,res){
	res.render('quizes/question',{pregunta: 'Capital de Argentina.'})
};

exports.answer = function(req,res){
	if (req.query.respuesta.toLowerCase() === 'buenos aires'){
		res.render('quizes/answer',{respuesta: "Correcto!"});
	} else{
		res.render('quizes/answer',{respuesta: "Inorrecto :("})
	}
};