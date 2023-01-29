const dataSign = [
    {
      url:'http://localhost:8080/api/v1/sign/in',
      method:"POST",
      headers: {'Content-Type': 'application/json'},
      body: {'username': 'username', 'password': 'password'}
    },
    {
      url: 'http://localhost:8080/api/v1/sign/up',
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: {'username': 'username', 'password': 'password'}
    },
    {
      url: 'http://localhost:8080/api/v1/sign/out',
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: {'username': 'username'}
    },
  ];

module.exports = dataSign;