# Blockchain-React Conceitos base

**Requirements:** 
`Node.js`
`Postman(Only to test the services)`

### NaiveChain install

Open the command Line in the Blockchain-React/naivechain directory and type the following:

* `npm install` 
* `npm start 3001 6001` (Executes the first Node with HTTP_PORT:3001 and PEER_PORT:6001)
* `npm start 3002 6002 ws://localhost:6001 ` (Executes the second Node)
* `npm start 3003 6003 ws://localhost:6001,ws://localhost:6002` (Executes the third Node)

### Services (Using Postman W/ Json Examples)
Request method | Service      | Function
-------------- | ------------ | -------------
POST | http://ip:port/farmerMineBlock | Creation of the Data corresponding to the **Farmer**.
POST | http://ip:port/cooperativeMineBlock | Creation of the Data corresponding to the **Cooperative**.
POST | http://ip:port/retailerMineBlock | Creation of the Data corresponding to the **Retailer**.
 GET | http://ip:port/getBoxesByDate | Gets all the boxes bought by the **retailer** ordered by data.
 GET | http://ip:port/getBoxes/:date/:produto |  :date (Ex: 14-6-2018), :produto (Ex: truffles) Gets the boxes timeline from a certain product purchased by the **retailer** in a given date.
 GET | http://ip:port/cooperativeGetAvailableBoxes | Gets the boxes sold by the **cooperative**
 GET | http://ip:port/farmerGetAvailableBoxes | Gets the boxes sold by the **farmer**

### Json Examples

```
Farmer
{
  "id": 2,
  "date": "01/01/2000",
  "produto": "tatoes",
  "custoTransporte": 10,
  "quantidade": 10
}
 
{
  "id": 0,
  "date": "01/01/2000",
  "produto": "tatoes",
  "custoTransporte": 10,
  "quantidade": 10
}
{
  "id": 1,
  "date": "05/10/2000",
  "produto": "truffles",
  "custoTransporte": 5,
  "quantidade": 19
}
```
```
Cooperative
{
  "id": 1,
  "date": "06/10/2000",
  "produto": "truffles",
  "custoEntrega": 35,
  "margem": 14,
  "custoFinal": 40.25
}
{
  "id": 2,
  "date": "02/01/2000",
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
  "date": "14/10/2000",
  "produto": "truffles",
  "custoEntrega": 35,
  "margem": 14,
  "custoFinal": 40.25
}
```
