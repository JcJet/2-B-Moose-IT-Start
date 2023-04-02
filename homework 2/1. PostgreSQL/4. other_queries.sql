-- Получение списка актеров по фильму
-- В главных ролях:
SELECT (first_name || ' ' || last_name) 
FROM movie_person
INNER JOIN person USING(person_id)
WHERE movie_id = 1 AND is_main_role = true;
-- Роли дублировали:
SELECT (first_name || ' ' || last_name) 
FROM movie_person
INNER JOIN person USING(person_id)
WHERE movie_id = 1 AND is_main_role = false;

-- Получение языков
-- Аудио дорожки:
SELECT language_name 
FROM languages
INNER JOIN movie_audio USING(language_id)
WHERE movie_id = 1;
-- Субтитры:
SELECT language_name 
FROM languages
INNER JOIN movie_subtitles USING(language_id)
WHERE movie_id = 1;

-- Жанры
SELECT genre_name 
FROM genre
INNER JOIN movie_genre USING(genre_id)
WHERE movie_id = 1;

-- Зрители
SELECT country_name, audience_size 
FROM movie_audience
INNER JOIN country USING(country_id)
WHERE movie_id = 1
