import Umzug from 'umzug';

import { sequelize } from '../../config/database';
import { transformArrayToObject } from '../array';

const migrate = async (version:number, path:string) => {
    
    const umzug = new Umzug({
        migrations: {
            params: [
                sequelize.getQueryInterface(),
                sequelize.constructor,
            ],
            path,
            pattern: process.env && process.env.NODE_ENV === 'production' ? /\.js$/ : /\.ts$/
        },
        storage: 'sequelize',
        storageOptions: {
            sequelize
        }
    });
    
    const ext = process.env.NODE_ENV === 'production' ? 'js' : 'ts';
    const schemaName = `schema.${version}.${ext}`;
    const dataName = `init.data.${version}.${ext}`;
    const executedMigrations = await umzug.executed();
    let migrations = [];
    if (executedMigrations.length) {
        migrations = transformArrayToObject(executedMigrations, 'file');
        if (migrations[schemaName]) await umzug.down(schemaName);
        if (migrations[dataName]) await umzug.down(dataName);
    }
    await umzug.up([schemaName, dataName]);
}

export {migrate};