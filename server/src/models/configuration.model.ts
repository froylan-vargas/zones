import {Model, Table, AutoIncrement, PrimaryKey, Column, AllowNull, NotEmpty, Unique } from 'sequelize-typescript';

export interface IConfiguration {
    id?: number | null;
    name: string;
    isActive: boolean;
}

@Table(
    {
        tableName: 'configuration',
        timestamps: true
    }
)

export default class Configuration extends Model<Configuration> implements IConfiguration {
    @AutoIncrement
    @PrimaryKey
    @Column
    id?: number

    @Unique
    @AllowNull(false)
    @NotEmpty
    @Column
    name!: string;

    @AllowNull(false)
    @NotEmpty
    @Column
    value!: string;

    @AllowNull(false)
    @Column
    isActive!: boolean;
}
