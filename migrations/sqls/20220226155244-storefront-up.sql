CREATE TABLE products(
      name       VARCHAR(100) UNIQUE NOT NULL,
      category   VARCHAR(50),
      price      REAL         NOT NULL,
      id         SERIAL       PRIMARY KEY);
CREATE TABLE users(
      first_name  VARCHAR(50) UNIQUE NOT NULL,
      last_name   VARCHAR(50),
      password    VARCHAR     NOT NULL,
      id          SERIAL      PRIMARY KEY);
CREATE TABLE orders( 
      user_id     BIGINT      NOT NULL,
      status      VARCHAR(20),
      id          SERIAL     PRIMARY KEY, 
CONSTRAINT fk_user
      FOREIGN KEY(user_id) 
      REFERENCES users(id) ON DELETE CASCADE
      );
CREATE TABLE order_products( 
id          SERIAL      PRIMARY KEY, 
qty         integer, 
order_id    bigint      REFERENCES orders(id)         ON DELETE CASCADE,
product_id  bigint      REFERENCES products(id)       ON DELETE CASCADE
);