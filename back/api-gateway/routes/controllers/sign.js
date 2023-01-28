const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const colors = require('chalk');
const { rfcServiceUnavailable } = require('./rfc');

const GRPC_IP = '192.168.1.25';
const GRPC_PORT = 7001;
const PROTO_PATH_SIGN = __dirname + '/../proto/sign.proto';

console.log(colors.green(PROTO_PATH_SIGN));

var packageDefinition = protoLoader.loadSync(PROTO_PATH_SIGN, {
                                                keepCase: true,
                                                longs: String,
                                                enums: String,
                                                defaults: true,
                                                oneofs: true });

var protoSign = grpc.loadPackageDefinition(packageDefinition).sign;

var client = new protoSign.SignService(`${GRPC_IP}:${GRPC_PORT}`,
                                       grpc.credentials.createInsecure());

const { Pool } = require('pg');
const pool = new Pool({
  user: 'username',
  host: 'host',
  database: 'database',
  password: 'password',
  port: 5432,
});


const signUp = ((req, res) => {
    const model = {
        username: req.body.username,
        password: req.body.password,
    };

    console.log(`signUp`);
    client.signUp(model, function(err, response) {
        if (!err) {
            console.log('Sign:', response.message);
            res.status(response.status).send(response.message);
        } else {
            console.log(err.message);
            res.status(503).send(rfcServiceUnavailable);
        }
    });
});

const signIn = ((req, res) => {
    const model = {
        username: /* req.body.username */ "username",
        password: /* req.body.password */ "password",
    };

    console.log(`signIn`);
    client.signIn(model, function(err, response) {
        if (!err) {
            console.log('Sign:', response.message);
            res.status(response.status).send(response.message);
        } else {
            console.log(err.message);
            res.status(503).send(rfcServiceUnavailable);
        }
    });
});

const signOut = ((req, res) => {
    const model = {
        username: req.body.username,
    };

    console.log(`signOut`);
    client.signOut(model, function(err, response) {
        if (!err) {
            console.log('Sign:', response.message);
            res.status(response.status).send(response.message);
        } else {
            console.log(err.message);
            res.status(503).send(rfcServiceUnavailable);
        }
    });
});

const signOAuth2 = ((req, res) => {
    console.log(`signOAuth2`);
    //not implemented
    res.status(501).send("not implemented");
});

module.exports = {
    signUp,
    signIn,
    signOut,
    signOAuth2,
}