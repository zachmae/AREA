/**
 * @author perry.chouteau@epitech.eu
 * @copyright MIT
 * @version 1.0
 * @description express to grpc
 **/

/* REQUIRED */

'use strict' // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode

const grpc = require('@grpc/grpc-js'); // node_modules/@grpc/grpc-js/build/src/server.d.ts
const protoLoader = require('@grpc/proto-loader');

const colorize = require('json-colorizer');
const colors = require('chalk');

console.log(__dirname);

const IP = "192.168.1.25";
const PORT = 7001;
const SIGN_PROTO_PATH = './proto/sign.proto';

var packageDefinition = protoLoader.loadSync(
    SIGN_PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });

var signProto = grpc.loadPackageDefinition(packageDefinition).sign;


//signProto.sign(req, res);

/**
 * @description wrong adress
 * @param {string} req
 * @param {string} res
 * @returns {string} 404
 * @example http://localhost:3001/wrong_adress
 *
 */

/* Function setup */
function signUp(call, callback) {
    console.log(`SignUp) ${call.request.username} ${call.request.password}`);
    callback(null, { message: 'We are glad you\'re here ' + call.request.username, status: 200 });
}

function signIn(call, callback) {
    console.log(`SignIn) ${call.request.username} ${call.request.password}`);
    callback(null, { message: 'It\'s been a long time ' + call.request.username + ' !', status: 200 });
}

function signOut(call, callback) {
    console.log(`SignOut) ${call.request.username}`);
    callback(null, { message: 'You sign out successfully, See you soon ' + call.request.username + ' !', status: 200 });
}
/* Server setup */
var server = new grpc.Server();
server.addService(signProto.SignService.service,
    {
        signUp: signUp,
        signIn: signIn,
        signOut: signOut
    });

server.bindAsync(`${IP}:${PORT}`,
    grpc.ServerCredentials.createInsecure(),
    () => {
        server.start();
        console.log('Server running on port ' + colors.redBright(`${IP}:${PORT}`) + `.`);
    });