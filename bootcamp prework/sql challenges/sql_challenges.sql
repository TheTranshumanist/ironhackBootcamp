SELECT SUM(price)
FROM rating;

SELECT MAX(total_ratings)
FROM rating;

SELECT genre, AVG(price)
FROM rating
GROUP BY genre;