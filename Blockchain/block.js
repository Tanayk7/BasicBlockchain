const ChainUtil = require('../chain-util');
const { DIFFICULTY, MINE_RATE, LOGS_ENABLED } = require('../config');

const LOGS_ENABLED = false;

class Block {
    constructor(timestamp, lastHash, hash, data, nonce, difficulty) {
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
        this.difficulty = difficulty || DIFFICULTY;
    }

    // string representation of block;
    toString() {
        return `
            Block - 
                Timestamp : ${this.timestamp}
                Last Hash : ${this.lastHash.substring(0, 10)}
                Hash .....: ${this.hash.substring(0, 10)}
                Nonce ....: ${this.nonce}
                Difficulty: ${this.difficulty}
                Data .....: ${this.data}
        `;
    }

    // generates the root block for a blockchain
    static genesis() {
        return new this('timestamp', '-----', 'f1r57-h45h', ['6EnE515'], 0);
    }

    static mining_logs(nonce) {
        'use strict';
        process.stdout.write('\x1Bc');
        console.log("mining new block...");
        console.log("nonce: ", nonce);
    }

    // uses the proof of work algorithm to add provided data to a block
    static mineBlock(lastBlock, data) {
        const lastHash = lastBlock.hash;
        let hash, timestamp, nonce = 0;
        let { difficulty } = lastBlock;

        // proof of work algorithm
        do {
            LOGS_ENABLED && Block.mining_logs(nonce);
            nonce++;
            timestamp = Date.now();
            difficulty = Block.adjustDifficulty(lastBlock, timestamp);
            hash = Block.hash(timestamp, lastHash, data, nonce, difficulty);
        } while (hash.substring(0, difficulty) !== '0'.repeat(difficulty));

        return new this(timestamp, lastHash, hash, data, nonce, difficulty);
    }

    // returns the hash value for a block
    static hash(timestamp, lastHash, data, nonce, difficulty) {
        return ChainUtil.hash(`${timestamp}${lastHash}${data}${nonce}${difficulty}`).toString();
    }

    // returns the unique hash for a block
    static blockHash(block) {
        const { timestamp, lastHash, data, nonce, difficulty } = block;
        return Block.hash(timestamp, lastHash, data, nonce, difficulty);
    }

    // adjusts the difficulty of mining a block based on the MINE_RATE 
    static adjustDifficulty(lastBlock, currentTime) {
        let { difficulty } = lastBlock;

        difficulty = currentTime - lastBlock.timestamp < MINE_RATE ? difficulty + 1 : difficulty - 1;
        //difficulty = lastBlock.timestamp + MINE_RATE > currentTime ? difficulty + 1 : difficulty - 1;

        return difficulty;
    }
}

module.exports = Block;