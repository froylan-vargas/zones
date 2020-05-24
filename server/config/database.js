const keys = require('../config/keys')
const Sequelize = require('sequelize')

module.exports = {
    sequelize : new Sequelize(`postgres://${keys.PGUSER}:${keys.PGPASSWORD}@${keys.PGHOST}:${keys.PGPORT}/${keys.PGDATABASE}`)
} 