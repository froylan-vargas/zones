import { sequelize } from '../../config/database';

const query = sequelize.getQueryInterface();

const configurations = [
    {
        id: 1,
        name: 'bucket-url',
        value: process.env && process.env.NODE_ENV === 'development'
            ? 'https://zone-assets-dev.s3.us-east-2.amazonaws.com/'
            : 'https://zones-assets.s3.us-east-2.amazonaws.com/',
        isActive: true,
    },
]

const configurationQueries = configurations.map(configuration => {
    const { id, name, value, isActive } = configuration;
    return query.sequelize.query(`
    INSERT INTO configuration (id, name, value, "isActive", "createdAt", "updatedAt")
    VALUES(${id},'${name}','${value}',${isActive},CURRENT_TIMESTAMP,CURRENT_TIMESTAMP) 
    ON CONFLICT (id) 
    DO 
       UPDATE SET name='${name}', value='${value}', "isActive"=${isActive}, "updatedAt"=CURRENT_TIMESTAMP;
    `);
});

export { configurationQueries };