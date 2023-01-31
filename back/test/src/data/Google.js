const dataGoogle = [
  {
    name: 'Register token',
    url: 'http://localhost:8080/api/v1/google/registerToken',
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: {token: 'ya29.a0AVvZVsrc23U2vsna-U3ib958Q4MVjE-8Duf0zv0_DIsvjZFxZ6VARQHl7DoueH9nY2mW_hFpHJujzpaXnMVYJqhdjyLmsDrCSsUfRWR9F7kpUfswGyzLQrB-1o4aeRoAFyydRNvvhyZoPk6K8WafHjIvk6rWaCgYKAf0SARMSFQGbdwaIbQQqFuWidxpnkGfYUNCcxA0163'}
  },
];

//{
//  url: 'http://localhost:8080/api/v1/github/auth',
//  method: "POST",
//  headers: {'Content-Type': 'application/json'},
//  body: {'username': 'username', 'password': 'password'}
//},

module.exports = dataGoogle;