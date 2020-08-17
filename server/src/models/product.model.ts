import { Model, Table, AutoIncrement, PrimaryKey, Column, AllowNull, NotEmpty, DataType, Default, Unique, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Category from './category.model';

export interface IProduct {
    id?: number | null;
    categoryId: number;
    category: Category;
    name: string;
    description: string;
    priority: number;
    price: number;
    images: string;
    isActive: boolean;
}

@Table(
    {
        tableName: 'product',
        timestamps: true
    }
)

class Product extends Model<Product> implements IProduct {
    @AutoIncrement
    @PrimaryKey
    @Column
    id?: number

    @ForeignKey(() => Category)
    @AllowNull(false)
    @NotEmpty
    @Column
    categoryId!: number;

    @BelongsTo(() => Category)
    category!: Category;

    @Unique
    @AllowNull(false)
    @NotEmpty
    @Column
    name!: string;

    @AllowNull(false)
    @NotEmpty
    @Column
    description!: string;

    @AllowNull(false)
    @Default(0)
    @Column
    priority!: number;

    @AllowNull(false)
    @NotEmpty
    @Column(DataType.FLOAT)
    price!: number;

    @AllowNull(true)
    @Column
    images!: string;

    @AllowNull(false)
    @NotEmpty
    @Column
    isActive!: boolean;
}

export default Product;