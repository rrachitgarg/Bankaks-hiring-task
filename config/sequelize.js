const Sequelize = require('sequelize');
const userModel = require('../models/users');
const contactModel = require('../models/contacts');

const db = process.env.DB;
const user = process.env.DB_USER;
const host = process.env.DB_HOST || 'localhost';
const password =  process.env.DB_PASSWORD;

const sequelize = new Sequelize(db,user,password,{
    host: host,
    dialect: 'mysql',
    logging: false
});

User = userModel(sequelize,Sequelize);
Contact = contactModel(sequelize,Sequelize);

User.belongsToMany(Contact,{
    through: 'UserContact',
    as: 'contacts',
    foreignKey: 'userId'
});

Contact.belongsToMany(User,{
    through: 'UserContact',
    as: 'users',
    foreignKey: 'contactId'
});

sequelize.sync({force: false}).then(()=>{
    console.log('Database connected.');
}).catch((err)=>{
    console.log('Database connection failed')
    throw err;
});

module.exports = {
    User,Contact
}