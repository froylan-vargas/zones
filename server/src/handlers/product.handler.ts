import Product from '../models/product.model';
import { sequelize } from '../config/database';

export const preTransformCurrentProducts = (currentProducts: Product[]) => {
    return currentProducts.map((product: Product) => {
        let transformedProduct = new Product();
        transformedProduct.id = product.id;
        transformedProduct.categoryId = product.categoryId;
        transformedProduct.name = product.name;
        transformedProduct.price = product.price;
        transformedProduct.images = product.images;
        transformedProduct.createdAt = product.createdAt;
        transformedProduct.updatedAt = product.updatedAt;
        transformedProduct.isActive = product.isActive;
        return transformedProduct;
    });
}

export const productsToTemplateFormat = (currentProducts: Product[]) => {
    return currentProducts.map((product) => {
        const transformedProduct = {
            name: product.name,
            description: product.description,
            price: product.price,
            images: product.images,
            isActive: product.isActive,
        };
        return transformedProduct;
    });
}

export const createTemplateData = (transformedProducts:any) => {
    let templateData = [
        ['name', 'description', 'price', 'images', 'isActive']
    ]
    transformedProducts.forEach((transformedProduct:any) => {
        templateData.push(Object.values(transformedProduct));
    });
    return templateData;
}

export const getProducts = async () => {
    try {
        return await Product.findAll({
            order: [
                ['isActive', 'DESC'],
                ['priority', 'DESC']
            ]
        });
    } catch (err) {
    }
}

export const getProductsByCategoryId = async (categoryId: string) => {
    try {
        const products: Product[] = await Product.findAll({
            where: {
                categoryId
            }
        })
        return products
    } catch (err) {
    }
}

export const createProduct = async (product: Product, transaction: any) => {
    let newProduct = new Product();
    newProduct.categoryId = product.categoryId;
    newProduct.name = product.name;
    newProduct.description = product.description;
    newProduct.priority = product.priority;
    newProduct.price = product.price;
    newProduct.isActive = product.isActive;
    newProduct.images = product.images;
    newProduct.createdAt = new Date(Date.now());
    newProduct.updatedAt = new Date(Date.now());
    console.log('new product', newProduct);
    return Product.create(product, {
        fields: ['categoryId', 'name', 'images', 'description', 'price', 'createdAt', 'updatedAt', 'isActive'],
        transaction
    })
}

export const batchUpload = async (productsToUpload: Product[], availableProducts: any[any], categoryId: number) => {
    try {
        await sequelize.transaction(async (t) => {
            const promises: any = [];
            productsToUpload.forEach(async (productToUpload: Product) => {
                productToUpload.categoryId = categoryId;
                const availableProduct: Product = availableProducts[productToUpload.name.toLocaleLowerCase()];
                let promise = null;
                if (!availableProduct) {
                    promise = createProduct(productToUpload, t);
                } else {
                    productToUpload.updatedAt = new Date(Date.now());
                    promise = Product.update(productToUpload, {
                        where: { id: availableProduct.id! },
                        transaction: t
                    })
                }
                promises.push(promise);
            });
            return Promise.all(promises)
        })
    } catch (err) {
        throw new Error(err);
    }
}