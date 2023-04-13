Study project.
NestJS, RabbitMQ, PostgresSQL, Docker.
Microservices, JWT authorization.
## Running the app

```bash
# run all
$ docker compose up --build -V 

# test
$ npm run test
```

## API
Registration:
```http request
POST http://localhost:3000/api/registration
```
```json
{
  "firstName": "",
  "lastName": "",
  "phone": "",
  "login": "",
  "password": "",
  "email": ""
}
```
Login:
```http request
POST http://localhost:3000/api/login
```
```json
{
  "password": "",
  "email": ""
}
```
Get profile by id:
```http request
GET http://localhost:3000/api/profiles/1
```
Edit profile by ID:
```http request
PUT http://localhost:3000/api/profiles/16
```
```json
{
  "firstName": "",
  "lastName": "",
  "phone": "",
  "login": "",
  "password": "",
  "email": ""
}
```
Delete profile (and credentials) by ID:
```http request
DELETE http://localhost:3000/profiles/5
```
Create text block:
```http request
POST http://localhost:3000/api/texts/
```
```json
  "title": "",
  "content": "",
  "image": "",
  "uniqueStringId": "",
  "group": ""
```
Get all texts:
```http request
GET http://localhost:3000/api/texts/
```
Get texts by group:
```http request
GET http://localhost:3000/api/texts/group/group1
```
Edit text block:
```http request
PUT http://localhost:3000/api/texts/string-id
```
```json
  "title": "",
  "content": "",
  "image": "",
  "uniqueStringId": "",
  "group": ""
```
Delete text block by unique string id:
```http request
DELETE http://localhost:3000/api/texts/string-id
```

It'll give "Connection to transport failed." error while Docker containers are starting, because rabbitmq container might be late to load, but it'll load eventually.

