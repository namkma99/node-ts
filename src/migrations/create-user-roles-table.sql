CREATE TABLE IF NOT EXISTS user_roles (
  id SERIAL PRIMARY KEY,
  role_id INTEGER REFERENCES roles(id) ON DELETE
  SET
    NULL,
    user_id INTEGER REFERENCES users(id) ON DELETE
  SET
    NULL
);