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
