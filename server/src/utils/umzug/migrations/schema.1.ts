import { QueryInterface } from "sequelize";
import {categoryTable} from '../../../db/tables/category.table';
import {productTable} from '../../../db/tables/product.table';

const up = async (query: QueryInterface) => {
  Promise.all([
    query.createTable(categoryTable.name,categoryTable.definition),
    query.createTable(productTable.name,productTable.definition) 
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
