var WebSocket = require("ws");
var Constants = require("./constants.js");
var Blockchain = require("./blockchain.js");
var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var sockets = [];

var initP2PServer = p2p_port => {
  var server = new WebSocket.Server({ port: p2p_port });
  server.on("connection", ws => initConnection(ws));
  console.log("listening websocket p2p port on: " + p2p_port);
};

var initConnection = ws => {
  sockets.push(ws);
  initMessageHandler(ws);
  initErrorHandler(ws);
  write(ws, queryChainLengthMsg());
};
var initHttpServer = http_port => {
  var app = express();
  app.use(bodyParser.json());
  app.use(cors());
  app.options("*", cors());

  //app.get("/blocks", (req, res) => res.send(JSON.stringify(blockchain)));

  app.post("/farmerMineBlock", (req, res) => {
    var newBlock = Blockchain.generateNextBlock(
      Constants.EntityType.FARMER,
      req.body
    );
    Blockchain.addBlock(Constants.EntityType.FARMER, newBlock);
    var obj = responseLatestMsg(Constants.EntityType.FARMER);
    broadcast(obj);
    console.log("block added: " + JSON.stringify(newBlock));
    res.send();
  });
  app.post("/cooperativeMineBlock", (req, res) => {
    console.log(Constants);
    var newBlock = Blockchain.generateNextBlock(
      Constants.EntityType.COOPERATIVE,
      req.body
    );
    Blockchain.addBlock(Constants.EntityType.COOPERATIVE, newBlock);
    broadcast(responseLatestMsg(Constants.EntityType.COOPERATIVE));
    console.log("block added: " + JSON.stringify(newBlock));
    res.send();
  });
  app.post("/retailerMineBlock", (req, res) => {
    var newBlock = Blockchain.generateNextBlock(
      Constants.EntityType.RETAILER,
      req.body
    );
    Blockchain.addBlock(Constants.EntityType.RETAILER, newBlock);
    broadcast(responseLatestMsg(Constants.EntityType.RETAILER));
    console.log("block added: " + JSON.stringify(newBlock));
    res.send();
  });
  app.get("/peers", (req, res) => {
    res.send(
      sockets.map(s => s._socket.remoteAddress + ":" + s._socket.remotePort)
    );
  });
  app.get("/getBoxesByDate", (req, res) => {
    var response = {};
    for (var i = 1; i < Blockchain.retailerBranch.length; i++) {
      if (Blockchain.retailerBranch[i].data.date in response) {
        var date = Blockchain.retailerBranch[i].data.date;
        response[date].boxes.push(Blockchain.retailerBranch[i].data);
      } else {
        var boxes = [];
        boxes.push(Blockchain.retailerBranch[i].data);
        response[Blockchain.retailerBranch[i].data.date] = {
          boxes
        };
      }
    }
    res.send(JSON.stringify(response));
  });
  app.get("/getBoxes/:date/:produto", (req, res) => {
    var date = req.params.date;
    var produto = req.params.produto;
    var response = {};
    var boxesIds = [];
    response["Farmer"] = [];
    response["Cooperative"] = [];
    response["Retailer"] = [];
    for (var i = 1; i < Blockchain.retailerBranch.length; i++) {
      if (
        Blockchain.retailerBranch[i].data.date === date &&
        Blockchain.retailerBranch[i].data.produto === produto
      ) {
        boxesIds.push(Blockchain.retailerBranch[i].data.id);
        response["Retailer"].push(Blockchain.retailerBranch[i].data);
      }
    }
    response["Farmer"].push(
      findBoxesInBlockchain(Blockchain.farmerBranch, boxesIds)
    );
    response["Cooperative"].push(
      findBoxesInBlockchain(Blockchain.cooperativeBranch, boxesIds)
    );
    res.send(JSON.stringify(response));
  });
  app.post("/addPeer", (req, res) => {
    connectToPeers([req.body.peer]);
    res.send();
  });
  app.get("/cooperativeGetAvailableBoxes", (req, res) => {
    var response = {};
    var boxesIds = [];
    response["boxesToSold"] = [];
    for (var i = 1; i < Blockchain.retailerBranch.length; i++) {
      boxesIds.push(Blockchain.retailerBranch[i].data.id);
    }
    for (var i = 1; i < Blockchain.cooperativeBranch.length; i++) {
      if (!boxesIds.includes(Blockchain.cooperativeBranch[i].data.id)) {
        response["boxesToSold"].push(Blockchain.cooperativeBranch[i].data);
      }
    }
    res.send(JSON.stringify(response));
  });
  app.get("/farmerGetAvailableBoxes", (req, res) => {
    var response = {};
    var boxesIds = [];
    response["boxesToSold"] = [];
    for (var i = 1; i < Blockchain.cooperativeBranch.length; i++) {
      boxesIds.push(Blockchain.cooperativeBranch[i].data.id);
    }
    for (var i = 1; i < Blockchain.farmerBranch.length; i++) {
      if (!boxesIds.includes(Blockchain.farmerBranch[i].data.id)) {
        response["boxesToSold"].push(Blockchain.farmerBranch[i].data);
      }
    }
    res.send(JSON.stringify(response));
  });

  app.listen(http_port, () =>
    console.log("Listening http on port: " + http_port)
  );
};

