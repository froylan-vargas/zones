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
                    sequelize.getQueryInterface(), // queryInterface
                    sequelize.constructor, // DataTypes
                ],
                path: path.join(__dirname, 'migrations'),
                pattern: process.env && process.env.NODE_ENV === 'development' ? /\.ts$/ : /\.js$/
            },
            storage: 'sequelize',
            storageOptions: {
                sequelize
            }
        });
        const pendingMigrations = await umzug.pending();
        if (pendingMigrations.length){
            umzug.up(['schema.ts','init.data.ts']);
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