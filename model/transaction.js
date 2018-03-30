const mongoose=require('mongoose');
const schema=mongoose.Schema;
const dataSchema=new schema({
index:{
  type:String,
  required:true
},
previousHash:{
  type:String,
  required:true
},
timestamp:{
  type:String,
  required:true
},
data:{
  type:String,
  required:true
},
hash:{
    type:String,
    required:true
}
});


var  datamodel=mongoose.model('pending',dataSchema);
module.exports=datamodel;


    // from:{
    //     name:{
    //       type:String,
    //     	required:true
    //     },
    //     location:{
    //       type:String,
    //     	required:true
    //     }
    // },
    // to:{
    //     name:{
    //       type:String,
    //     	required:true
    //     },
    //     location:{
    //       type:String,
    //     	required:true
    //     }
    // },
    // trade:{
    //     item1:{
    //         quantity:{
    //           type:String,
    //       	required:true
    //       },
    //         type:{
    //           type:String,
    //         	required:true
    //         }
    //     },
    //     item2:{
    //         quantity:{
    //           type:String,
    //         	required:true
    //         },
    //         type:{
    //           type:String,
    //         	required:true
    //         }
    //     }
    // }
    //
    //