var findBoxesInBlockchain = (blockchainBranch, ids) => {
  var boxes = [];
  for (var i = 1; i < blockchainBranch.length; i++) {
    if (ids.includes(blockchainBranch[i].data.id)) {
      boxes.push(blockchainBranch[i].data);
    }
  }
  return boxes;
};

var initMessageHandler = ws => {
  ws.on("message", data => {
    var message = JSON.parse(data);

    switch (message.type) {
      case Constants.MessageType.QUERY_LATEST:
        write(ws, responseLatestMsg());
        break;
      case Constants.MessageType.QUERY_ALL:
        write(ws, responseChainMsg());
        break;
      case Constants.MessageType.RESPONSE_BLOCKCHAIN:
        handleBlockchainResponse(message);
        break;
    }
  });
};

var initErrorHandler = ws => {
  var closeConnection = ws => {
    console.log("connection failed to peer: " + ws.url);
    sockets.splice(sockets.indexOf(ws), 1);
  };
  ws.on("close", () => closeConnection(ws));
  ws.on("error", () => closeConnection(ws));
};

function connectToPeers(newPeers) {
  newPeers.forEach(peer => {
    var ws = new WebSocket(peer);
    ws.on("open", () => initConnection(ws));
    ws.on("error", () => {
      console.log("connection failed");
    });
  });
}

