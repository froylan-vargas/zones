import { Model, Table, AutoIncrement, PrimaryKey, Column, AllowNull, NotEmpty } from 'sequelize-typescript';

export interface IProduct {
    id?: number | null;
    name: string;
}

@Table(
    {
        tableName: 'product',
        timestamps: true
    }
)

export default class Product extends Model implements IProduct {
    @AutoIncrement
    @PrimaryKey
    @Column
    id?: number

    @AllowNull(false)
    @NotEmpty
    @Column
    name!: string;
}