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

export default class Category extends Model<Category> implements ICategory {
    @AutoIncrement
    @PrimaryKey
    @Column
    id?: number

    @AllowNull(false)
    @NotEmpty
    @Column
    name!: string;

    @AllowNull(false)
    @Column
    isActive!: boolean;
}
