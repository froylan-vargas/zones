import { QueryInterface } from 'sequelize';
import { configurationQueries } from '../../../db/data/configuration.data';

const up = async (query: QueryInterface) => {
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
