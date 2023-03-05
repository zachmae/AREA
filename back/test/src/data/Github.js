const dataGithub = [
  {
    name: 'OAuthApp Code (same as githubapp)',
    url: 'http://localhost:8080/api/v1/github/oauthapp/auth?redirect_uri=http://localhost:8080/api/v1/github/oauthapp/code',
    method: 'GET',
  },
  {
    name: 'OauthApp Token (same as githubapp)',
    url: 'http://localhost:8080/api/v1/github/oauthapp/auth2?code=036a8c97f7b4cb0c7e3f&redirect_uri=http://localhost:8080/api/v1/github/oauthapp/token',
    method: 'GET',
  },
  {
    name: 'GithubApp Code (same as oauthapp)',
    url: 'http://localhost:8080/api/v1/github/githubapp/auth?redirect_uri=http://localhost:8080/api/v1/github/githubapp/code',
    method: 'GET',
  },
  {
    name: 'GithubApp Token (same as oauthapp)',
    url: 'http://localhost:8080/api/v1/github/githubapp/auth2?code=69ccb416638eac51bfdf&redirect_uri=http://localhost:8080/api/v1/github/githubapp/token',
    method: 'GET',
  },
  {
    name: 'GithubApp RefreshToken (githubapp as oauthapp)',
    url: 'http://localhost:8080/api/v1/github/githubapp/refresh?refresh_token=ghr_ZGXHkMyVRY3f37UKpaoQ4on0Nx8NDs1si9icthW4d3p7cSTlOlY7vfq9ArQhv4BUiTBiTO2NV4BY&redirect_uri=http://localhost:8080/api/v1/github/info',
    method: 'GET',
  },
  {
    name: 'Token Webhook star create',
    url : 'http://localhost:8080/api/v1/github/hook/star/create?token=ghu_TIOHHEVefAwRonSMALCFfWMYK0un1R1dj2rn',
    method: 'GET',
  },

];

module.exports = dataGithub;