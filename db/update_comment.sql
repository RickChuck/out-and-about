UPDATE comments 
SET comment = $1
where comment_id = $2;

SELECT *
FROM comments
WHERE trail_id = $3
ORDER BY comment_id ASC;