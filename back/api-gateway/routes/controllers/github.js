const Octokit = require('@octokit/rest');
const { json } = require('body-parser');
const { sendMail } = require('./utils');
const fs = require('fs');

/**
 *
 * @body auth to github with areaApp in oAuth2
 * @param {*} req
 * @param {*} res
 * @doc https://developer.github.com/apps/building-oauth-apps/authorizing-oauth-apps/
 * @info
 *     client_id = 5e98481b009a1a6958ea
 *     redirect_uri = req.query.redirect_uri
 *     scope = read:user,user:email
 *     state = random string to prevent CSRF attacks (https://en.wikipedia.org/wiki/Cross-site_request_forgery)
 *
 */

/**
 * @body github_oauth_app auth
 * @param {*} req
 * @param {*} res
 **/
const githubOAuthAppAuth = ((req, res) => {

    const CLIENT_ID = '5e98481b009a1a6958ea';
    const redirect_uri = req.query.redirect_uri;
    const scope = 'read:user,user:email';

    const state = 'do-not-hack-me'; // '&state=${state}'

    if (!redirect_uri) return res.status(500).send({status: false});
    try { new URL(redirect_uri); }
    catch (e) { return res.status(500).send({status: false}); }

    res.status(200).send({url: `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${redirect_uri}&scope=${scope}`});
});

/**
 * @body github_oauth_app code
 * @param {*} req
 * @param {*} res
 **/
const githubOAuthAppCode = ((req, res) => {
    const code = req.query.code;

    res.status(200).send({code: code});
});

/**
 * @body github_oauth_app auth2
 * @param {*} req
 * @param {*} res
 **/
const githubOAuthAppAuth2 = ((req, res) => {
    const code = req.query.code;
    const redirect_uri = req.query.redirect_uri;

    const CLIENT_ID = '5e98481b009a1a6958ea';
    const CLIENT_SECRET = '185fcd1d6702de833823377c25d448502061cb68';
    const url = `https://github.com/login/oauth/access_token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${code}&redirect_uri=${redirect_uri}`;

    //?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${code}&redirect_uri=${redirect_uri}
    fetch(url,
        { method: 'POST' ,
        headers: { 'Accept': 'application/json' } })
    .then(response => response.json())
    .then(json => {
        res.status(200).send({status: true, json});
    }).catch(err => {
        res.status(500).send({status: false});
    });
});

/**
 * @body github_oauth_app token
 * @param {*} req
 * @param {*} res
 **/
const githubOAuthAppToken = ((req, res) => {
    const token = req.query.token;
    const refresh_token = req.query.refresh_token;

    res.status(200).send({token: token});
});

/**
 *
 * @body  AreaGithubApp
 *
 * @description GithubApp is a github app that can be installed on a github account
 * @doc https://developer.github.com/apps/building-github-apps/identifying-and-authorizing-users-for-github-apps/
 * @info
 *     CLIENT_ID = Iv1.7ca7941a79da3fb9
 *     redirect_uri = req.query.redirect_uri
 *     state = random string to prevent CSRF attacks (https://en.wikipedia.org/wiki/Cross-site_request_forgery)
 *
 **/

/**
 * @body github_github_app auth
 * @param {*} req
 * @param {*} res
 **/
const githubGithubAppAuth = ((req, res) => {
    const CLIENT_ID = 'Iv1.7ca7941a79da3fb9';
    const redirect_uri = req.query.redirect_uri;

    if (!redirect_uri)
        return res.status(500).send({status: false});
    try { new URL(redirect_uri); }
    catch (e) { return res.status(500).send({status: false}); }

    res.status(200).send({url: `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${redirect_uri}`});
});

/**
 * @body github_github_app code
 * @param {*} req
 * @param {*} res
 */
const githubGithubAppCode = ((req, res) => {
    const code = req.query.code;

    res.status(200).send({code: code});
});

/**
 * @body github_github_app auth2
 * @param {*} req
 * @param {*} res
 */
const githubGithubAppAuth2 = ((req, res) => {
    const code = req.query.code;
    const redirect_uri = req.query.redirect_uri;

    const CLIENT_ID = 'Iv1.7ca7941a79da3fb9';
    const CLIENT_SECRET = '26722f033fb0db2e2c40ed18266df5722a8a4869';
    const url = `https://github.com/login/oauth/access_token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${code}&redirect_uri=${redirect_uri}`;

    //?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${code}&redirect_uri=${redirect_uri}
    fetch(url,
        { method: 'POST' ,
        headers: { 'Accept': 'application/json' } })
    .then(response => response.json())
    .then(json => {
        res.status(200).send({status: true, json});
    }).catch(err => {
        res.status(500).send({status: false});
    });
});

