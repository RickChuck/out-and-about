DELETE 
FROM comments
WHERE comment_id = $1;

SELECT * 
FROM comments
WHERE trail_id = $2;