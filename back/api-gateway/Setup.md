# Instalation

> Setup le projet avec cette liste
```sh
npm install @grpc/grpc-js
npm install @grpc/proto-loader
npm install body-parser
npm install cors
npm install express
```

# Protocole

```sh
#on your linux shell using ifconfig
$ ifconfig -a | grep -o "inet [A-Za-z0-9.]*" | tail -1
$ inet 10.68.246.139
# if you want only the number
$ ifconfig -a | grep -o "inet [0-9.]*" | tail -1 | grep -o "[0-9.]*" > env.conf
```

# DDcLient + domains.google.com

ddclient.conf
```conf
ssl=yes
protocol=googledomains
login=generated_username
password=generated_password
your_resource.your_domain.tld
```

https://support.google.com/domains/answer/6147083?authuser=0&hl=fr

curl https://__USER__:__PASSWORD__@domains.google.com/nic/update?hostname=__SUBDOMAIN__.__DOMAIN__.com&myip=__IP__

- __USER__      generated_username
- __PASSWORD__  generated_password
- __SUBDOMAIN__ me
- __DOMAIN__    perrychouteau
- __IP__        https://domains.google.com/checkip

#