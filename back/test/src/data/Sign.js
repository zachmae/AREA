const dataSign = [
    {
      name: 'Sign in',
      url:'http://localhost:8080/api/v1/sign/in',
      method:"POST",
      headers: {'Content-Type': 'application/json'},
      body: {'username': 'username', 'password': 'password'}
    },
    {
      name: 'Sign up',
      url: 'http://localhost:8080/api/v1/sign/up',
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: {'username': 'username', 'password': 'password'}
    },
    {
      name: 'Sign out',
      url: 'http://localhost:8080/api/v1/sign/out',
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: {'username': 'username'}
    },
  ];

module.exports = dataSign;