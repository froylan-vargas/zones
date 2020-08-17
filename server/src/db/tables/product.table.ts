import sequelize from 'sequelize'

const productTable = {
  name: 'product',
  definition: {
    id: {
      type: sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    categoryId: {
      type: sequelize.INTEGER,
      references: {
        model: 'category',
        key: 'id'
      },
      allowNull: false
    },
    name: {
      type: sequelize.STRING,
      allowNull: false,
      unique: true
    },
    description: {
      type: sequelize.STRING,
      allowNull: false
    },
    priority: {
      type: sequelize.STRING,
      allowNull: false,
      defaultValue: 0
    },
    price: {
      type: sequelize.FLOAT,
      allowNull: false
    },
    images: {
      type: sequelize.STRING,
      allowNull: true
    },
    isActive: {
      type: sequelize.BOOLEAN,
      allowNull: false
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


export { productTable };