CREATE TABLE products(name VARCHAR(100) UNIQUE NOT NULL, category VARCHAR(50), price REAL NOT NULL,  id SERIAL PRIMARY KEY);
CREATE TABLE users(first_name VARCHAR(50) UNIQUE NOT NULL, last_name VARCHAR(50), password VARCHAR NOT NULL,  id SERIAL PRIMARY KEY);
CREATE TABLE orders( product_id INT NOT NULL, user_id INT NOT NULL, status VARCHAR(20), qty Integer, id SERIAL PRIMARY KEY, 
CONSTRAINT fk_product
      FOREIGN KEY(product_id) 
	  REFERENCES products(id) ON DELETE CASCADE,
CONSTRAINT fk_user
      FOREIGN KEY(user_id) 
	  REFERENCES users(id) ON DELETE CASCADE
      );