# Bling! + Pipedrive Integration

## Tools used
- TypeScript
- Node.js
- Express
- Axios
- Lodash
- xml2js
- Mongoose
- Typegoose
- MongoDB Atlas
- dotenv

## Features

- Get all deals with status as Won on Pipedrive CRM
- Generate a XML file with xml2js to sent to Bling! ERP
- Send all new deals to Bling! ERP as an order (Pedido)
- Consolidate all total values them per date

## Routes

> **GET /orders**

**Query params**: none

**Return**: object

```javascript
/**
*
* retorno: original return from Bling! API
*
**/

{	
	retorno: Object
}

```

> **GET /deals**

**Query params**: none

**Return**: object

```javascript
/**
*
* message: friendly messsage informing what route did
* existentDeals: deals already sent to the MongoDB
* newDeals: deals received from Pipedrive API
*
**/

{	
	message: String,
	existentDeals: Array<Object>,
	newDeals: Array<Object>,
}

```

> **GET /consolidate**

**Query params**: none

**Return**: array of objects
```javascript
/**
*
* id: deals dates
* total: sum of deals per date
*
**/

[
	{	
		_id: String,
		total: Number,
	}
]
```

## Getting started

1. Git this repository;
2. Configure a .env file based on .env.example file;
3. Run `yarn dev`
4. Create deals as Won on Pipedrive CRM panel;
5. Go to `localhost:3333/deals` route to get them;
6. Go to `localhost:3333/consolidate` to get the consolidate total value per day;
7. If you want to see all orders already on Bling just run `localhost:3333/orders`