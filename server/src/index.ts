import express from 'express';
import cors from 'cors';

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
        await sequelize.sync({force:true});
        const PORT = process.env.PORT || 5000
        app.listen(PORT, () => {
            console.log(`App listening on port:${PORT}`)
        })
    } catch (err) {
        console.log('user',process.env.PG_USER)
        console.log('new error');
        console.log(err);
    }
}

start();