"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Curso extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Curso.init(
		{
			sigla: {
				allowNull: false,
				type: DataTypes.STRING,
			},
			descricao: {
				allowNull: false,
				type: DataTypes.STRING,
			},
			nome: {
				allowNull: false,
				type: DataTypes.STRING,
			},
			areaId: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "Curso",
		}
	);
	return Curso;
};
