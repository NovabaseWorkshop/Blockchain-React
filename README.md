# Blockchain-React Conceitos base

**Pre-Requesitos:** Node.js

##### NaiveChain install

* npm install
* HTTP_PORT=3001 P2P_PORT=6001 npm start (cria o primeiro nó)
* HTTP_PORT=3002 P2P_PORT=6002 PEERS=ws://localhost:6001 npm start (cria o segundo nó)
* HTTP_PORT=3003 P2P_PORT=6003 PEERS=ws://localhost:6001,ws://localhost:6002 npm start (cria um terceiro nó)

##### Serviços
     Serviço | Função
------------ | -------------
/farmerMineBlock | body param json with box info
/cooperativeMineBlock | body param json with box info

/retailerMineBlock
    body param json with box info
/getBoxesByDate
    get retailer boxes grouped by date
/getBoxes/:date/:produto
    url params: date (Ex: 14-6-2018), produto (Ex: truffles)
    get timeline/trace of the boxes of a product bought by the retailer in a given date
/cooperativeGetAvailableBoxes
    get boxes of the cooperative to sold
/farmerGetAvailableBoxes
    get boxes of the farmer to sold





  


