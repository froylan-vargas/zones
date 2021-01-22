import { sequelize } from './config/database';
import { migrate } from './utils/umzug/umzug.utils';

import { app } from './app';

const start = async () => {
    try {
        await sequelize.authenticate();
        //await migrate();
        const PORT = process.env.PORT || 5000
        app.listen(PORT, () => {
            console.log(`App listening on port:${PORT}`)
        })
    } catch (err) {
        console.log(err);
    }
}

start();