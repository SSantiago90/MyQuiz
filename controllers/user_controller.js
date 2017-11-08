var models = require('../models/models.js');

var users = {admin: {id:1,username:'admin',password:'admin'},
			anon: {id:0,username:'Anonymous',password:''}
	};

exports.auth = function(user,pass){
	return checkedAuth = new Promise(function(resolve,reject){
		if (users[user]){	
			if(pass == users[user].password){
				resolve(users[user]);
			}
			else reject(new Error('Contraseña incorrecta.'));
		}
		else reject(new Error('Usuario no registrado.'));
	});
};
