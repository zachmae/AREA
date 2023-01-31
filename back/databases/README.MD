# Start it

```s
docker-compose up
```

# Log In

```sh
psql -h localhost -p 5432 -U myuser -W mydb
#or
docker-compose exec db psql -U myuser mydb
```

# Swarn init

```sh
# something like this
swarn init
```

# Create a secret

```sh
docker secret create mysecret "mysecret"
#or
echo "mysecretpassword" | docker secret create mysecret -
```

