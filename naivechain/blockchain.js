var Constants = require("./constants.js");
var CryptoJS = require("crypto-js");

var farmerBranch = [];
var cooperativeBranch = [];
var retailerBranch = [];

class Block {
  constructor(index, previousHash, timestamp, data, hash) {
    this.index = index;
    this.previousHash = previousHash.toString();
    this.timestamp = timestamp;
    this.data = data;
    this.hash = hash.toString();
  }
}
var getGenesisBlock = () => {
  return new Block(
    0,
    "0",
    1465154705,
    '{ "description": "my genesis block!!" }',
    "816534932c2b7154836da6afc367695e6337db8a921823784c14378abed4f7d7"
  );
};

var generateNextBlock = (type, blockData, previousBlock) => {
  var nextIndex = previousBlock.index + 1;
  var nextTimestamp = new Date().getTime() / 1000;
  var nextHash = calculateHash(
    nextIndex,
    previousBlock.hash,
    nextTimestamp,
    blockData
  );
  return new Block(
    nextIndex,
    previousBlock.hash,
    nextTimestamp,
    blockData,
    nextHash
  );
};
var isValidChain = blockchainToValidate => {
  if (
    JSON.stringify(blockchainToValidate[0]) !==
    JSON.stringify(getGenesisBlock())
  ) {
    return false;
  }
  var tempBlocks = [blockchainToValidate[0]];
  for (var i = 1; i < blockchainToValidate.length; i++) {
    if (isValidNewBlock(blockchainToValidate[i], tempBlocks[i - 1])) {
      tempBlocks.push(blockchainToValidate[i]);
    } else {
      return false;
    }
  }
  return true;
};

var calculateHash = (index, previousHash, timestamp, data) => {
  return CryptoJS.SHA256(index + previousHash + timestamp + data).toString();
};
var calculateHashForBlock = block => {
  return calculateHash(
    block.index,
    block.previousHash,
    block.timestamp,
    block.data
  );
};

var isValidNewBlock = (newBlock, previousBlock) => {
  if (previousBlock.index + 1 !== newBlock.index) {
    console.log("invalid index");
    return false;
  } else if (previousBlock.hash !== newBlock.previousHash) {
    console.log("invalid previoushash");
    return false;
  } else if (calculateHashForBlock(newBlock) !== newBlock.hash) {
    console.log(
      typeof newBlock.hash + " " + typeof calculateHashForBlock(newBlock)
    );
    console.log(
      "invalid hash: " + calculateHashForBlock(newBlock) + " " + newBlock.hash
    );
    return false;
  }
  return true;
};

module.exports = {
  getGenesisBlock,
  isValidChain,
  calculateHash,
  generateNextBlock,
  farmerBranch,
  cooperativeBranch,
  retailerBranch,
  isValidNewBlock
};
