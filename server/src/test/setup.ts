process.env.PG_USER = 'fvargas';
process.env.PG_HOST = 'localhost';
process.env.PG_DATABASE = 'zones-test';
process.env.PG_PASSWORD = '';
process.env.PG_PORT = '5432';
import { sequelize } from '../config/database';
import Product from '../models/product.model';

beforeAll(async () => {
    try {
        sequelize.options.logging = false;
        await sequelize.authenticate();
    } catch (err) {
        console.log(err);
    }
});

beforeEach(async () => {
    await Product.destroy({ where: {} });
});

afterAll(async () => { 
    await sequelize.close();
});