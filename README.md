# Blockchain-React Conceitos base

**Requirements:** 
`Node.js`
`Postman(Only to test the services)`

### NaiveChain install

Open the command Line in the Blockchain-React/naivechain directory and type the following::

* `npm install`
* `HTTP_PORT=3001 P2P_PORT=6001 npm start` (Executes the first Node)
* `HTTP_PORT=3002 P2P_PORT=6002 PEERS=ws://localhost:6001 npm start` (Executes the second Node)
* `HTTP_PORT=3003 P2P_PORT=6003 PEERS=ws://localhost:6001,ws://localhost:6002 npm start` (Executes the third Node)

### Services
Service      | Function
------------ | -------------
http://ip:port/farmerMineBlock | Creation of the Data corresponding to the **Farmer**.
http://ip:port/cooperativeMineBlock | Creation of the Data corresponding to the **Cooperative**.
http://ip:port/retailerMineBlock | Creation of the Data corresponding to the **Retailer**.
http://ip:port/getBoxesByDate | Gets all the boxes bought by the **retailer** ordered by data.
http://ip:port/getBoxes/:date/:produto |  :date (Ex: 14-6-2018), :produto (Ex: truffles) Gets the boxes timeline from a certain product purchased by the **retailer** in a given date.
http://ip:port/cooperativeGetAvailableBoxes | Gets the boxes sold by the **cooperative**
http://ip:port/farmerGetAvailableBoxes | Gets the boxes sold by the **farmer**

### Json Examples

```
Farmer
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
```
Cooperativa
{
  "id": 1,
  "date": "6/10/00",
  "produto": "truffles",
  "custoEntrega": 35,
  "margem": 14,
  "custoFinal": 40.25
}
{
  "id": 2,
  "date": "2/1/00",
  "produto": "tatoes",
  "custoEntrega": 10,
  "margem": 14,
  "custoFinal": 40.25
}
```
```
Retailer
{
  "id": 1,
  "date": "14/10/00",
  "produto": "truffles",
  "custoEntrega": 35,
  "margem": 14,
  "custoFinal": 40.25
}
```
