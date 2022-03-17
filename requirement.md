# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index get'/products'
- Show get'/products/:id'
- Create [token required] post'/products'
- Delete [token required] delete'/products'
- Update [token required] put'/products/:id'

#### Users
- Create  post'/users'
- Sign In  get'/signin'
- Index [token required] get'/users'
- Show [token required] get'/users/:id'
- Delete [token required] delete'/users'
- Update [token required] put'/users/:id'

#### Orders
- Index get'/orders'
- Show get'/orders/:id'
- Create [token required] post'/orders'
- Delete [token required] delete'/orders'
- Update [token required] put'/orders/:id'

## Data Shapes
#### Products
Column | Type
--- | --- |
id | SERIAL       PRIMARY KEY
name | VARCHAR(100) UNIQUE NOT NULL
price | REAL         NOT NULL
category | VARCHAR(50)

#### Users
Column | Type
--- | --- |
id | SERIAL  PRIMARY KEY
firstName |  VARCHAR(50) UNIQUE NOT NULL
lastName | VARCHAR(50)
password | VARCHAR     NOT NULL

#### Orders
Column | Type
--- | --- |
id | SERIAL  PRIMARY KEY
user_id |  BIGINT      NOT NULL  REFERENCES users(id) ON DELETE CASCADE
status  |  VARCHAR(20)

#### OrdersProduct
Column | Type
--- | --- |
id | SERIAL  PRIMARY KEY
quantity | integer     NOT NULL
product_id |  bigint      NOT NULL REFERENCES products(id)       ON DELETE CASCADE
order_id |  bigint      NOT NULL REFERENCES orders(id)         ON DELETE CASCADE