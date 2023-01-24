# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index /products
- Show /product/:id
- Create [token required] /product/create
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

#### Users
- Index [token required]
- Show [token required]
- Create N[token required]

#### Orders
- Current Order by user (args: user id)[token required]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category
(
id SERIAL PRIMARY KEY  NOT NULL,
name VARCHAR(50) NOT NULL,
price integer NOT NULL,
category VARCHAR(50) NULL

);

#### User
- id
- firstName
- lastName
- password
(
id SERIAL PRIMARY KEY  NOT NULL,
firstName VARCHAR(50) NOT NULL,
lastName VARCHAR(50) NOT NULL,
username VARCHAR(100) NOT NULL,
password_digest VARCHAR

);

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)
(
id SERIAL PRIMARY KEY  NOT NULL,
product_id bigint REFERENCES products(id),
user_id bigint REFERENCES users(id),
status VARCHAR(50) NULL

);
(
id SERIAL PRIMARY KEY NOT NULL,
quantity  integer,
order_id bigint REFERENCES orders(id),
product_id bigint REFERENCES products(id),

);

Steps Implementation

create db structure
create migrations 
create models
create handlers
finalize authentication
run tests