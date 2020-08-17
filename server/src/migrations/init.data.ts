import { QueryInterface } from 'sequelize';
import { categories } from '../db/data/category.data';

const up = async (query: QueryInterface) => {
    Promise.all([
        query.bulkDelete('category', {}, {}),
        query.bulkInsert('category', categories)
    ]);
};

const down = async (queryInterface: any) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
};

export {
    up,
    down
};
