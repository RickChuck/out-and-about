INSERT INTO trails(id, name, city, directions, details, thumbnail)
SELECT $1, $2, $3, $4, $5, $6
WHERE
    NOT EXISTS (
        SELECT id FROM trails WHERE id = $1
    )