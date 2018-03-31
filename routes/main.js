const app = require("express").Router();
const bc = require("../blockchain/chain");
const pending=require('../model/transaction');
const chainmodel=require('../model/blockchain');

var session_verify = (req,res,next)=>{
    console.log("verifying...");

    if(req.session.name === undefined)
        res.json({message:"Forbidden route"});
    else
        next();

}

app.get('/blocks', (req,res)=>{

    chainmodel.find({})
    .then((chain)=>{
        if(chain.length <= 0)
            res.json({chain:"Empty"});
        else
            res.json(chain[0].chain)
    }).catch(err=>console.log(err));

});


app.post('/mine',session_verify,(req,res)=>{

    chainmodel.find({})
    .then((chain)=>{

        if(chain.length !== 0){

        var newBlock = bc.generateBlock(req.body.data,chain);

            if(!bc.validate(newBlock,chain[0].chain[chain[0].chain.length-1]))
                res.json({message:"Failure, the new block could not be validated"});

            else{

                chainmodel.update({},{$push: {chain:newBlock}})
                .then(()=>{
                    if(req.body.data.from === undefined)
                        res.json(newBlock);
                    else{
                        var meetingpt = [req.body.data.from.location[0]+Math.random()*10,req.body.data.from.location[0]+Math.random()*10];//( (req.body.data.from.location[0]+req.body.data.to.location[0])/2 , (req.body.data.from.location[1]+req.body.data.to.location[1])/2 );
                        res.json({
                            meeting_location:meetingpt
                        });
                    }
                }).catch(err=>console.log(err));


            }

        }


    else{

        var genesis = [bc.createGenesisBlock()];
        var obj = new chainmodel({
            chain:genesis
        });

        obj.save()
        .then(()=>{
            console.log('pushed genesis block');
            var newBlock = bc.generateBlock(req.body.data,genesis);

            if(!bc.validate(newBlock,genesis[0]))
                res.json({message:"Failure, the new block could not be validated"});

            chainmodel.update({},{$push: {chain:newBlock}})
            .then(()=>{
                res.json(newBlock);
            }).catch(err=>console.log(err));

        }).catch(err=>console.log(err));

    }

    }).catch(err=>console.log(err));

});


module.exports = app;
