var path = require('path');

//carga de ORM y preconfig de BBDD
var Sequelize = require ('sequelize');
var sequelize = new Sequelize(null,null,null,{dialect:'sqlite',storage:'quiz.sqlite'});

//importar y exportar estructura modelo de tabla
var Quiz = sequelize.import(path.join(__dirname,'quiz'));
exports.Quiz = Quiz;

//Inicializar BBDD
sequelize.sync().success(function(){
	Quiz.count().succes(function(count){
		Quiz.create({
			pregunta: 'Capital de Argentina',
			respuesta: 'Buenos Aires'
		}).succes(function(){console.log('DB incializada correctamente')});
		}
	});
});

