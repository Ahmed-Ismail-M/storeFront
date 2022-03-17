CREATE TABLE products(
      name       VARCHAR(100) UNIQUE NOT NULL,
      category   VARCHAR(50),
      price      REAL         NOT NULL,
      id         SERIAL       PRIMARY KEY);