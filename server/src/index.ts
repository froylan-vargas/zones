import express from 'express';
import cors from 'cors';

import router from './routes/index';
import { sequelize } from './config/database';
import {migrate} from './utils/umzug/umzug.utils';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(router);

const start = async () => {
    try {
        await sequelize.authenticate();
        await migrate();
        const PORT = process.env.PORT || 5000
        app.listen(PORT, () => {
            console.log(`App listening on port:${PORT}`)
        })
    } catch (err) {
        console.log(err);
    }
}

start();