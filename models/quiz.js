//Modelo de tabla de "quiz"
module.exports = function(sequelize,DataTypes){
	return sequelize.define(
		'Quiz',
		{	
			pregunta: {
			 type: DataTypes.STRING,
			 validate: {notEmpty: {msg: "Llenar el campo PREGUNTA."}}
			},
			respuesta: {
			 type: DataTypes.STRING,
			 validate: {notEmpty: {msg: "Llenar el campo RESPUESTA."}}
			}
		}
	);
}