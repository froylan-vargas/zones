import { QueryInterface } from 'sequelize';
import { categoryQueries } from '../../../db/data/category.data';

const up = async (query: QueryInterface) => {
    Promise.all(categoryQueries);
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