var handleBlockchainResponse = message => {
  //var receivedBlocks = JSON.parse(message.data).sort(
  //  (b1, b2) => b1.index - b2.index
  //);
  var receivedFarmerBlocks = JSON.parse(message.farmerBranch);
  var receivedCooperativeBlocks = JSON.parse(message.cooperativeBranch);
  var receivedRetailerBlocks = JSON.parse(message.retailerBranch);

  var latestFarmerBlockHeld = Blockchain.getLatestFarmerBlock();
  var latestCooperativeBlockHeld = Blockchain.getLatestCooperativeBlock();
  var latestRetailerBlockHeld = Blockchain.getLatestRetailerBlock();

  checkDifferencesInBlockchain(
    latestFarmerBlockHeld,
    receivedFarmerBlocks,
    Constants.EntityType.FARMER
  );
  checkDifferencesInBlockchain(
    latestCooperativeBlockHeld,
    receivedCooperativeBlocks,
    Constants.EntityType.COOPERATIVE
  );
  checkDifferencesInBlockchain(
    latestRetailerBlockHeld,
    receivedRetailerBlocks,
    Constants.EntityType.RETAILER
  );
};
var checkDifferencesInBlockchain = (latestBlockHeld, receivedBlocks, type) => {
  var latestBlockReceived = receivedBlocks[receivedBlocks.length - 1];

  if (latestBlockReceived.index > latestBlockHeld.index) {
    console.log(
      "branch blockchain possibly behind. We got: " +
        latestBlockHeld.index +
        " Peer got: " +
        latestBlockReceived.index
    );
    if (latestBlockHeld.hash === latestBlockReceived.previousHash) {
      console.log("We can append the received block to our chain");
      //blockchain.push(latestBlockReceived);
      console.log("type");
      console.log(type);
      switch (type) {
        case Constants.EntityType.FARMER:
          console.log("add to farmer");
          Blockchain.farmerBranch.push(latestBlockReceived);
          break;
        case Constants.EntityType.COOPERATIVE:
          console.log("add to cooperative");
          Blockchain.cooperativeBranch.push(latestBlockReceived);
          break;
        case Constants.EntityType.RETAILER:
          console.log("retailer");
          Blockchain.retailerBranch.push(latestBlockReceived);
          break;
      }
      broadcast(responseLatestMsg());
    } else if (receivedBlocks.length === 1) {
      console.log("We have to query the chain from our peer");
      broadcast(queryAllMsg());
    } else {
      console.log("Received blockchain is longer than current blockchain");
      if (Blockchain.isValidChain(receivedBlocks)) {
        console.log("replace chain");
        replaceChain(receivedBlocks, type);
      } else {
        console.log("received blockchain is not valid");
      }
    }
  } else {
    console.log(
      "received blockchain is not longer than current blockchain. Do nothing"
    );
  }
};
var replaceChain = (newBlocks, branchType) => {
  switch (branchType) {
    case Constants.EntityType.FARMER:
      if (newBlocks.length > Blockchain.farmerBranch.length) {
        console.log(
          "Received blockchain is valid. Replacing current blockchain with received blockchain"
        );
        Blockchain.farmerBranch = newBlocks;
        broadcast(responseLatestMsg());
      } else {
        console.log("Received blockchain invalid");
      }
      break;
    case Constants.EntityType.COOPERATIVE:
      if (newBlocks.length > Blockchain.cooperativeBranch.length) {
        console.log(
          "Received blockchain is valid. Replacing current blockchain with received blockchain"
        );
        Blockchain.cooperativeBranch = newBlocks;
        broadcast(responseLatestMsg());
      } else {
        console.log("Received blockchain invalid");
      }
      break;
    case Constants.EntityType.RETAILER:
      if (newBlocks.length > Blockchain.retailer.length) {
        console.log(
          "Received blockchain is valid. Replacing current blockchain with received blockchain"
        );
        Blockchain.retailerBranch = newBlocks;
        broadcast(responseLatestMsg());
      } else {
        console.log("Received blockchain invalid");
      }
      break;
  }
};

var queryChainLengthMsg = () => ({ type: Constants.MessageType.QUERY_LATEST });
var queryAllMsg = () => ({ type: Constants.MessageType.QUERY_ALL });
var responseChainMsg = () => ({
  type: Constants.MessageType.RESPONSE_BLOCKCHAIN,
  farmerBranch: JSON.stringify(Blockchain.farmerBranch),
  cooperativeBranch: JSON.stringify(Blockchain.cooperativeBranch),
  retailerBranch: JSON.stringify(Blockchain.retailerBranch)
});

function responseLatestMsg() {
  var lastFarmerBlock = "";
  var lastCooperativeBlock = "";
  var lastRetailerBlock = "";
  lastFarmerBlock = JSON.stringify([Blockchain.getLatestFarmerBlock()]);
  lastCooperativeBlock = JSON.stringify([
    Blockchain.getLatestCooperativeBlock()
  ]);
  lastRetailerBlock = JSON.stringify([Blockchain.getLatestRetailerBlock()]);
  var type = Constants.MessageType.RESPONSE_BLOCKCHAIN;
  return {
    type,
    farmerBranch: lastFarmerBlock,
    cooperativeBranch: lastCooperativeBlock,
    retailerBranch: lastRetailerBlock
  };
}

var write = (ws, message) => ws.send(JSON.stringify(message));
var broadcast = message => sockets.forEach(socket => write(socket, message));

module.exports = {
  broadcast,
  responseLatestMsg,
  connectToPeers,
  initP2PServer,
  initHttpServer
};
