const Sequelize = require('sequelize')
const { sequelize } = require('../config/database')

const FbLogin = sequelize.define('fblogins', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fbid: { type: Sequelize.STRING },
    userid: { type: Sequelize.INTEGER },
    accesstoken: { type: Sequelize.STRING },
    picture: { type: Sequelize.STRING }
}, {
    timestamps: false
})

module.exports = FbLogin