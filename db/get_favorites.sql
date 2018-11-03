SELECT *
FROM trails
JOIN user_trail ON user_trail.trail_id = trails.id
WHERE user_id = $1