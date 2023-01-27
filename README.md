# Storefront Backend Project

## Martins Kayode Done Project

Some requirements listed out are as follows:

1. Port number for db and server.
2. Environment variables.
3. Package installation instructions.
4. Setup db and server instructions.
5. Database schema with column name and type.
6. Endpoints such as GET /users.


1. Port number for db and server.
The DB is running on port 5432.
The Server is running on port 3200.


2. Environment Variables


POSTGRES_HOST=127.0.0.1

POSTGRES_DB_TEST=store_front_test

POSTGRES_DB=store_front

POSTGRES_USER=db_user

POSTGRES_PASSWORD=db_password

ENV=dev

BCRYPT_PASSWORD=set_world_defense_dmz

SALT_ROUNDS=10

TOKEN_SECRET=createASecret


3. Package installation instructions.

run yarn install to add the dependencies


4. Setup db and server instructions.

To start a user should be created to manage the database with full access/privilege
two databases would be created one for testing and the live/dev db as seen in the ENV Variables
After creating these the database is ready, add details are in the database.json

{
    "dev": {
      "driver": "pg",
      "host": "127.0.0.1",
      "database": "store_front",
      "user": "db_user",
      "password": "db_password"
    },
    "test": {
      "driver": "pg",
      "host": "127.0.0.1",
      "database": "store_front_test",
      "user": "db_user",
      "password": "db_password"
    }
  }

The next step is to create the database and the user, this can be done with SQL or via the CLI, it is needed in order to connect to the database

  **Create user**

CREATE USER db_user WITH PASSWORD "db_password.

  **Create two databases**

CREATE DATABASE store_front;
CREATE DATABASE store_front_test; 

*Grant all privileges to db_user in both databases**

GRANT ALL PRIVILEGES ON DATABASE store_front TO db_user;
GRANT ALL PRIVILEGES ON DATABASE store_front_test TO db_user:

The server.ts file houses the server configuration

To start the server
run yarn watch


5. Database schema with column name and type
CREATE TABLE users (
id SERIAL PRIMARY KEY  NOT NULL,
firstName VARCHAR(100) NOT NULL,
lastName VARCHAR(100) NOT NULL,
username VARCHAR(100) NOT NULL,
password_digest VARCHAR
);

CREATE TABLE products (
id SERIAL PRIMARY KEY  NOT NULL,
name VARCHAR(64) NOT NULL,
price integer NOT NULL,
category VARCHAR(50) NULL
);

CREATE TABLE orders (
id SERIAL PRIMARY KEY  NOT NULL,
user_id bigint REFERENCES users(id),
status VARCHAR(50) NULL
);

CREATE TABLE orders_products (
id SERIAL PRIMARY KEY NOT NULL,
quantity integer,
order_id bigint REFERENCES orders(id),
product_id bigint REFERENCES products(id)
);

run db-migrate up:all


6. Endpoints such as GET /users

run yarn test to validate these routes

userRoutes
GET /users
GET /users/:id
POST /users
POST /users/authenticate

productRoutes
GET /products
GET /products/:id
POST /products
GET /products/category/:id

orderRoutes
GET /orders/:userID/all
GET /orders/:userID
POST /orders/create
POST /users/:userID/orders/:orderID/products



Models created

User
Product
Order

User

create - /users - post - {"firstname":"string", "lastname":"string"."username":"string", "password":"string"}

show - /users/:id

index - 0.0.0.0:3200/users - requires token

authenticate to get token - /users/authenticate - post - {"username":"string", "password":"string"}


Product

index - 0.0.0.0:3200/products

show - /products/:productID

create - /products - "name":"Cisco X33", "price":"1300", "category":"Server"


Order

index - /orders/:userID/all 

show active orders /orders/:userID

add products - /users/:userID/orders/:orderID/products - post - {
    "quantity": "3",
    "orderId": "2",
    "productId": "3"
}

create - /orders/create - post - {
    "userID":"2",
    "status":"active"
}


## Getting Started

This repo contains a basic Node and Express app to get you started in constructing an API. To get started, clone this repo and run `yarn` in your terminal at the project root.

## Required Technologies
Your application must make use of the following libraries:
- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

## Steps to Completion

### 1. Plan to Meet Requirements

In this repo there is a `REQUIREMENTS.md` document which outlines what this API needs to supply for the frontend, as well as the agreed upon data shapes to be passed between front and backend. This is much like a document you might come across in real life when building or extending an API. 

Your first task is to read the requirements and update the document with the following:
- Determine the RESTful route for each endpoint listed. Add the RESTful route and HTTP verb to the document so that the frontend developer can begin to build their fetch requests.    
**Example**: A SHOW route: 'blogs/:id' [GET] 

- Design the Postgres database tables based off the data shape requirements. Add to the requirements document the database tables and columns being sure to mark foreign keys.   
**Example**: You can format this however you like but these types of information should be provided
Table: Books (id:varchar, title:varchar, author:varchar, published_year:varchar, publisher_id:string[foreign key to publishers table], pages:number)

**NOTE** It is important to remember that there might not be a one to one ratio between data shapes and database tables. Data shapes only outline the structure of objects being passed between frontend and API, the database may need multiple tables to store a single shape. 

### 2.  DB Creation and Migrations

Now that you have the structure of the databse outlined, it is time to create the database and migrations. Add the npm packages dotenv and db-migrate that we used in the course and setup your Postgres database. If you get stuck, you can always revisit the database lesson for a reminder. 

You must also ensure that any sensitive information is hashed with bcrypt. If any passwords are found in plain text in your application it will not pass.

### 3. Models

Create the models for each database table. The methods in each model should map to the endpoints in `REQUIREMENTS.md`. Remember that these models should all have test suites and mocks.

### 4. Express Handlers

Set up the Express handlers to route incoming requests to the correct model method. Make sure that the endpoints you create match up with the enpoints listed in `REQUIREMENTS.md`. Endpoints must have tests and be CORS enabled. 

### 5. JWTs

Add JWT functionality as shown in the course. Make sure that JWTs are required for the routes listed in `REQUIUREMENTS.md`.

### 6. QA and `README.md`

Before submitting, make sure that your project is complete with a `README.md`. Your `README.md` must include instructions for setting up and running your project including how you setup, run, and connect to your database. 

Before submitting your project, spin it up and test each endpoint. If each one responds with data that matches the data shapes from the `REQUIREMENTS.md`, it is ready for submission!
