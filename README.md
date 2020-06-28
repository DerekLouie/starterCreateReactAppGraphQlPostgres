# Development

## First Time Setup

You will need Postgres running on your machine to make this app function.

I downloaded [this application](https://postgresapp.com/) to bootstrap a Postgres server on my machine and I would recommend it.

By default the app mentioned above will create a Postgres server with the credentials described in the `.env` file checked in with this repo.

If you change any of the defaults, please also update the `.env` file locally to make sure the app still understands how to connect to your Postgres server.

After installing Postgres and making sure your Postgres server is up, run these commands from the root of the repo:

```bash
$ yarn
$ yarn db:bootstrap
$ yarn start:server
```

## Normal Development

After following the steps in the `First Time Setup` portion of the `README` to do development you can just run:

```bash
$ yarn start:server
```

This will watch for changes you make to your server files and restart the server when it detects changes. With the exception to change to the `schema.graphql` file.

The database is seeded with a user for testing:

* name: `Jack D`
* email: `jack@twitter.com`
* phonenumber: `8888888888`
* password: `password`

## API

After the server is running go to `localhost:3001/graphql` to try these queries / mutations.

### Unauthenticated Routes:
#### `signup`

```graphql
mutation {
  signup(name: "johndoe", email: "johndoe@example.com", phone_number: "1234567891", password: "password") {
    id
    name
    email
    phone_number
    tokens {
      accessToken
    }
  }
}
```

Example Response:

```json
{
  "data": {
    "signup": {
      "id": 3,
      "name": "johndoe",
      "email": "johndoe@example.com",
      "phone_number": "1234567891",
      "tokens": {
        "accessToken":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJuYW1lIjoiam9obmRvZSJ9LCJpYXQiOjE1OTE2NDkxMzQsImV4cCI6MTU5MjU0OTEzNH0.KpbkA7MYDwEaSsV0TSssMTX5OWQPScXJrqK7jksG5UY"
      }
    }
  }
}
```

#### `login`

```graphql
mutation {
  login(login_credential: "johndoe@example.com", password: "password") {
    id
    name
    email
    phone_number
    tokens {
      accessToken
    }
  }
}
```

Example Response:

```json
{
  "data": {
    "login": {
      "id": 3,
      "name": "johndoe",
      "email": "johndoe@example.com",
      "phone_number": "1234567891",
      "tokens": {
        "accessToken":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJuYW1lIjoiam9obmRvZSJ9LCJpYXQiOjE1OTE2NDkxODgsImV4cCI6MTU5MjU0OTE4OH0.AP7d3dVDNgkr-K5y2Et8jzWJakHrAZuLBOy9B0XzIhY"
      }
    }
  }
}
```

### Authenticated Routes:

To access these routes you have to add `HTTP HEADERS` to the playground served off of `localhost:3001/graphql`.

[The headers should be in the format](https://ibb.co/kMVzWyD):

```json
{
  "x-access-token": "ACCESSTOKEN_RETURNED_BY_SIGNUP_OR_LOGIN"
}
```

Please use the `login` or `signup` queries to get an access token to pass above.

#### `me`

```graphql
query {
  me {
    id
    name
    email
    phone_number
  }
}
```

Example Response:

```json
{
  "data": {
    "me": {
      "id": 1,
      "name": "Jack D",
      "email": "jack@twitter.com",
      "phone_number": "8888888888"
    }
  }
}

```

## Frontend

To interact with the web frontend of the app run:

```bash
$ yarn dev
```

This starts the frontend web app and the node server.

You can `login`, `signup`, and `me`

These are the routes that are supported:

* http://localhost:3000/me
* http://localhost:3000/login
* http://localhost:3000/logout

# Design Decisions:

## Database:

Relational (Postgres):

#### Tradeoff's

##### Pro's:

* ACID compliant.
* Can be used as a subscriptions server in lieu of redis for smaller projects.

##### Con's:

* Harder to scale horizontally compared to non-relational databases.

## Authentication:

JWT passed behind an authorization header.

#### Tradeoff's

##### Pro's:

* Stores basic user data in the token that saves us some database lookups.
* We don't need a table to store session info.
* It is simplier to use than sessions (for this usecase).
* It can be used across services.

##### Con's:

* This method of auth makes it hard to revoke. Because we are not looking up the token on each call, we assume if the token has a user object in it it is valid. This is combatted by a very short expiration.
* Cannot manage clients from the server. If we wanted to log out all clients from all devices for a user it would be very difficult.
* This relies on a single secret key, making a comprised secret key a big pain.

## Client:

### Frameworks:

### React (through create-react-app).

#### Tradeoff's

##### Pro's:

* Quick.
* Battle tested.
* Best practices baked in.
* Best solution for a toy project / MVP.

##### Con's:

* Not really built to have a server running in the same project.
* Hard to customize past a certain point.
* Very opinionated.

# Things I did NOT include explicitly:

* Tests - Normally I would write a thorough unit / integration test suite. But for the sake of time I did not for this project.

### Acknowledged Bad Practices I Thought Were Justified In The Context Of A Toy App:

* I checked in an `.env` file. Normally this is a bad thing (because secrets shouldn't be exposed in git repos). Under normal circumstances I would put this info somewhere more secure and setup a system so developers who have permission automatically have these variables avaliable.
* The UI/UX isn't perfect. There are many fine details and cornercases I would have fixed given more time. For example: You can delete the `+1` (country code) portion of the phone number input mask. Given more time I'd fix all of these kinds of UI interactions.

### Improvements for the future:

* Better error handling on the serverside. Right now I just forward sql errors etc to the client. Ideally I'd like to create exception types and raise them in the code whenver I hit a corner case and otherwise bubble up a generic error to the client (and log the real error information to a logging service).
* Better error handling on client. Right now I have an error toast that pops up but it is very simple and could be much better.
* Form validation on the clientside (for emails, phone numbers, passwords etc).
* Field validation on the serverside to make sure things are wellformed before they get written to the database.
