"use strict";
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Usuarios", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			nome: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			senha: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			email: {
				unique: true,
				allowNull: false,
				type: Sequelize.STRING,
			},
			nascimento: {
				type: Sequelize.DATE,
			},
			curso: {
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
		await queryInterface.dropTable("Usuarios");
	},
};
