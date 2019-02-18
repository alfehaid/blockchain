const SHA256 = require('crypto-js/sha256');

class block{
    constructor(index, timestamp, data, prevHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.prevHash = prevHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash(){
        return SHA256(this.index + this.prevHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }

    mainBlock(diff){
        while(this.hash.substring(0, diff) !== Array(diff + 1).join("0")){
            this.nonce++;
            this.hash=this.calculateHash();
        }
        console.log("block mined"+ this.hash); 
    }
}


class blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock(){
        return new block(0, "01/01/2019", "Frist Block", "0000000000000000000000000000000000000000");
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.prevHash = this.getLatestBlock().hash;
        newBlock.mainBlock(4);
        this.chain.push(newBlock);
    }
}

let HaithamBlock = new blockchain();

var x=0;
var breakTheLoop = false;

const readline = require('readline');
    
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
    });

    console.log('Enter ');
rl.on('line', (line) => {

    x++;
    var datetime = new Date();
    HaithamBlock.addBlock(new block(x,datetime,line));
   
    
    rl.prompt();

    console.log(HaithamBlock.chain[x].data);

  }).on('close', () => {
        console.log('You have stopped, Thank you!');

        y=0;
        while(y<= 4)
        {
            y++;
            console.log(HaithamBlock.chain[y].data);
        }

        process.exit(0);
    });
    
