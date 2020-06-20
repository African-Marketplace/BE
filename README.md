# BE

## Schema

#### Users

| Field    | Type    | Notes                               |
| -------- | ------- | ----------------------------------- |
| id       | integer | _primary key_ and _auto increments_ |
| name     | string  | _required_                          |
| email    | string  | _required_ and _unique_             |
| password | string  | _required_                          |

#### Categories

| Field         | Type    | Notes                               |
| ------------- | ------- | ----------------------------------- |
| id            | integer | _primary key_ and _auto increments_ |
| category_name | string  | _required_ and _unique_             |

#### Locations

| Field         | Type    | Notes                               |
| ------------- | ------- | ----------------------------------- |
| id            | integer | _primary key_ and _auto increments_ |
| location_name | string  | _required_ and _unique_             |

#### Products

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

| Type                                        | Path                          | Notes                                                           |
| ------------------------------------------- | ----------------------------- | --------------------------------------------------------------- |
| [POST](#POST-/api/auth/register)            | /api/auth/register            | registers a new user                                            |
| [POST](#POST-/api/auth/login)               | /api/auth/login               | lets user log in                                                |
| [GET](#GET-/api/products/cat)               | /api/products/cat             | gets all categories, requires authorization                     |
| [GET](#GET-/api/products/cat/:categoryID)   | /api/products/cat/:categoryID | gets products for specified category ID, requires authorization |
| [POST](#POST-/api/products/cat/:categoryID) | /api/products/cat/:categoryID | adds product for specified category ID, requires authorization  |
| [GET](#GET-/api/products/my)                | /api/products/my              | gets products listed by user, requires authorization            |
| [PUT](#PUT-/api/products/my/:id)            | /api/products/my/:id          | updates specified user's product, requires authorization        |
| [DELETE](#DELETE-/api/products/my/:id)      | /api/products/my/:id          | removes specified user's product, requires authorization        |

## Examples

#### POST /api/auth/register

request data:

```
{
  "name": "john doe",
  "email": "john@gmail.com",
  "password": "1234abcd"
}
```

response data:

```
{
  "id": 1,
  "name": "john doe",
  "email": "john@gmail.com",
  "password": "$2a$08$fu4/hK4y0810FZNQQNd/UOEkHrxLRX1hjENpnPM2TtSolLt.EHtVG"
}
```

#### POST /api/auth/login

request data:

```
{
  "email": "john@gmail.com",
  "password": "1234abcd"
}
```

response data:

```
{
  "message": "Successfully logged in",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJuYW1lIjoicGVyc29uIG9uZSIsImVtYWlsIjoicGVyc29uMUBnbWFpbC5jb20iLCJpYXQiOjE1OTI2Njc0MjgsImV4cCI6MTU5MjY3NDYyOH0.qaUab635LsYZMy1XxYZ2EpymUwC4YIMYZ9bzSCqWAIY"
}
```

#### GET /api/products/cat

response data:

```
[
  {
    "id": 1,
    "category_name": "Animal Products"
  },
  {
    "id": 2,
    "category_name": "Beans"
  }
]
```

#### GET /api/products/cat/:categoryID

response data:

```
[
  {
    "id": 1,
    "product": "Eggs",
    "description": "Organic",
    "price": 3.2,
    "category": "Animal Products",
    "location": "Nairobi",
    "seller": "person one"
  }
]
```

#### POST /api/products/cat/:categoryID

request data:

```
{
  "product_name": "Broccoli",
  "description": "Chopped",
  "price": 1.3,
  "location": "Isiolo"
}
```

response data:

```
{
  "id": 6,
  "product_name": "Broccoli",
  "description": "Chopped",
  "price": 1.3,
  "category_id": 5,
  "location_id": 4,
  "seller_id": 1
}
```

#### GET /api/products/my

response data:

```
[
  {
    "id": 1,
    "product": "Eggs",
    "description": "Organic",
    "price": 3.2,
    "category": "Animal Products",
    "location": "Nairobi",
    "seller": "john doe"
  },
  {
    "id": 6,
    "product": "Broccoli",
    "description": "Chopped",
    "price": 1.3,
    "category": "Vegetables",
    "location": "Isiolo",
    "seller": "john doe"
  }
]
```

#### PUT /api/products/my/:id

request data:

```
{
  "product_name": "Broccoli",
  "description": "Whole",
  "price": 10,
  "location": "Nairobi",
  "category": "Vegetables"
}
```

response data:

```
{
  "updatedCount": 1
}
```

#### DELETE /api/products/my/:id

response data:

```
{
  "removedCount": 1
}
```
