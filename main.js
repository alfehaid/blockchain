const SHA256 = require('crypto-js/sha256');

class block{
    constructor(index, timestamp, data, prevHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.prevHash = prevHash;
        this.hash = this.calculateHash();
        this.nonus=0
    }
    calculateHash(){
        return SHA256(this.index + this.prevHash + this.timestamp + this.data + this.nonus).toString();
    }
    mineBlock(difficulty){
        while(this.hash.substring(0,difficulty) !== Array(difficulty + 1).join("0")){
            nonus++;
            this.hash = this.calculateHash();
        }
        console.log("Block mined: " + this.hash);
    }
}

class blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficulty=4;
    }

    createGenesisBlock(){
        return new block(0, "01/01/2019", "Frist Block", "0000000000000000000000000000000000000000");
    }
    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.prevHash = this.getLatestBlock().hash;
        newBlock.mineBlock = (this.difficulty);
        this.chain.push(newBlock);
    }
}

let HaithamBlock = new blockchain();
var x=0;
while (x!=5){
    x++;
    var datetime = new Date();
    HaithamBlock.addBlock(new block(x,datetime,"hello"));
    HaithamBlock.chain[x].data = x;
   
}



//HaithamBlock.addBlock(new block("11","datetime","hello"));

//HaithamBlock.addBlock(new block(x,datetime,"hello"));




console.log(JSON.stringify(HaithamBlock,null,4));

// const readline = require('readline');

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

// rl.question('What do you think of Node.js? ', (answer) => {
//   console.log('Thank you for your valuable feedback:', answer);
//   rl.close();
// });