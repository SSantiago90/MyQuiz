//Modelo de tabla de "comments"
module.exports = function(sequelize,DataTypes){
	return sequelize.define(
		'Comment',
		{	
			texto: {
			 type: DataTypes.STRING,
			 validate: {notEmpty: {msg: "Comentario invalido: comentario vacío."}}
			}
			//usuario: {
			 //type: DataTypes.STRING,
			// validate: {notEmpty: {msg: "Error de usuario: usuario no autenticado"}}
			//}
		}
	);
}