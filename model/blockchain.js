const mongoose=require('mongoose');
const schema=mongoose.Schema;
const chainSchema=new schema({

chain:{
  type:Array,
  required:true
}
});

var  chainmodel=mongoose.model('chain',chainSchema);
module.exports=chainmodel;
