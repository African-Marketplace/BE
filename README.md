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

| Type                                   | Path                          | Notes                                                           |
| -------------------------------------- | ----------------------------- | --------------------------------------------------------------- |
| [POST](#post-apiauthregister)          | /api/auth/register            | registers a new user                                            |
| [POST](#post-apiauthlogin)             | /api/auth/login               | lets user log in                                                |
| [GET](#get-apiproductscat)             | /api/products/cat             | gets all categories, requires authorization                     |
| [GET](#get-apiproductscatcategoryid)   | /api/products/cat/:categoryID | gets products for specified category ID, requires authorization |
| [POST](#post-apiproductscatcategoryid) | /api/products/cat/:categoryID | adds product for specified category ID, requires authorization  |
| [GET](#get-apiproductsmy)              | /api/products/my              | gets products listed by user, requires authorization            |
| [PUT](#put-apiproductsmyid)            | /api/products/my/:id          | updates specified user's product, requires authorization        |
| [DELETE](#delete-apiproductsmyid)      | /api/products/my/:id          | removes specified user's product, requires authorization        |

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
    "category_name": "Clothing & Apparel"
  },
  {
    "id": 2,
    "category_name": "Authentic Artwork"
  }
]
```

#### GET /api/products/cat/:categoryID

response data:

```
[
  {
    "id": 1,
    "product_name": "Djellaba",
    "description": "African Outer Robe",
    "price": 32,
    "category": "Clothing & Apparel",
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
  "category_id": 4,
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
    "product_name": "Djellaba",
    "description": "African Outer Robe",
    "price": 32,
    "category": "Clothing & Apparel",
    "location": "Nairobi",
    "seller": "john doe"
  },
  {
    "id": 6,
    "product_name": "Broccoli",
    "description": "Chopped",
    "price": 1.3,
    "category": "Food Items",
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
  "category": "Food Items"
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
