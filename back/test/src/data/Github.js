const dataGithub = [
  {
    name: 'Code',
    url: 'http://localhost:8080/api/v1/github/auth?redirect_uri=http://localhost:8080/api/v1/github/code',
    method: 'GET',
  },
  {
    name: 'Token',
    url: 'http://localhost:8080/api/v1/github/auth2?code=d0bb611cc4e8e581afb3&redirect_uri=http://localhost:8080/api/v1/github/token',
    method: 'GET',
  },
];
//{
//  url: 'http://localhost:8080/api/v1/github/auth',
//  method: "POST",
//  headers: {'Content-Type': 'application/json'},
//  body: {'username': 'username', 'password': 'password'}
//},

module.exports = dataGithub;