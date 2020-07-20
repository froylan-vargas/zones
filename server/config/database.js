const keys = require('../config/keys');
const Sequelize = require('sequelize');

const opts = {
    define: {
        //prevent sequelize from pluralizing table names
        freezeTableName: true
    }
}
const sequelize = new Sequelize(`postgres://${keys.PGUSER}:${keys.PGPASSWORD}@${keys.PGHOST}:${keys.PGPORT}/${keys.PGDATABASE}`, opts);

module.exports = {
    sequelize
}
