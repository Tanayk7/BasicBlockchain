const BLockChain = require('./Blockchain');
const Block = require('./Blockchain/block');

let blockchain_1 = new BLockChain();

blockchain_1.addBlock('r4nD0m-daTa-1');
blockchain_1.addBlock('r4nD0m-daTa-2');

console.log("BLOCKCHAIN 1")
console.log(blockchain_1.toString());

let new_block = new Block('timestamp', 'last-hash', 'block-hash', 'some data', 100, 4);

let shorter_chain = [...blockchain_1.chain];
let longer_chain = [...blockchain_1.chain, new_block];

// shorter_chain.splice(1, 1);
// console.log("shorter chain: ", shorter_chain);

// blockchain_1.replaceChain(shorter_chain);
blockchain_1.replaceChain(longer_chain);