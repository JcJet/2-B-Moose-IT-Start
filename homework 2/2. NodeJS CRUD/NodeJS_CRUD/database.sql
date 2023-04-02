CREATE TABLE genre
(
	genre_id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	genre_name varchar(64) NOT NULL
);

CREATE TABLE movie
(
	movie_id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	movie_title text NOT NULL,
	movie_year smallint
);

CREATE TABLE movie_genre
(
	movie_id int REFERENCES movie(movie_id),
	genre_id int REFERENCES genre(genre_id),

	CONSTRAINT movie_genre_pkey PRIMARY KEY (movie_id, genre_id)
);