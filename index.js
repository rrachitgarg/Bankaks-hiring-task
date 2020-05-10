require('dotenv').config();

var express = require('express');
var router = require('./routes/routes');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);

app.use('*',(req,res)=>{
    res.status(404).send("Invalid url");
});

app.listen(process.env.PORT,()=>{
    console.log("Server is running...")
});