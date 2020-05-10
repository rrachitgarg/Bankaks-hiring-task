const bcrypt = require('bcrypt');

module.exports = (sequelize, type) => {

    const User = sequelize.define('user', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        mobile:{
            type: type.STRING(10),
            unique: true,
            allowNull: false
        },
        password: {
            type: type.STRING,
            allowNull: false,
        }
    },
    {
        hooks: {
            beforeCreate: (user) => {
              const salt = bcrypt.genSaltSync();
              user.password = bcrypt.hashSync(user.password, salt);
            },
          },
      }
    );
User.prototype.validPassword= function(password)
{
    return bcrypt.compareSync(password, this.password);
}
return User;
}