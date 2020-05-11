const db = require('../config/sequelize');
const util = require('./utility');

module.exports = {

    signup: async(req, res)=>{
        try{
            data = req.body;
            if(!data.mobile || !data.password){
                throw new Error("Invalid/Incomplete fields");
            }
            User = await db.User.create(data);
            token = util.getAccessToken(User);
            res.status(200).send({
                "message": "User created successfully",
                "token": token
            });
        }
        catch (err) {
            console.log(err);
            res.status(400).send(err.message);
        }
    },

    signin : async(req, res)=>{
        try{
            data = req.body;
            if(!data.mobile || !data.password){
                throw new Error("Invalid/Incomplete fields");
            }
            User = await db.User.findOne(
            { where:{
                mobile: data.mobile
            }
            });
            if(!User)
            {
                throw new Error("User does not exist");
            }
            if(!User.validPassword(data.password)){
                throw new Error("Incorrect password");
            }
            token = util.getAccessToken(User);
            res.status(200).send({
                "message": "User logged in successfully",
                "token": token
            });
        }
        catch (err) {
            console.log(err);
            res.status(400).send(err.message);
        }
    },

    addContact : async(req, res)=>{
        try{
            if(!req.body.mobile || !req.body.name){
                throw new Error("Invalid/Incomplete fields");
            }
            var token = req.headers['authorization'];
            if(!token){
                throw new Error("Need access token");
            }
            token = token.split(' ')[1];
            decoded = util.verifyUser(token);
            if(decoded==null){
                throw new Error("Invalid token");
            }
            user = await db.User.findOne({
                where: { mobile: decoded.mobile }
            });
            await util.validateApi(req.body.mobile);
            contact = await db.Contact.findOrCreate({where: {name: req.body.name,mobile: req.body.mobile}});
            user.addContact(contact[0]);
            res.status(200).send("Contact added successfully");
        }
        catch (err) {
            console.log(err);
            res.status(400).send(err.message);
    }
    }
}