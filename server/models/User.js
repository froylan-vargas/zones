const Sequelize = require('sequelize')
const { sequelize } = require('../config/database')

const FbLogin = require('./FbLogin')

const User = sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: { type: Sequelize.TEXT },
    email: { type: Sequelize.TEXT },
    isfbuser: { type: Sequelize.BOOLEAN },
    joined: { type: Sequelize.DATE }
}, {
    timestamps: false
})

User.hasOne(FbLogin, {
    foreignKey: 'userid',
    sourceKey: 'id'
})

FbLogin.belongsTo(User, {
    foreignKey: 'userid',
    sourceKey: 'id'
})

module.exports = User