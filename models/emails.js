const Sequelize = require('sequelize');

module.exports = class Emails extends Sequelize.Model{
    static init(sequelize){
        return super.init({
						email: {
                            type: Sequelize.STRING(20),
                        },
                        password: {
                            type: Sequelize.STRING(1000),
                        },


		}, {
            sequelize,
            timestamps: false,
            modelName: 'Emails',
            tableName: 'emails',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }
    static associate(db){
        
    }
};