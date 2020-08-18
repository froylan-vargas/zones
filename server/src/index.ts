import express from 'express';
import cors from 'cors';
import Umzug from 'umzug';
import path from 'path';

import router from './routes/index';
import { sequelize } from './config/database';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(router);

const start = async () => {
    try {
        await sequelize.authenticate();
        const umzug = new Umzug({
            migrations: {
                params: [
                    sequelize.getQueryInterface(),
                    sequelize.constructor,
                ],
                path: path.join(__dirname, 'migrations'),
                pattern: process.env && process.env.NODE_ENV === 'development' ? /\.ts$/ : /\.js$/
            },
            storage: 'sequelize',
            storageOptions: {
                sequelize
            }
        });

        const ext = process.env.NODE_ENV === 'development' ? '.ts' : '.js';
        const schemaName = `schema${ext}`;
        const dataName = `init.data${ext}`;
        const pendingMigrations = await umzug.pending();
        if (pendingMigrations.length){
            umzug.up([schemaName,dataName]);
        }
        const PORT = process.env.PORT || 5000
        app.listen(PORT, () => {
            console.log(`App listening on port:${PORT}`)
        })
    } catch (err) {
        console.log(err);
    }
}

start();