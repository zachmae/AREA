/**
 * @title Google Controller
 * @description This file contains the controller for the Google API
 */


const verifyIdToken = ((token) => {
    const url = `https://oauth2.googleapis.com/tokeninfo?id_token=${token}`;
});

const verifyAccessToken = ((token) => {
    const url = `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${token}`;
});


const googleRegisterToken = ((req, res) => {
    const token = req.body.token;
    const client_id = '890593527711-9g0s6fgv28rp8jml8627q4251bt2n886.apps.googleusercontent.com';
    console.log(token);

    //production
//    const {OAuth2Client} = require('google-auth-library');
//    const client = new OAuth2Client();
//    async function verify() {
//        const ticket = await client.verifyIdToken({
//            idToken: token,
//            audience: 'your_client_id'
//        });
//        const payload = ticket.getPayload();
//        const userid = payload['sub'];
//    }
//    verify().catch(console.error);

    //debugging
    const url = `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${token}`;
    fetch(url, { method: 'GET' })
        .then(response => response.json())
        .then(json => {
            res.status(200).send({status: true, json});
        }).catch(err => {
            res.status(500).send({status: false});
        });
});

module.exports = {
    googleRegisterToken
}