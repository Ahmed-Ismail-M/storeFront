# Storefront Backend Project

## Getting Started

This repo contains a simple app that manages users, products and orders.
To get started run 'npm install' at the project root

## Used Variables
- POSTGRES_HOST= 127.0.0.1
- POSTGRES_DB=store
- POSTGRES_USER=postgres
- POSTGRES_PASSWORD=postgres
- POSTGRES_TEST_DB=store_test
- BCRYPT_PASSWORD=password123
- SALT_ROUND=10
- TOKEN_SECRET=tokenpassword

## Used Technologies
- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

## Steps to start the app

### 1.  DB Creation and Migrations
1. 'docker-compose up' will generate a pg image with port 5432
2. 'npm run create' will create test database 
3. npm run migrate' will create tables in the dev env and test env. 

### 2. Testing

"npm run test" will
1. Migrate test tables
2. Build type script
3. Test models and routes
4. Drop test tables

### 3. Starting the server

- "npm run start" will run the server on localhost/8000