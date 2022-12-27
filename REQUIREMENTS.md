API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

API Endpoints

Users
Index: /users [GET]
Read: /users/:id [GET] [token required]
Create: /users/create [POST]
Update: /users/:id [PUT] [token required]
Delete: /users/:id [DELETE] [token required]

Products
Index : /products [GET]
Read: /products/:id [GET]
Create: /products/create [POST] [token required]
Update: /products/:id [PUT] [token required]
Delete: /products/:id [DELETE] [token required]

Orders
Index : /orders [GET]
Read: /orders/:id [GET]
Create: /orders/create [POST] [token required]
Update: /orders/:id [PUT] [token required]
Delete: /orders/:id [DELETE] [token required]

Order products
Index : /order_products [GET]
Read: /order_products/:id [GET]
Create: /order_products/create [POST] [token required]
Update: /order_products/:id [PUT] [token required]
Delete: /order_products/:id [DELETE] [token required]

Data Shapes
User:
{
id SERIAL PRIMARY KEY,
username VARCHAR(100) NOT NULL,
password_digest VARCHAR NOT NULL
};
Product:
{
id SERIAL PRIMARY KEY,
name VARCHAR(100) NOT NULL,
price integer NOT NULL
};

Orders:
{ id SERIAL PRIMARY KEY,
status VARCHAR(15),
user_id bigint REFERENCES users(id)
}

order_products:
{id SERIAL PRIMARY KEY,
quantity integer,
order_id bigint REFERENCES orders(id),
product_id bigint REFERENCES products(id)}
