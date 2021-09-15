const Block = require('./block');

class Blockchain {
    constructor() {
        this.chain = [Block.genesis()];
    }

    // string representation of the blockchain
    toString() {
        let output = "";

        for (let block of this.chain) {
            output += block.toString();
        }

        return output;
    }

    // mines a block and adds is to a blockchain
    addBlock(data) {
        const lastBlock = this.chain[this.chain.length - 1];

        let label = "time taken to mine new block";

        console.time(label);
        const block = Block.mineBlock(lastBlock, data);
        console.timeEnd(label);

        this.chain.push(block);
        return block;
    }

    // checks if a chain is valid 
    isValidChain(chain) {
        // check the incoming genesis block
        if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) return false;

        for (let i = 1; i < chain.length; i++) {
            const block = chain[i];
            const lastBlock = chain[i - 1];

            if (block.lastHash !== lastBlock.hash ||
                block.hash !== Block.blockHash(block)) {
                return false;
            }
        }

        return true;
    }

    // if a peer sends a new chain
    replaceChain(newChain) {
        if (newChain.length <= this.chain.length) {
            console.log("Received chain is not longer than the current chain");
            return;
        }
        else if (!this.isValidChain(newChain)) {
            console.log("The received chain is not valid.");
            return;
        }

        console.log("Replacing blockchain with the new chain");
        this.chain = newChain;
    }
}

module.exports = Blockchain;