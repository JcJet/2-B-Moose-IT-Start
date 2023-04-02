INSERT INTO country (country_name) 
VALUES 
('США'),
('Россия'),
('Германия'),
('Дания'),
('Швеция'),
('Канада'),
('Финляндия'),
('Франция'),
('Япония'),
('Бразилия'),
('Великобритания'),
('Нидерланды'),
('СССР'),
('Италия'),
('Испания'),
('Чехословакия'),
('Мексика'),
('Германия (ФРГ)'),
('Югославия'),
('Алжир');

select * from country;

INSERT INTO languages (language_name)
VALUES 
('Русский'),
('Английский');

INSERT INTO genre (genre_name)
VALUES 
('драма'),
('фентези'),
('криминал');

INSERT INTO person (first_name, last_name)
VALUES
('Фрэнк', 'Дарабонт'),
('Стивен', 'Кинг'),
('Дэвид', 'Валдес'),
('Дэвид', 'Тэттерсолл'),
('Томас', 'Ньюман'),
('Теренс', 'Марш'),
('Ричард', 'Фрэнсис-Брюс'),
('Том', 'Хэнкс'),
('Дэвид', 'Морс'),
('Бонни', 'Хант'),
('Майкл Кларк', 'Дункан'),
('Джеймс', 'Кромуэлл'),
('Майкл', 'Джитер'),
('Всеволод', 'Кузнецов'),
('Владимир', 'Антоник'),
('Любовь', 'Германова'),
('Валентин', 'Голубенко'),
('Александр', 'Белявский');


INSERT INTO movie (movie_title, movie_quality, movie_year, country_id, movie_motto, directed_by_id, written_by_id, 
				  produced_by_id, movie_operator_id, composer_id, art_director_id, edited_by_id, budget, budget_marketing,
				  revenue_usa, revenue_other, dvd_release, age, mpaa, length_minutes) VALUES
(
	'Зеленая миля (1999)',
	'FullHD',
	'1999',
	1,
	'Пол Эджкомб не верил в чудеса. Пока не столкнулся с одним из них',
	1,
	2,
	3,
	4,
	5,
	6,
	7,
	60000000,
	30000000,
	136801374,
	150000000,
	'13-02-2001',
	'16+',
	'R',
	189
);

INSERT INTO movie_premiere VALUES (1, 1, '06-12-1999');
INSERT INTO movie_premiere VALUES (1, 2, '18-04-2000', 1);

INSERT INTO distributor (title, company_info)
VALUES ('West', 'http://www.westvideo.ru/');

INSERT INTO movie_person VALUES (1, 8, True);
INSERT INTO movie_person VALUES (1, 9, True);
INSERT INTO movie_person VALUES (1, 10, True);
INSERT INTO movie_person VALUES (1, 11, True);
INSERT INTO movie_person VALUES (1, 12, True);
INSERT INTO movie_person VALUES (1, 13, True);
INSERT INTO movie_person VALUES (1, 14, False);
INSERT INTO movie_person VALUES (1, 15, False);
INSERT INTO movie_person VALUES (1, 16, False);
INSERT INTO movie_person VALUES (1, 17, False);
INSERT INTO movie_person VALUES (1, 18, False);

INSERT INTO movie_audience VALUES (1, 1, 26000000);
INSERT INTO movie_audience VALUES (1, 3, 2100000);
INSERT INTO movie_audience VALUES (1, 14, 1700000);

INSERT INTO movie_genre VALUES (1,1);
INSERT INTO movie_genre VALUES (1,2);
INSERT INTO movie_genre VALUES (1,3);

INSERT INTO movie_audio VALUES (1,1);
INSERT INTO movie_audio VALUES (1,2);

INSERT INTO movie_subtitles VALUES (1,1);