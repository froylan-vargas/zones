import keys from '../config/keys';
import { Sequelize } from 'sequelize-typescript';
import path from 'path';

const sequelize = new Sequelize(`postgres://${keys.PGUSER}:${keys.PGPASSWORD}@${keys.PGHOST}:${keys.PGPORT}/${keys.PGDATABASE}`, {
    models: [path.join(__dirname, '../models/')],
    dialect: 'postgres'
});
export {sequelize};
