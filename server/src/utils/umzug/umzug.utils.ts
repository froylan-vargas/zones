import Umzug from 'umzug';
import path from 'path';

import { sequelize } from '../../config/database';
import { transformArrayToObject } from '../array';

const umzug = new Umzug({
    migrations: {
        params: [
            sequelize.getQueryInterface(),
            sequelize.constructor,
        ],
        path: path.join(__dirname,'migrations'),
        pattern: process.env && process.env.NODE_ENV === 'development' ? /\.ts$/ : /\.js$/
    },
    storage: 'sequelize',
    storageOptions: {
        sequelize
    }
});

const migrate = async () => {
    const ext = process.env.NODE_ENV === 'development' ? 'ts' : 'js';
    const version = 2;
    const schemaName = `schema.${version}.${ext}`;
    const dataName = `init.data.${version}.${ext}`;
    const executedMigrations = await umzug.executed();
    let migrations = [];
    if (executedMigrations.length) {
        migrations = transformArrayToObject(executedMigrations, 'file');
        if (migrations[schemaName]) umzug.down(schemaName);
        if (migrations[dataName]) umzug.down(dataName);
    }
    umzug.up([schemaName, dataName]);
}

export {migrate};