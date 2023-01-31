const fs = require('fs');

/**
 *
 * @body auth to github with areaApp in oAuth2
 * @param {*} req
 * @param {*} res
 * @doc https://developer.github.com/apps/building-oauth-apps/authorizing-oauth-apps/
 * @info
 *     state = random string to prevent CSRF attacks (https://en.wikipedia.org/wiki/Cross-site_request_forgery)
 *     scope = read:user,user:email
 *     redirect_uri = http://localhost:8080/api/v1/github/callback
 *     client_id = 5e98481b009a1a6958ea
 *
 */
const githubAuth = ((req, res) => {

    const CLIENT_ID = '5e98481b009a1a6958ea';
    const redirect_uri = req.query.redirect_uri;
    const scope = 'read:user,user:email';
    if (!redirect_uri)
        return res.status(500).send({status: false});
    try { new URL(redirect_uri); }
    catch (e) { return res.status(500).send({status: false}); }

    const state = 'do-not-hack-me'; // '&state=${state}'
//    res.status(200).redirect(`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${redirect_uri}&scope=${scope}`);
    res.status(200).send({url: `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${redirect_uri}&scope=${scope}`});
});

const githubCode = ((req, res) => {
    const code = req.query.code;

    res.status(200).send({code: code});
});

const githubAuth2 = ((req, res) => {
    const code = req.query.code;
    const redirect_uri = req.query.redirect_uri;

//    res.status(200).send({code: code});

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

const githubToken = ((req, res) => {
    const token = req.query.token;

    res.status(200).send({token: token});
});

module.exports = {
    githubAuth,
    githubCode,
    githubAuth2,
    githubToken
}