import { sequelize } from '../../config/database';

const query = sequelize.getQueryInterface();

const categories = [
    {
        id: 1,
        name: 'Flores',
        isActive: true,
    },
    {
        id: 2,
        name: 'Papeleria',
        isActive: true,
    }
]

const categoryQueries = categories.map(category => {
    const {id,name,isActive} = category;
    return query.sequelize.query(`
    INSERT INTO category (id, name, "isActive", "createdAt", "updatedAt")
    VALUES(${id},'${name}',${isActive},CURRENT_TIMESTAMP,CURRENT_TIMESTAMP) 
    ON CONFLICT (id) 
    DO 
       UPDATE SET name='${name}', "isActive"=${isActive}, "updatedAt"=CURRENT_TIMESTAMP;
    `);
});

export { categoryQueries };