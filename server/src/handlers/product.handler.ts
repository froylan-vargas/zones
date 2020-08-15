import Product from '../models/product.model';
import { sequelize } from '../config/database';

export const preTransformCurrentProducts = (currentProducts:[]) => {
    return currentProducts.map((product:any) => {
        const transformedProduct = {
            id: product.id,
            categoryid: product.categoryid,
            name: product.name,
            price: product.price,
            images: product.images,
            createdOn: product.createdon,
            modifiedOn: product.modifiedon,
            isActive: product.isactive
        }
        return transformedProduct;
    });
}

export const productsToTemplateFormat = (currentProducts:[]) => {
    return currentProducts.map((product:any) => {
        return {
            name: product.name,
            price: product.price,
            description: product.description,
            isActive: product.isactive
        }
    });
}

export const createTemplateData = (transformedProducts:any) => {
    let templateData = [
        ['name', 'price', 'description', 'isactive']
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
                ['isactive', 'DESC'],
                ['priority', 'DESC']
            ]
        });
    } catch (err) {
    }
}

export const getProductsByCategoryId = async (categoryid:any) => {
    try {
        const products = await Product.findAll({
            where: {
                categoryid
            }
        })
        return products
    } catch (err) {
    }
}

export const createProduct = async (product:any, transaction:any) => {
    return Product.create(product, {
        fields: ['categoryid', 'name', 'description', 'price', 'createdon', 'modifiedon', 'isactive'],
        transaction
    })
}

export const batchUpload = async (productsToUpload:any, availableProducts:any, categoryId:any) => {
    try {
        await sequelize.transaction(async (t) => {
            const promises:any = [];
            productsToUpload.forEach(async (productToUpload:any) => {
                productToUpload.categoryid = categoryId;
                const availableProduct = availableProducts[productToUpload.name.toLowerCase()];
                let promise = null;
                if (!availableProduct) {
                    promise = createProduct(productToUpload, t);
                } else {
                    productToUpload.modifiedon = new Date(Date.now());
                    promise = Product.update(productToUpload, {
                        where: { id: availableProduct.id },
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