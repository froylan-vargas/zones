import React from 'react';
import FormError from '../elements/form-error/form-error.component'

const WithCategories = WrappedComponent => ({ categories, setSelectedCategory, errors }) => {

    const createCategories = () => {
        const categoriesArray = categories.map(category => {
            return <option key={category.id} value={category.id}>{category.name}</option>
        })
        categoriesArray.unshift(<option key="0" value="0">Seleccione una categoria</option>);
        return categoriesArray;
    }

    const onCategoryChange = (event) => {
        const categoryId = event.target.value;
        setSelectedCategory(categoryId);
    }

    return (
        <div>
            <WrappedComponent onChange={onCategoryChange}>
                {
                    categories ? createCategories() : null
                }
            </WrappedComponent>
            {
                errors ? <FormError errors={errors} /> : null
            }

        </div>
    )
}

export default WithCategories;