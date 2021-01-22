import { sequelize } from '../../../config/database';
import { migrate } from '../../../utils/umzug/umzug.utils';
import path from 'path';

import request from 'supertest';
import { app } from '../../../app';

it('application health is returned', async () => {

    /* const migrationsPath = path.join(__dirname,'../../../test/init');
    console.log(migrationsPath);
    await sequelize.authenticate();
    await migrate(1, migrationsPath); */

    const response = await request(app)
        .get('/status')
        .send()
        .expect(201)
    expect(response.body.status).toEqual('healthy');
});