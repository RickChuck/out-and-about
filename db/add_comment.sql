-- CREATE TABLE IF NOT EXISTS comments(
--     comment_id SERIAL PRIMARY KEY,
--     trail_id TEXT,
--     comment TEXT,
--     user_id INT
-- );

INSERT INTO comments (trail_id, comment, user_id)
VALUES ($1, $2, $3);

SELECT *
FROM comments
WHERE trail_id = $1;
