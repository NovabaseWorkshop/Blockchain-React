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
farmerMineBlock | body param json with box info
cooperativeMineBlock | body param json with box info
