const express = require('express');
const router = express.Router();

const {
//OAuthApp
    githubOAuthAppAuth,
    githubOAuthAppCode,
    githubOAuthAppAuth2,
    githubOAuthAppToken,

//GithubApp
    githubGithubAppAuth,
    githubGithubAppCode,
    githubGithubAppAuth2,
    githubGithubAppToken,

    githubGithubAppRefresh,
//Webhook
    githubWebhook,

    githubWebhookInfo,

//StarWebhook
    githubWebhookStarCreate,
/*    githubWebhookStarDelete,*/


} = require('../controllers/github');

router.get('/oauthapp/auth', githubOAuthAppAuth);
router.get('/oauthapp/code', githubOAuthAppCode);
router.get('/oauthapp/auth2', githubOAuthAppAuth2);
router.get('/oauthapp/token', githubOAuthAppToken);

router.get('/githubapp/auth', githubGithubAppAuth);
router.get('/githubapp/code', githubGithubAppCode);
router.get('/githubapp/auth2', githubGithubAppAuth2);
router.get('/githubapp/token', githubGithubAppToken);

router.get('/githubapp/refresh', githubGithubAppRefresh);


router.get('/hook/star/create', githubWebhookStarCreate);
/*router.get('/hook/star/delete', githubWebhookStarDelete);*/

router.post('/webhook/payload', githubWebhook);

router.get('/info', githubWebhookInfo);



module.exports = router;