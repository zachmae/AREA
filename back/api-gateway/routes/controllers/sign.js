/**
 * @brief Sign controller
 * @description sign controller
 * @author perry.chouteau@epitech.eu
 *
 **/

const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const colors = require('chalk');

const GRPC_IP = 'sign';
const GRPC_PORT = 7001;
const PROTO_PATH_SIGN = __dirname + '/../proto/sign.proto';

var packageDefinition = protoLoader.loadSync(PROTO_PATH_SIGN, {
                                                keepCase: true,
                                                longs: String,
                                                enums: String,
                                                defaults: true,
                                                oneofs: true });

var protoSign = grpc.loadPackageDefinition(packageDefinition).sign;

var client = new protoSign.SignService(`${GRPC_IP}:${GRPC_PORT}`,
                                       grpc.credentials.createInsecure());

//const { Pool } = require('pg');
//const pool = new Pool({
//  user: 'username',
//  host: 'host',
//  database: 'database',
//  password: 'password',
//  port: 5432,
//});


const signUp = ((req, res) => {
    const model = {
        username: req.body.username,
        password: req.body.password,
    };

    console.log(`signUp` + req.body.username + req.body.password);

    console.log(`signUp` + String(model.username) + model.password);
    client.signUp(model, function(err, response) {
        if (!err) {
            console.log('Sign:', response.message);
            res.status(response.status).send({message: response.message});
        } else {
            console.log(err.message);
            res.status(503).send({status: false});
        }
    });
});

const signIn = ((req, res) => {
    const model = {
        username: req.body.username,
        password: req.body.password,
    };

    console.log(`signIn` + req.body.username + req.body.password);

    console.log(`signIn` + model);
    client.signIn(model, function(err, response) {
        if (!err) {
            console.log('Sign:', response.message);
            res.status(response.status).send({message: response.message});
        } else {
            console.log(err.message);
            res.status(503).send({status: false});
        }
    });
});

const signOut = ((req, res) => {
    const model = {
        username: req.body.username,
    };

    console.log(`signOut` + model);
    client.signOut(model, function(err, response) {
        if (!err) {
            console.log('Sign:', response.message);
            res.status(response.status).send({message: response.message});
        } else {
            console.log(err.message);
            res.status(503).send({status: false});
        }
    });
});

const signOAuth2 = ((req, res) => {
    const model = {
        username: req.body.username,
    };

    console.log(`signOAuth2` + model);
    //not implemented
    res.status(501).send({status: false});
});

module.exports = {
    signUp,
    signIn,
    signOut,
    signOAuth2,
}