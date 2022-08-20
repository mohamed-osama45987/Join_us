DROP database join_us;
CREATE database join_us;

USE join_us;
CREATE TABLE users (
    email VARCHAR(255) PRIMARY KEY NOT NULL ,
    created_at TIMESTAMP DEFAULT NOW()
)