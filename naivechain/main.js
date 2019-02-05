var server = require("./server.js");
var Blockchain = require("./blockchain.js");

//var http_port = process.env.HTTP_PORT || 3001;
//var p2p_port = process.env.P2P_PORT || 6001;
var http_port = process.argv[2];
var p2p_port = process.argv[3];
var initialPeers = process.argv[4] ? process.argv[4].split(",") : [];
//var initialPeers = process.env.PEERS ? process.env.PEERS.split(",") : [];
console.log(server);
server.connectToPeers(initialPeers);
server.initHttpServer(http_port);
server.initP2PServer(p2p_port);
Blockchain.farmerBranch.push(Blockchain.getGenesisBlock());
Blockchain.cooperativeBranch.push(Blockchain.getGenesisBlock());
Blockchain.retailerBranch.push(Blockchain.getGenesisBlock());
