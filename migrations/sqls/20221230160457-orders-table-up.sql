/* Replace with your SQL commands */
CREATE TABLE orders (
id SERIAL PRIMARY KEY  NOT NULL,
product_id bigint REFERENCES products(id),
user_id bigint REFERENCES users(id),
status VARCHAR(50) NULL
);