import { QueryInterface } from "sequelize";
import { categoryTable } from '../../db/tables/category.table';
import { productTable } from '../../db/tables/product.table';
import { configurationTable } from '../../db/tables/configuration.table';

const up = async (query: QueryInterface) => {
    Promise.all([
        query.createTable(categoryTable.name, categoryTable.definition),
        query.createTable(productTable.name, productTable.definition),
        query.createTable(configurationTable.name, configurationTable.definition),
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
