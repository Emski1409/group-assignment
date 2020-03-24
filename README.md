# Group assignment - quiz

## Installation
Install with the following command
```
make
```
This will remove the current `node_modules` folder, run an `npm i` and initialize the database.

alternatively you can run these steps yourself by running the following
```
npm i
node initialise_database.js
```

## Initialising a Database

Initialize the database with: 
```
make db
```
or through a node command
```
node initialise_database.js
```

## Running the Server

Start the server with:

```
node server.js
```

This will start the server running on `localhost` port `8888`.

## staff test user
To login as staff

- username: `admin`
- password: `password`