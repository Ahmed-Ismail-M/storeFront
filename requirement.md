# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index get'/products'
- Show get'/products/:id'
- Create [token required] post'/products'
- Delete [token required] delete'/products'

#### Users
- Index [token required] get'/users'
- Show [token required] get'/users/:id'
- Create  post'/users'
- Delete [token required] delete'/users'
- Sign In  get'/signin'

#### Orders
- Index get'/orders'
- Show get'/orders/:id'
- Create [token required] post'/orders'
- Delete [token required] delete'/orders'

## Data Shapes
#### Product
-  id
- name
- price
- category

#### User
- id
- firstName
- lastName
- password

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)