const mongoose = require("mongoose");

var schema = new mongoose.Schema({
    name:String,
    passwd:String,
    number:String
});


var schemaa = new mongoose.Schema({

    name:String,
    number:String,
    wants:String,
    want_quantity:Number,
    needs:String,
    needs_quantity:Number

});


module.exports.usermodel = mongoose.model('user',schema);
module.exports.needs = mongoose.model('need',schemaa);
