const crypto = require("crypto");


//class initialization
class Block{

    constructor(index,previousHash,timestamp,data,hash){

        this.index = index;
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.data = data;
        this.hash = hash;

    }

}



//to calculate hash using SHA256 algo
var calcHash = (index,previousHash,timestamp,data)=>{

    return crypto.createHmac('sha256','10').update(index+previousHash+timestamp+data).digest('hex');

}


//To get latest block in blockchain
var getlatestblock = (chain)=>{

    if(chain[0].chain===undefined)
        return chain[0];
    return chain[0].chain[chain[0].chain.length-1];
}




//to generate a new block
var generateBlock = (blockData,chain)=>{

    var previousBlock = getlatestblock(chain);
    //console.log(previousBlock);
    var nextindex = parseInt(previousBlock.index) + 1;
    var nexttimestamp = new Date().getTime()/1000;
    var nexthash = calcHash(nextindex,previousBlock.hash,nexttimestamp,blockData);
    b= new Block(nextindex,previousBlock.hash,nexttimestamp,blockData,nexthash);
    //console.log(b);

    return b;
}




//to create a genesis block
var createGenesisBlock = ()=>{

    return new Block(0,'0',new Date().getTime()/1000,"TERMINATOR GENESIS",calcHash(0,'0',new Date().getTime()/1000,"TERMINATOR GENESIS"));

}

// to validate hash before entering a new block
var validate = (newBlock,previousBlock)=>{
    if(previousBlock.index + 1 != newBlock.index)
        return false;
    if(previousBlock.hash != newBlock.previousHash)
        return false;
    if(calcHash(newBlock.index,newBlock.previousHash,newBlock.timestamp,newBlock.data)!=newBlock.hash)
        return false;
    return true;

}


module.exports.createGenesisBlock = createGenesisBlock;
module.exports.generateBlock = generateBlock;
module.exports.validate = validate;



// var blockchain = [createGenesisBlock()];
// blockchain.push(generateBlock(data));

// data={
//
//     from:{
//         name:,
//         location:
//     },
//     to:{
//         name:,
//         location:
//     },
//     trade:{
//         item1:{
//             quantity:,
//             type:
//         },
//         item2:{
//             quantity:,
//             type:
//         }
//     }
//
// }
