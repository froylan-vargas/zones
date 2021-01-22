import { QueryInterface } from 'sequelize';
import { categoryQueries } from '../../db/data/category.data';
import { configurationQueries } from '../../db/data/configuration.data';

const up = async (query: QueryInterface) => {
    Promise.all(categoryQueries);
    Promise.all(configurationQueries);
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
