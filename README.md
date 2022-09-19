# Getting started

## Installation

Clone the repository

    git clone https://github.com/ozgursolak/crea.git

Switch to the repo folder

    cd crea-assignment
    
Install dependencies
    
    npm install

Create config file and set the JsonWebToken private key

    
    
----------

## Database

The codebase contains database abstractions, namely [TypeORM](http://typeorm.io/). 
    
The branch `main` implements TypeORM with a postgreSQL database.

----------

##### TypeORM

----------

Create a new postgresql database with the name `crea`\
(or the name you specified in the ormconfig.json)
    
Set postgresql database settings in ormconfig.json
```json
  {
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": "postgres",
    "password": "12345",
    "database": "crea",
    "entities": ["dist/**/*.entity.js"],
    "synchronize": true
  }
```
    
Start local mysql server and create new database 'crea'

On application start, tables for all entities will be created.

----------

## NPM scripts

- `npm start` - Start application
- `npm run start:watch` - Start application in watch mode
- `npm run start:prod` - Build application

----------

## API Specification

This application adheres to the api specifications set by the OpenAPI. 

----------

## Start application

- `npm start`
- Test apis with Postman  or directly on swagger.
- **_NOTE:_** Required postman collection is added to the repository. (<em>crea.postman_collection.json</em>)
 
----------

# Authentication
 
This applications uses JSON Web Token (JWT) to handle authentication. The token is passed with each request using the `Authorization` header with `Token` scheme. The authorization and role guards handle the validation and authentication of the token.

----------
 
# Swagger API docs

This repo uses the NestJS swagger module for API documentation. 
The swagger document is served in (https://localhost:3000/docs)
