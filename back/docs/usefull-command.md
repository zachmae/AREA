# Usefull commands

## Run the back-end

> launch the back-end

```sh
docker compose up --build
```

```sh
docker compose down --remove-orphans #-v
```

## Build an acces to test your work from outside (usefull with different WIFI or using webhook)

```sh
ngrok http 8080
```

## Update the postgres database using docker

docker sign is my prisma client and can talk to my db.
Those command are usefull when you create/update the postgres volume.

> Using this, you can open a shell inside docker

```sh
docker exec -it docker-sign /bin/sh
```

> Then, using this, you can inside docker synchronise the prisma client and the database.

```sh
npx prisma migrate dev
```

## Build a postgres back up

```sh
docker exec -i docker-postgres /usr/bin/pg_dump -U user db > postgres-backup.sql
```

## Get the ip of docker-container to make some test with postman

```sh
docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' <docker-name/id>
```
