import { QueryInterface } from "sequelize";
import {configurationTable} from '../../../db/tables/configuration.table';

const up = async (query: QueryInterface) => {
  Promise.all([
    query.createTable(configurationTable.name,configurationTable.definition),
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
