const Sequelize = require('sequelize');

module.exports = class Student extends Sequelize.Model{
    static init(sequelize){
        return super.init({
						name: {
                            type: Sequelize.STRING(5),
                        },
                        number: {
                            type: Sequelize.INTEGER(10),
                        },


		}, {
            sequelize,
            timestamps: false,
            modelName: 'Student',
            tableName: 'students',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }
    static associate(db){
        
    }
};