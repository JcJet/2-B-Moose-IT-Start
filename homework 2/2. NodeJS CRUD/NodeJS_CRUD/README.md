
# CRUD for movies db

Для запуска сервера, выполнить в директории проекта:
```
npm run dev
```
Добавить жанр к фильму:
```
POST http://localhost:8080/api/genre/movie/<ID фильма>
```
Пример JSON:
```
{
    "genre_id": 5
}
```

Получить список жанров для фильма:
```
GET http://localhost:8080/api/genre/movie/<ID фильма>
```

Изменить название жанра:
```
PUT http://localhost:8080/api/genre/
```
Пример JSON:
```
{
    "genre_id": 1,
    "genre_name": "genre_modified"
}
```
Удалить жанр:
```
DELETE http://localhost:8080/api/genre/<ID жанра>
```
Добавить фильм:
```
POST http://localhost:8080/api/movie
```
Пример JSON:
```
{
    "movie_title": "Title",
    "movie_year": 1999
}
```
Получить список фильмов:
```
GET http://localhost:8080/api/movie
```
Получить фильм по ID:
```
GET http://localhost:8080/api/movie/<ID фильма>
```
Изменить данные фильма:
```
PUT http://localhost:8080/api/movie/
```
Пример JSON:
```
{
    "movie_id": 1,
    "movie_title": "Title_modified",
    "movie_year": 1999
}
```

Удалить фильм:
```
DELETE http://localhost:8080/api/movie/<ID фильма>
```