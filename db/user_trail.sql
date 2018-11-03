CREATE TABLE user_trail(
    user_id INT REFERENCES users,
    trail_id INT REFERENCES trails
);