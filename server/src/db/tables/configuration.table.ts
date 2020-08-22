import sequelize from 'sequelize'

const configurationTable = {
    name: 'configuration',
    definition: {
        id: {
            type: sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: sequelize.STRING,
            allowNull: false,
            unique: true
        },
        value:{
            type:sequelize.STRING,
            allowNull: false
        },
        isActive: {
            type: sequelize.BOOLEAN,
            allowNull: false,
        },
        createdAt: {
            type: sequelize.DataTypes.DATE,
            allowNull: false
        },
        updatedAt: {
            type: sequelize.DataTypes.DATE,
            allowNull: false
        }
    }
}


export { configurationTable };