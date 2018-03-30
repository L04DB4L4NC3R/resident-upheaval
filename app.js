const express = require('express');
const body_parser = require("body-parser");
const mainRouter = require("./routes/main");
const loginRouter = require("./routes/user");
const feed = require('./routes/feed');
const mongoose = require('mongoose');
const secret=require('./secret');
var session = require('express-session');

mongoose.connect("mongodb://"+secret.user+":"+secret.password+"@ds229909.mlab.com:29909/resident-upheaval");
mongoose.connection
.on('open',()=>console.log('connected to mongodb'))
.on('error',(err)=>console.log(err));

var app = express();

app.use(body_parser.json());
app.use(body_parser.urlencoded({extended:false}));

//set up a session (It uses cookies)
app.use(session({secret:secret.cookieSecretKey,
                        saveUninitialized:false,
                        resave:false
                    }));

app.use(mainRouter);
app.use(loginRouter);
app.use(feed);

app.listen(process.env.PORT || 3000,()=>console.log("Listening on port 3000"));
