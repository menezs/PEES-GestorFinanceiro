"use strict";
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Cursos", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			sigla: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			descricao: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			nome: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			areaId: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Cursos");
	},
};
