# BE

## Schema

### Users

| Field    | Type    | Notes                               |
| -------- | ------- | ----------------------------------- |
| id       | integer | _primary key_ and _auto increments_ |
| name     | string  | _required_                          |
| email    | string  | _required_ and _unique_             |
| password | string  | _required_                          |

### Categories

| Field         | Type    | Notes                               |
| ------------- | ------- | ----------------------------------- |
| id            | integer | _primary key_ and _auto increments_ |
| category_name | string  | _required_ and _unique_             |

### Locations

| Field         | Type    | Notes                               |
| ------------- | ------- | ----------------------------------- |
| id            | integer | _primary key_ and _auto increments_ |
| location_name | string  | _required_ and _unique_             |

### Products

| Field        | Type    | Notes                                                             |
| ------------ | ------- | ----------------------------------------------------------------- |
| id           | integer | _primary key_ and _auto increments_                               |
| product_name | string  | _required_                                                        |
| description  | string  | _required_                                                        |
| price        | float   | _required_ and _unsigned_                                         |
| category_id  | integer | _foreign key_, _required_, _unsigned_, _references categories.id_ |
| location_id  | integer | _foreign key_, _required_, _unsigned_, _references locations.id_  |
| seller_id    | integer | _foreign key_, _required_, _unsigned_, _references users.id_      |

## API

BASE URL: https://afr-marketplace.herokuapp.com/

test accounts:

```
{
  "name": "person one",
  "email": "person1@gmail.com",
  "password": "123pop"
}

{
  "name": "person two",
  "email": "person2@gmail.com",
  "password": "123pop"
}

```

### Table of Contents

| Type   | Path                          | Notes                                                           |
| ------ | ----------------------------- | --------------------------------------------------------------- |
| POST   | /api/auth/register            | registers a new user                                            |
| POST   | /api/auth/login               | lets user log in                                                |
| GET    | /api/products/cat             | gets all categories, requires authorization                     |
| GET    | /api/products/cat/:categoryID | gets products for specified category ID, requires authorization |
| POST   | /api/products/cat/:categoryID | adds product for specified category ID, requires authorization  |
| GET    | /api/products/my              | gets products listed by user, requires authorization            |
| PUT    | /api/products/my/:id          | updates specified user's product, requires authorization        |
| DELETE | /api/products/my/:id          | removes specified user's product, requires authorization        |
