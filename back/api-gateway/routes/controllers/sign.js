/**
 * @brief Sign controller
 * @description sign controller
 * @author perry.chouteau@epitech.eu
 *
 **/

const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const colors = require('chalk');

const GRPC_IP = '127.0.0.1';
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

const signUp = ((req, res) => {
    const model = {
        username: req.body.username,
        password: req.body.password,
    };

    console.log(`signUp`);
    client.signUp(model, function(err, response) {
        if (!err) {
            console.log('Sign:', response.message);
            res.status(response.status).send({message: response.message});
        } else {
            console.log(err.message);
            res.status(503).send('Ko');
        }
    });
});

const signIn = ((req, res) => {
    const model = {
        username: req.body.username,
        password: req.body.password,
    };

    console.log(`signIn`);
    client.signIn(model, function(err, response) {
        if (!err) {
            console.log('Sign:', response.message);
            res.status(response.status).send({message: response.message});
        } else {
            console.log(err.message);
            res.status(503).send({status: False});
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
            res.status(response.status).send({message: response.message});
        } else {
            console.log(err.message);
            res.status(503).send({status: False});
        }
    });
});

const signOAuth2 = ((req, res) => {
    console.log(`signOAuth2`);
    //not implemented
    res.status(501).send({status: False});
});

module.exports = {
    signUp,
    signIn,
    signOut,
    signOAuth2,
}