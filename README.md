
# Quekiwi messenger 

A messenger bot client 

## Installation

```bash
$ npm install
```

## Running the app

```bash
$ npm run start:dev
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Docker

### build image

```bash
$ docker build -t quekiwi-messenger .
$ docker run -d --env-file .env -p 3000:3000 --name quekiwi-messenger quekiwi-messenger-container
```