/**
 * @body github_github_app token
 * @param {*} req
 * @param {*} res
 */
const githubGithubAppToken = ((req, res) => {
    const token = req.query.access_token;
    const refresh_token = req.query.refresh_token;
    const type = req.query.token_type;


    res.status(200).send({token: token});
});

/**
 * @body github_github_app auth2
 * @param {*} req
 * @param {*} res
 */
const githubGithubAppRefresh = ((req, res) => {
    const refresh_token = req.query.refresh_token;
    const redirect_uri = req.query.redirect_uri;

    const CLIENT_ID = 'Iv1.7ca7941a79da3fb9';
    const CLIENT_SECRET = '26722f033fb0db2e2c40ed18266df5722a8a4869';
    const grant_type = 'refresh_token';
    const url = `https://github.com/login/oauth/access_token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&refresh_token=${refresh_token}&grant_type=${grant_type}`;

    //?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${code}&redirect_uri=${redirect_uri}
    fetch(url,
        { method: 'POST' ,
        headers: { 'Accept': 'application/json' } })
    .then(response => response.json())
    .then(json => {
        res.status(200).send({status: true, json});
    }).catch(err => {
        res.status(500).send({status: false});
    });
});


/**
 *
 * @body  Webhook
 *
 * @description GithubApp is a github app that can be installed on a github account
 * @doc https://docs.github.com/fr/rest/apps/webhooks?apiVersion=2022-11-28
 *
 * @doc https://docs.github.com/fr/developers/webhooks-and-events/webhooks/webhook-events-and-payloads#create
 *
 **/

const githubWebhook = ((req, res) => {

    if (req.headers['x-github-event'] === 'star') {
        const payload = JSON.parse(req.body.payload);
        const full_name = payload.repository.full_name;
        const action = (payload.action === 'created') ? 'stared' : (payload.action === 'deleted') ? 'unstared' : 'unknown';

        githubMailStar('area.bot@outlook.com', 'Azerty123!', 'perry.chouteau@epitech.eu', `(if) Your repository ${full_name} has been stared`, `(if)Hello, your repository ${full_name} has been ${action} by someone.`);

        res.status(200).send({status: true, body: body, headers: headers});
    }
});

const githubMailStar = ((from, password, to, subject, message) => {
    sendMail(from, password, to, subject, message);
});

const githubWebhookInfo = ((req, res) => {
    const body = req.body;
    const query = req.query;

    res.status(200).send({status: true, body: body, query: query});
});

const githubWebhookStarCreate = ((req, res) => {
    console.log("STAR CREATE > TOKEN" + req.query.token);
    const client    = new Octokit({
        auth: req.query.token,
        userAgent: 'AreaApiGateway/1.0.0',
        timeZone: 'Europe/Paris',
    });
//    res.status(200).send({status: true});
    return;
    client.repos.createWebhook({
        owner: 'Perry-chouteau',
        repo: 'my_small_webhook',
        name: 'star_create',
        events: ['star'],
        config: {
            url: 'https://b431-163-5-23-68.eu.ngrok.io/github/webhook/payload',
            content_type: 'json',
        }
    }).then((response) => {
        response.json()
//        res.status(200).send({status: true, response: response});
    }).then((response) => {
        res.status(200).send({status: true, response: response});
    }).catch((err) => {
        res.status(500).send({status: false, err: err});
    });
    res.status(200).send({status: true});
});

/*const githubWebhookStarDelete = ((req, res) => {
    const client    = new Octokit({
        auth: req.query.token,
    });

    client.repos.deleteWebhook({
        owner: 'Perry-chouteau',
        repo: 'my_small_webhook',
        webhook_id: req.query.webhook_id,
    }).then((response) => {
        res.status(200).send({status: true, response: response});
    }).catch((err) => {
        res.status(500).send({status: false, err: err});
    });
});*/

module.exports = {
    githubOAuthAppAuth,
    githubOAuthAppCode,
    githubOAuthAppAuth2,
    githubOAuthAppToken,

    githubGithubAppAuth,
    githubGithubAppCode,
    githubGithubAppAuth2,
    githubGithubAppToken,

    githubGithubAppRefresh,

    githubWebhook,

    githubWebhookInfo,

    githubWebhookStarCreate,
/*    githubWebhookStarDelete,*/
}