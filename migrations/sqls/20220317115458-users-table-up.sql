CREATE TABLE users(
      first_name  VARCHAR(50) UNIQUE NOT NULL,
      last_name   VARCHAR(50),
      password    VARCHAR     NOT NULL,
      id          SERIAL      PRIMARY KEY);