# BLEND MEDIA BACKEND

Codebase containing CRUD and auth to provide client side for our [project](##Related)

[![dotenv](https://img.shields.io/badge/dotenv-16.0.3-blue)](https://www.npmjs.com/package/dotenv)
[![express](https://img.shields.io/badge/express-4.18.1-blue)](https://www.npmjs.com/package/express)
[![bcrypt](https://img.shields.io/badge/bcrypt-5.0.1-blue)](https://www.npmjs.com/package/bcrypt)
[![jsonwebtoken](https://img.shields.io/badge/jsonwebtoken-8.5.1-blue)](https://www.npmjs.com/package/jsonwebtoken)
[![multer](https://img.shields.io/badge/multer-1.4.4-blue)](https://www.npmjs.com/package/multer)
[![morgan](https://img.shields.io/badge/morgan-1.10.0-blue)](https://www.npmjs.com/package/morganr)
[![postgreSQL](https://img.shields.io/badge/pg-8.8.0-blue)](https://www.npmjs.com/package/morganr)

# Installation

## 1. Clone this repository

Clone this repository by run the following code:

```
$ git clone https://github.com/Rama-z/blend-media
```

## 2. Go to directory

```
$ cd blend-media
```

## 3. Install dependency packages

Install dependency packages by run the following code inside project folder:

```
$ npm install
```

## Application Structure

- `index.js` - The entry point to our application. This file defines our express server and connects it to posgreSQL
- `config/` - This folder contains configuration for passport as well as a central location for configuration/environment variables.
- `routes/` - This folder contains the route definitions for our API.
- `model/` - This folder contains the schema definitions for our sql models.
- `controller/` - This folder contains the schema definitions for unctions that separate out the code to route requests from the code that actually processes requests.
- `views/` - This folder contains a component that responsible for presenting data to the user and handling user interactions
- `middleware/` - This folder contains the schema definitions for middleware.
- `helper/` - This folder contains helper functions to make our code much easier to read
- `public/` - This folder contains uploaded data to our API

## Documentation

[Documentation](https://dark-rocket-410442.postman.co/documentation/23707258-5309d7d3-2d8c-465b-8cc0-e38971d9f6e7/publish?workspaceId=7b0956d0-bbf3-4801-8ca8-3291b3456684)

## Features

- Auth
  - Register
  - Login
  - Logout
- Product
  - Get Product
  - Get Product Detail
  - Edit Product(Admin)
  - Update Product(Admin)
  - Delete Product(Admin)
- Users
  - Get Profile
  - Update Profile
  - Get All User(Admin)
  - Ban User(Admin)
- Transactions
  - Create transaction
  - Get transaction History
  - Delete transactions

## API Reference Example

```http
  GET, POST /products
```

```http
  GET, POST, PATCH, DELETE /products/${id}
```

```http
  GET, POST /transaction
```

```http
  DELETE /transaction/${id}
```

## Authors

- [@Rama-z](https://github.com/Rama-z)
