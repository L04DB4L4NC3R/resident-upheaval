var app = require("express").Router();
var needs = require("../model/usermodel").needs;


var session_verify = (req,res,next)=>{
    console.log("verifying...");
    if(req.session.name === undefined)
        res.json({message:"Forbidden route"});
    else
        next();

}


app.post('/demand',session_verify,(req,res)=>{

    var obj = new needs({
        name:req.session.name,
        number:req.session.number,
        wants:req.body.wants,
        needs:req.body.needs
    });

    obj.save().then(()=>{
        console.log("Saved needs");
        res.redirect('/feed');
    }).catch((err)=>{
        console.log(err);
        res.redirect('/feed');
    });

});



app.get('/feed',session_verify,(req,res)=>{

    needs.find({}).then((data)=>{
        res.json(data);
    }).catch((err)=>{
        console.log(err);
        res.json({err})
    })

});




module.exports = app;
