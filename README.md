# ChocShop: Backend

This is a very simple backend for the [ChocShop demo](https://www.github.com/mikaelvesavuori/chocshop). It's just a simple API that returns static inventory data with stock status.

The code is formatted for a [Cloudflare Workers](https://workers.cloudflare.com) scenario.

## Connected repositories

There's a range of repos that are connected to the overall ChocShop demo.

For the frontend, you would also need the backend repo to be deployed, or at the very least point to local data unless you want the app to crash.

The VUI apps are entirely elective.

- [ChocShop: Frontend](https://github.com/mikaelvesavuori/chocshop): The main demo app, as seen on [https://chocshop.netlify.app](https://chocshop.netlify.app)
- [ChocShop: Alexa Skill](https://github.com/mikaelvesavuori/chocshop-alexa): VUI assistent which gives you a basic product overview, stock status and price information
- [ChocShop: Google Assistent](https://github.com/mikaelvesavuori/chocshop-assistent): VUI assistent which gives you a basic product overview, stock status and price information

## Calling the API

### Get all items

**GET** `{ENDPOINT_URL}/`

Example: `https://chocshop.{DOMAIN}.workers.dev/`

Returns:

```json
[
  {
    "id": "bar",
    "inStock": true,
    "price": 7.99
  },
  {
    "id": "cake",
    "inStock": true,
    "price": 15.99
  },
  {
    "id": "brownie",
    "inStock": false,
    "price": 4.99
  },
  {
    "id": "box",
    "inStock": true,
    "price": 37.99
  },
  {
    "id": "icecream",
    "inStock": false,
    "price": 3.59
  },
  {
    "id": "pralines",
    "inStock": true,
    "price": 34.99
  }
]
```

### Get a single product by ID

**GET** `{ENDPOINT_URL}/?item={ID}`

Example: `https://chocshop.{DOMAIN}.workers.dev/?item=bar`

Returns:

```json
{
  "id": "bar",
  "inStock": true,
  "price": 7.99
}
```
