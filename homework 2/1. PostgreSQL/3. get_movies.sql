-- Получение информации по фильму

SELECT 
movie_title AS title, 
movie_quality AS quality, 
movie_year, 
country_name AS country, 
movie_motto AS motto, 
p1.first_name || ' ' || p1.last_name AS director, 
p2.first_name || ' ' || p2.last_name AS writer, 
p3.first_name || ' ' || p3.last_name AS producer, 
p4.first_name || ' ' || p4.last_name AS movie_operator, 
p5.first_name || ' ' || p5.last_name AS composer, 
p6.first_name || ' ' || p6.last_name AS art_director, 
p7.first_name || ' ' || p7.last_name AS editor, 
budget,
budget_marketing,
revenue_usa,
revenue_other,
(revenue_usa + revenue_other) AS revenue_world,
(SELECT premiere_date 
 FROM movie_premiere mp 
 WHERE mp.movie_id = m.movie_id AND mp.country_id = 
	(SELECT country_id 
	 FROM country 
	 WHERE country_name = 'Россия')) AS premiere_ru,
(SELECT MIN(premiere_date) 
 FROM movie_premiere mp 
 WHERE mp.movie_id = m.movie_id) AS premiere_world,
dvd_release,
age,
mpaa,
length_minutes
FROM movie m
INNER JOIN person p1 ON m.directed_by_id = p1.person_id
INNER JOIN person p2 ON m.written_by_id = p2.person_id
INNER JOIN person p3 ON m.produced_by_id = p3.person_id
INNER JOIN person p4 ON m.movie_operator_id = p4.person_id
INNER JOIN person p5 ON m.composer_id = p5.person_id
INNER JOIN person p6 ON m.art_director_id = p6.person_id
INNER JOIN person p7 ON m.edited_by_id = p7.person_id
INNER JOIN country USING(country_id)