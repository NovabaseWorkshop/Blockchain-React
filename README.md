# Blockchain-React Conceitos base

**Pre-Requesitos:** Node.js

### NaiveChain install

* `npm install`
* `HTTP_PORT=3001 P2P_PORT=6001 npm start` (cria o primeiro nó)
* HTTP_PORT=3002 P2P_PORT=6002 PEERS=ws://localhost:6001 npm start (cria o segundo nó)
* HTTP_PORT=3003 P2P_PORT=6003 PEERS=ws://localhost:6001,ws://localhost:6002 npm start (cria um terceiro nó)

### Serviços
Serviço      | Função
------------ | -------------
http://ip:port/farmerMineBlock | Criação da Data correspondente ao **Agricultor**
http://ip:port/cooperativeMineBlock | Criação da Data correspondente à **Cooperativa**
http://ip:port/retailerMineBlock | Criação da Data correspondente ao **Retalhista**
http://ip:port/getBoxesByDate | Obtem as caixas do **retalhista** ordenadas por data
http://ip:port/getBoxes/:date/:produto | url params: date (Ex: 14-6-2018), produto (Ex: truffles) Obtem a timeline das caixas de um certo produto comprado pelo **retalhista** numa dada data 
http://ip:port/cooperativeGetAvailableBoxes | Obtem as caixas vendidas pela **cooperativa**
http://ip:port/farmerGetAvailableBoxes |Obtem as caixas vendidas pelo **agricultor**

### Exemplo Json

```
**Farmer**
{
  "id": 2,
  "date": "1/1/00",
  "produto": "tatoes",
  "custoTransporte": 10,
  "quantidade": 10
}
 
{
  "id": 0,
  "date": "1/1/00",
  "produto": "tatoes",
  "custoTransporte": 10,
  "quantidade": 10
}
{
  "id": 1,
  "date": "5/10/00",
  "produto": "truffles",
  "custoTransporte": 5,
  "quantidade": 19
}
```
