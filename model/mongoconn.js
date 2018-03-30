//const express=require('express');
const mongoose = require('mongoose');
const pending=require('../model/transaction');
const chain=require('../model/blockchain');
// const app=express().Router;
const secret=require('../secret');

//mongo connevtion
mongoose.connect("mongodb://localhost/resident_upheaval");
mongoose.connection
.on('open',()=>console.log('connected to mongodb'))
.on('error',(err)=>console.log(err));
//replace req.body.data with data,remove route
// app.post('/post',function(req,res,next){
pending.create(req.body.data,function(err,result){
   console.log("incomplete transaction");
 });
 chain.create(data,function(err,result){
   console.log(result);
 });
