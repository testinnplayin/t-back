# Installation

This works with the front-end at [https://github.com/testinnplayin/t-front](https://github.com/testinnplayin/t-front). Please see those instructions for installing the front. Use `npm install` or `yarn` to install after downloading this projecgt.

# Resources

The server runs on port 8080. There is also a database requirement. The database connector points to MongoDB at its default address and port (local server and 27017 respectively).

# Running the Project

To run the back-end, use `npm run start` or `yarn start` after launching the database.

# Database Model

The URLCorrespondance model takes on the form:

```json
{
  "originalURL": "string",
  "shortenedURL": "string"
}
```
Both of these fields are unique and required. The `originalURL` field is also an index to aid in finding the appropriate `URLCorrespondance` model in the `url-correspondances` collection of MongoDB. This is due to the fact that we have a write operation involving a search query on that field and thus using this field as an index should be more performant.

# Routes

There are two routes:

`GET /urls/<shortenedURL>` -> finds a `URLCorrespondance` document based on the shortenedURL passed into the parameters

`POST /urls` -> finds a `URLCorrespondance` document based on the `originalURL` that is passed inside the request body. If one cannot be found, then a new `URLCorrespondance` document is generated and saved inside the database. This request returns the `URLCorrespondance` document as JSON.
