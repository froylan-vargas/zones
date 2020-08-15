/* const Category = sequelize.define('category', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: { type: Sequelize.TEXT },
    createdon: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    isactive: { type: Sequelize.BOOLEAN }
}, { timestamps: false }); */

import {Model, Table, AutoIncrement, PrimaryKey, Column, AllowNull, NotEmpty } from 'sequelize-typescript';

export interface ICategory {
    id?: number | null;
    name: string;
    isActive: boolean;
}

@Table(
    {
        tableName: 'category',
        timestamps: true
    }
)

export default class Category extends Model implements ICategory {
    @AllowNull(false)
    @Column
    isActive!: boolean;
    
    @AutoIncrement
    @PrimaryKey
    @Column
    id?: number

    @AllowNull(false)
    @NotEmpty
    @Column
    name!: string;
}
