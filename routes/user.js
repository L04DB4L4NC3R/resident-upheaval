const app = require("express").Router();
const usermodel = require('../model/usermodel').usermodel;
const session = require("express-session");

app.post('/login',(req,res)=>{

    usermodel.findOne({name:req.body.name}).then((user)=>{
        if(user===null)
            res.send({message:0})
        else if(req.body.password === user.passwd){
            req.session.name = req.body.name;
            req.session.number = req.body.number;
            res.json({message:1,name:req.body.name});
        }
        else
            res.send({message:0})
    });

});


app.post('/signup',(req,res)=>{
    usermodel.findOne({name:req.body.name}).then((user)=>{
        if(user===null){
            usermodel.create({
                name:req.body.name,
                passwd:req.body.password,
                number:req.body.number
            },(err,result)=>{
                if(err)
                    console.log(err);
                else{
                    console.log('saved');
                    req.session.name = req.body.name;
                    req.session.number = req.body.number;
                    res.json({message:1,name:req.body.name});
                }
            });
        }
        else {
            console.log(user);
            res.json({message:0});
        }
    });
});


app.get('/logout',(req,res)=>{
    req.session.name = '';
    req.session.number = '';
    res.redirect('/blocks');
});



module.exports = app;
