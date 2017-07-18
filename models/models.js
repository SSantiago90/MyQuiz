var path = require('path');

//definir local/dev enviroment y corresp. DB
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name = (url[6] || null);
var user = (url[2] || null);
var pwd = (url[3] || null);
var protocol = (url[1] || null);
var dialect = (url[1] || null);
var port = (url[5] || null);
var host = (url[4] || null);
var storage= process.env.DATABASE_STORAGE;

//carga de ORM y preconfig de BBDD
var Sequelize = require('sequelize');
var sequelize = new Sequelize(DB_name, user, pwd, 
				{ dialect:  dialect,
				  protocol: protocol, 
				  port: 	port,
				  host: 	host,
				  storage:  storage, //solo SQLITE (.env)
				  omitNull: true 	 //solo PG
				}
);

//importar y exportar estructura modelo de tabla de /models
var Quiz = sequelize.import(path.join(__dirname,'quiz'));

exports.Quiz = Quiz;

//Inicializar BBDD
sequelize.sync().then(function(){
	Quiz.count().then(function(count){
		//init ONLY if DDBB is empty
		if (count === 0){
			//use ONLY lowercase for answers
			// work with promises -- .success() is deprecated
			Quiz.create({
				pregunta: 'Capital de España',
				respuesta: 'madrid'
			});			
			Quiz.create({
				pregunta: 'Capital de Italia',
				respuesta: 'roma'
			});
			Quiz.create({
				pregunta: 'Capital de Argentina',
				respuesta: 'buenos aires'
			}).then(function(){console.log('DB initialized with '+ DB_name)});		
		}
		else console.log('DB synced correctly with '+ (DB_name? DB_name : 'sqlite'));
	});		
});

