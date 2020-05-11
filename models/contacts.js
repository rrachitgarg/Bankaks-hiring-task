module.exports = (sequelize, type) => {

    const Contact = sequelize.define('contact', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: type.STRING,
            unique: true,
            allowNull: false,
        },
        mobile:{
            type: type.STRING(10),
            unique: true,
            allowNull: false
        },
    });
return Contact;
}