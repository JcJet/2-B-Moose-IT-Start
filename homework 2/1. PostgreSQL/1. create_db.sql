DROP TABLE IF EXISTS movie_person CASCADE;
DROP TABLE IF EXISTS movie_audience CASCADE;
DROP TABLE IF EXISTS movie_audio CASCADE;
DROP TABLE IF EXISTS movie_genre CASCADE;
DROP TABLE IF EXISTS movie_premiere CASCADE;
DROP TABLE IF EXISTS movie CASCADE;
DROP TABLE IF EXISTS person CASCADE;
DROP TABLE IF EXISTS country CASCADE;
DROP TABLE IF EXISTS languages CASCADE;
DROP TABLE IF EXISTS genre CASCADE;
DROP TABLE IF EXISTS distributor CASCADE;
DROP TABLE IF EXISTS movie_subtitles CASCADE;


CREATE TABLE person
(
	person_id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	first_name varchar(64) NOT NULL,
	last_name varchar(64) NOT NULL
);

CREATE TABLE country
(
	country_id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	country_name varchar(64) NOT NULL
);

CREATE TABLE languages
(
	language_id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	language_name varchar(64) NOT NULL
);

CREATE TABLE genre
(
	genre_id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	genre_name varchar(64) NOT NULL
);

CREATE TABLE distributor
(
	distributor_id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	title text NOT NULL,
	company_info text
);

CREATE TABLE movie 
(
	movie_id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	movie_title text NOT NULL,
	movie_quality varchar(64),
	movie_year smallint,
	country_id int REFERENCES country(country_id),
	movie_motto text,
	directed_by_id int REFERENCES person(person_id),
	written_by_id int REFERENCES person(person_id),
	produced_by_id int REFERENCES person(person_id),
	movie_operator_id int REFERENCES person(person_id),
	composer_id int REFERENCES person(person_id),
	art_director_id int REFERENCES person(person_id),
	edited_by_id int REFERENCES person(person_id),
	budget decimal CONSTRAINT CHK_budget CHECK (budget >= 0), 
	budget_marketing decimal CONSTRAINT CHK_budget_marketing CHECK (budget_marketing >= 0),
	revenue_usa decimal CONSTRAINT CHK_revenue_usa CHECK (revenue_usa >=0),
	revenue_other decimal CONSTRAINT CHK_revenue_other CHECK (revenue_other >= 0),
	dvd_release date,
	age varchar(10),
	mpaa varchar(3),
	length_minutes smallint
	
	--CONSTRAINT PK_movie PRIMARY KEY(movie_id)
	--CONSTRAINT FK_movie_person_directed_by REFERENCES person(person_id)
);

CREATE TABLE movie_person
(
	movie_id int REFERENCES movie(movie_id),
	person_id int REFERENCES person(person_id),
	is_main_role bool NOT NULL,
	
	CONSTRAINT movie_person_pkey PRIMARY KEY (movie_id, person_id)
);


CREATE TABLE movie_genre
(
	movie_id int REFERENCES movie(movie_id),
	genre_id int REFERENCES genre(genre_id),
	
	CONSTRAINT movie_genre_pkey PRIMARY KEY (movie_id, genre_id)
);

CREATE TABLE movie_subtitles
(
	movie_id int REFERENCES movie(movie_id),
	language_id int REFERENCES languages(language_id),
	
	CONSTRAINT movie_subtitles_pkey PRIMARY KEY (movie_id, language_id)
);

CREATE TABLE movie_audio
(
	movie_id int REFERENCES movie(movie_id),
	language_id int REFERENCES languages(language_id),
	
	CONSTRAINT movie_audio_pkey PRIMARY KEY (movie_id, language_id)
);

CREATE TABLE movie_premiere
(
	movie_id int REFERENCES movie(movie_id),
	country_id int REFERENCES country(country_id),
	premiere_date date NOT NULL,
	company_id int,
	
	CONSTRAINT movie_premiere_pkey PRIMARY KEY (movie_id, country_id)
);


CREATE TABLE movie_audience
(
	movie_id int REFERENCES movie(movie_id),
	country_id int REFERENCES country(country_id),
	audience_size int NOT NULL,
	
	CONSTRAINT movie_audience_pkey PRIMARY KEY (movie_id, country_id)
);