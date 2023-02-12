# Tutorial

docs: [dockerized prisma & postgres api](https://www.section.io/engineering-education/dockerized-prisma-postgres-api/)

## Setup history

```sh
  994  npm init -y
  995  npm install prisma @prisma/client
  996  prisma init
  997  npx prisma init
  998  npm install express @prisma/client
  999  npm install prisma --save-dev
# terminal 1
 1000  docker-compose up
 1001  npm install cors #(just a midleware for express not required)
# terminal 2
 1022  docker exec -it prisma-postgres-api /bin/sh
      $ ...
```

## terminal 1

```sh
[pchouteau@my-pdesk my_small_dockerized_prismaApi2]$ docker compose up --build
[+] Building 17.8s (14/14) FINISHED
 => [internal] load .dockerignore    0.1s
 => => transferring context: 52B     0.0s
 => [internal] load build definitio  0.1s
 => => transferring dockerfile 209B  0.0s
 => [internal] load metadata for do  0.8s
 => [auth] library/node:pull token   0.0s
 => [1/8] FROM docker.io/library/no  0.0s
 => [internal] load build context    0.0s
 => => transferring context 26.68kB  0.0s
 => CACHED [2/8] WORKDIR /app        0.0s
 => [3/8] COPY package*.json ./      0.4s
 => [4/8] COPY prisma ./prisma/      0.2s
 => [5/8] COPY .env ./               0.2s
 => [6/8] COPY . .                   0.2s
 => [7/8] RUN npm install           10.6s
 => [8/8] RUN npx prisma generate    3.5s
 => exporting to image               1.7s
 => => exporting layers              1.7s
 => => writing image sha256:c34606e  0.0s
 => => naming to docker.io/library/  0.0s
[+] Running 0/0
[+] Running 0/1mall_dockerized_prismaapi2_[+] Running 1/1mall_dockerized_prismaapi2_ ⠿ Network my_small_dockerized_prismaapi2_[+] Running 1/2d 0.2s
 ⠿ Network my_small_dockerized_prismaapi2_[+] Running 2/2d 0.2ss
 ⠿ Network my_small_dockerized_prismaapi2_default  Created 0.2ss
[+] Running 3/3stgres                      ⠿ Network my_small_dockerized_prismaapi2_default  Created 0.2sostgres-api           ⠿ Container postgres                              Created 0.2s
 ⠿ Container prisma-postgres-api                   Created 0.1s
Attaching to postgres, prisma-postgres-api
postgres             |
postgres             | PostgreSQL Database directory appears to contain a database; Skipping initialization
postgres             |
postgres             | 2023-02-11 22:25:39.911 UTC [1] LOG:  starting PostgreSQL 15.2 (Debian 15.2-1.pgdg110+1) on x86_64-pc-linux-gnu, compiled by gcc (Debian 10.2.1-6) 10.2.1 20210110, 64-bit
postgres             | 2023-02-11 22:25:39.911 UTC [1] LOG:  listening on IPv4 address "0.0.0.0", port 5432
postgres             | 2023-02-11 22:25:39.911 UTC [1] LOG:  listening on IPv6 address "::", port 5432
postgres             | 2023-02-11 22:25:39.920 UTC [1] LOG:  listening on Unix socket "/var/run/postgresql/.s.PGSQL.5432"
postgres             | 2023-02-11 22:25:39.934 UTC [29] LOG:  database system was interrupted; last known up at 2023-02-11 22:23:13 UTC
postgres             | 2023-02-11 22:25:39.985 UTC [29] LOG:  database system was not properly shut down; automatic recovery in progress
postgres             | 2023-02-11 22:25:39.992 UTC [29] LOG:  redo starts at 0/1955E30
postgres             | 2023-02-11 22:25:39.994 UTC [29] LOG:  invalid record length at 0/1976290: wanted 24, got 0
postgres             | 2023-02-11 22:25:39.994 UTC [29] LOG:  redo done at 0/1976258 system usage: CPU: user: 0.00 s, system: 0.00 s, elapsed: 0.00 s
postgres             | 2023-02-11 22:25:40.014 UTC [27] LOG:  checkpoint starting: end-of-recovery immediate wait
postgres             | 2023-02-11 22:25:40.074 UTC [27] LOG:  checkpoint complete: wrote 28 buffers (0.2%); 0 WAL file(s) added, 0 removed, 0 recycled; write=0.004 s, sync=0.033 s, total=0.064 s; sync files=7, longest=0.006 s, average=0.005 s; distance=129 kB, estimate=129 kB
postgres             | 2023-02-11 22:25:40.083 UTC [1] LOG:  database system is ready to accept connections
prisma-postgres-api  |
prisma-postgres-api  | > my_small_dockerized_prismaapi2@1.0.0 start
prisma-postgres-api  | > node index.js
prisma-postgres-api  |
prisma-postgres-api  | Server is running on port 7000
postgres             | 2023-02-11 22:26:01.796 UTC [33] ERROR:  relation "public.Todo" does not exist at character 177
postgres             | 2023-02-11 22:26:01.796 UTC [33] STATEMENT:  SELECT "public"."Todo"."id", "public"."Todo"."createdAt", "public"."Todo"."updatedAt", "public"."Todo"."title", "public"."Todo"."description", "public"."Todo"."completed" FROM "public"."Todo" WHERE 1=1 OFFSET $1
postgres             | 2023-02-11 22:37:17.489 UTC [111] ERROR:  relation "_prisma_migrations" does not exist at character 126
postgres             | 2023-02-11 22:37:17.489 UTC [111] STATEMENT:  SELECT "id", "checksum", "finished_at", "migration_name", "logs", "rolled_back_at", "started_at", "applied_steps_count" FROM "_prisma_migrations" ORDER BY "started_at" ASC
postgres             | 2023-02-11 22:37:17.838 UTC [27] LOG:  checkpoint starting: immediate force wait
postgres             | 2023-02-11 22:37:17.907 UTC [27] LOG:  checkpoint complete: wrote 4 buffers (0.0%); 1 WAL file(s) added, 0 removed, 0 recycled; write=0.005 s, sync=0.015 s, total=0.070 s; sync files=4, longest=0.004 s, average=0.004 s; distance=4228 kB, estimate=4228 kB
postgres             | 2023-02-11 22:37:18.257 UTC [27] LOG:  checkpoint starting: immediate force wait
postgres             | 2023-02-11 22:37:18.313 UTC [27] LOG:  checkpoint complete: wrote 4 buffers (0.0%); 0 WAL file(s) added, 0 removed, 1 recycled; write=0.006 s, sync=0.018 s, total=0.057 s; sync files=4, longest=0.007 s, average=0.005 s; distance=4228 kB, estimate=4228 kB
postgres             | 2023-02-11 22:37:18.631 UTC [27] LOG:  checkpoint starting: immediate force wait
postgres             | 2023-02-11 22:37:18.847 UTC [27] LOG:  checkpoint complete: wrote 48 buffers (0.3%); 0 WAL file(s) added, 0 removed, 0 recycled; write=0.012 s, sync=0.182 s, total=0.217 s; sync files=37, longest=0.037 s, average=0.005 s; distance=4380 kB, estimate=4380 kB
postgres             | 2023-02-11 22:38:14.393 UTC [27] LOG:  checkpoint starting: immediate force wait
postgres             | 2023-02-11 22:38:14.468 UTC [27] LOG:  checkpoint complete: wrote 5 buffers (0.0%); 0 WAL file(s) added, 0 removed, 0 recycled; write=0.009 s, sync=0.038 s, total=0.076 s; sync files=5, longest=0.010 s, average=0.008 s; distance=4228 kB, estimate=4365 kB
postgres             | 2023-02-11 22:38:38.204 UTC [27] LOG:  checkpoint starting: immediate force wait
postgres             | 2023-02-11 22:38:38.394 UTC [27] LOG:  checkpoint complete: wrote 41 buffers (0.3%); 0 WAL file(s) added, 0 removed, 0 recycled; write=0.010 s, sync=0.157 s, total=0.190 s; sync files=36, longest=0.013 s, average=0.005 s; distance=4390 kB, estimate=4390 kB
postgres             | 2023-02-11 22:38:38.745 UTC [27] LOG:  checkpoint starting: immediate force wait
postgres             | 2023-02-11 22:38:38.836 UTC [27] LOG:  checkpoint complete: wrote 14 buffers (0.1%); 0 WAL file(s) added, 0 removed, 1 recycled; write=0.007 s, sync=0.055 s, total=0.092 s; sync files=13, longest=0.007 s, average=0.005 s; distance=4253 kB, estimate=4376 kB
postgres             | 2023-02-11 22:38:39.188 UTC [27] LOG:  checkpoint starting: immediate force wait
postgres             | 2023-02-11 22:38:39.236 UTC [27] LOG:  checkpoint complete: wrote 4 buffers (0.0%); 0 WAL file(s) added, 0 removed, 0 recycled; write=0.006 s, sync=0.017 s, total=0.049 s; sync files=4, longest=0.005 s, average=0.005 s; distance=4254 kB, estimate=4364 kB
postgres             | 2023-02-11 22:38:39.481 UTC [27] LOG:  checkpoint starting: immediate force wait
postgres             | 2023-02-11 22:38:39.530 UTC [27] LOG:  checkpoint complete: wrote 4 buffers (0.0%); 0 WAL file(s) added, 0 removed, 0 recycled; write=0.007 s, sync=0.019 s, total=0.049 s; sync files=4, longest=0.007 s, average=0.005 s; distance=4254 kB, estimate=4353 kB
postgres             | 2023-02-11 22:43:39.605 UTC [27] LOG:  checkpoint starting: time
postgres             | 2023-02-11 22:43:40.263 UTC [27] LOG:  checkpoint complete: wrote 7 buffers (0.0%); 0 WAL file(s) added, 0 removed, 0 recycled; write=0.603 s, sync=0.024 s, total=0.659 s; sync files=6, longest=0.006 s, average=0.004 s; distance=1 kB, estimate=3917 kB
```

## terminal 2

```sh
[pchouteau@my-pdesk my_small_dockerized_prismaApi2]$ docker exec -it prisma-postgres-api /bin/sh
/app # npx prisma migrate dev
Environment variables loaded from .env
Prisma schema loaded from prisma/schema.prisma
Datasource "db": PostgreSQL database "Todo", schema "public" at "postgres:5432"

✔ Enter a name for the new migration: … Todo
Applying migration `20230211223814_todo`

The following migration(s) have been created and applied from new schema changes:

migrations/
  └─ 20230211223814_todo/
    └─ migration.sql

Your database is now in sync with your schema.

✔ Generated Prisma Client (4.10.1 | library) to ./node_modules/@prisma/client in 182ms


/app # npx prisma migrate dev
Environment variables loaded from .env
Prisma schema loaded from prisma/schema.prisma
Datasource "db": PostgreSQL database "Todo", schema "public" at "postgres:5432"


Already in sync, no schema change or pending migration was found.

✔ Generated Prisma Client (4.10.1 | library) to ./node_modules/@prisma/client in 172ms


/app #
```