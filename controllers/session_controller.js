var models = require('../models/models.js');
var userController= require('./user_controller');

//GET /login
exports.new = function(req,res,next){
	var errors = req.session.errors || {};
	req.session.errors = {};
	res.render('sessions/new',{errors: errors});
}; 
//POST /login
exports.create = function(req,res,next){
	var user = req.body.user || '';
	var password = req.body.password || '';

	userController.auth(user,password)
	.then(function(user){
		req.session.user = {
			id: user.id, 
			username:user.username
		};
		res.redirect(req.session.redir.toString());
	}).catch(function(err){		
		res.render('sessions/new',{
			errors: [
				{'message': err},
				{'message': 'Intenta nuevamente'}
			]
		});
		return;
	});
};
//DELETE /login 
exports.destroy = function(req,res,next){
	const redir = req.session.redir.toString();
	req.session.destroy();
	res.redirect(redir);
};

//required Login MW
exports.loginReq = (req,res,next) =>{
	if(req.session.user) next();	
	else res.redirect('/login');

}