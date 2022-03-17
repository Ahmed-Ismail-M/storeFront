CREATE TABLE orders( 
      user_id     BIGINT      NOT NULL,
      status      VARCHAR(20),
      id          SERIAL     PRIMARY KEY, 
CONSTRAINT fk_user
      FOREIGN KEY(user_id) 
      REFERENCES users(id) ON DELETE CASCADE
      );