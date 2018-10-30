CREATE TABLE comments(
    comment_id SERIAL PRIMARY KEY,
    trail_id TEXT,
    comment TEXT,
    user_id INT
);
