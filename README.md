# Storefront Backend Project

## Getting Started

This repo contains a simple app that manages users, products and orders.
To get started run 'npm install' at the project root

## Used Technologies
- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

## Steps to start the app

### 1.  DB Creation and Migrations

- npm run migrate' will create tables in the dev env and will create test database for test env. Note that this command will run once 

### 2. Testing

"npm run test" will
1. Migrate test tables
2. Build type script
3. Test models and routes
4. Drop test tables

### 3. Starting the server

- "npm run start" will run the server on localhost/8000