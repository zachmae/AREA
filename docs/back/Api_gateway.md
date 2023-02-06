# Instalation

> Setup le projet avec cette liste
```sh
    npm install
    npm audit
```

# SignIn Services

## Sign In

Url:
> `http://localhost:8080/api/v1/sign/in`

Method
> [POST]

header
> - Content-Type: application/json

Body
> - user
> - password

## Sign Up

Url:
> `http://localhost:8080/api/v1/sign/up`

Method
> [POST]

header
> - Content-Type: application/json

Body
> - user
> - password

## Sign Out

Url:
> `http://localhost:8080/api/v1/sign/out`

Method
> [POST]

header
> - Content-Type: application/json

Body
> - user

# About Services

## About.json

Url:
> `http://localhost:8080/about.json`

Method
> [GET]

# Google Services

## Register token

Url:
> `http://localhost:8080/api/v1/google/registerToken`

Method
> [POST]

header
> - Content-Type: application/json

Body
> - token


# Github Services

## OAuthApp Code (test)

Url:
> `http://localhost:8080/api/v1/github/oauthapp/auth`

Queries
> - redirect_url    example: 'http://localhost:8080/api/v1/github/oauthapp/code'

Method:
> [GET]

## OauthApp Token (test)

Url:
> `http://localhost:8080/api/v1/github/oauthapp/auth2`


Queries
> - code            example: '521f0e7c572f27a59742&'
> - redirect_url    example: 'http://localhost:8080/api/v1/github/oauthapp/token'

Method:
> [GET]

## GithubApp Code (test)

Url:
> `http://localhost:8080/api/v1/github/githubapp/auth`

Queries
> - redirect_url    example: 'http://localhost:8080/api/v1/github/githubapp/code'

Method:
> [GET]

## GithubApp Token (test)

Url:
> `http://localhost:8080/api/v1/github/githubapp/auth2`

Queries
> - code            example: '6dff554ec3b86847f3cb'
> - redirect_url    example: 'http://localhost:8080/api/v1/github/githubapp/token'

Method:
> [GET]

## GithubApp RefreshToken (test)

Url:
> `http://localhost:8080/api/v1/github/githubapp/refresh`

Queries
> - refresh_token   example: 'ghr_tTUib3OKVQXkbgFlOOy0Nfx6Ypflg3wZxOyTtnmvDT4V7xJuasegcgSavER1ebt6irsLcl2mk7j5'
> - redirect_url    example: 'http://localhost:8080/api/v1/github/info'

Method:
> [GET]

## Token Webhook Star Create (test)

Url:
> `http://localhost:8080/api/v1/github/hook/star/create`

Queries
> - token           example: 'ghu_TIOHHEVefAwRonSMALCFfWMYK0un1R1dj2rn'

Method:
> [GET]
