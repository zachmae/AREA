/**
 * @author perry.chouteau@epitech.eu @Perry-chouteau
 * @copyright MIT
 * @version 1.0
 * @description express to grpc
 *
 * @info https://www.youtube.com/watch?v=clzTwZgMlqE
 **/

/* REQUIRED */

'use strict' // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode

const colorize = require('json-colorizer');
const colors = require('chalk');
const grpc = require('@grpc/grpc-js'), // node_modules/@grpc/grpc-js/build/src/server.d.ts
        protoLoader = require('@grpc/proto-loader');

const IP = "sign",
        PORT = 7001,
        SIGN_PROTO_PATH = './proto/sign.proto';

var packageDefinition = protoLoader.loadSync(SIGN_PROTO_PATH, {
                                                keepCase: true,
                                                longs: String,
                                                enums: String,
                                                defaults: true,
                                                oneofs: true
                                            });

var signProto = grpc.loadPackageDefinition(packageDefinition).sign;

/**
 *
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
                        console.log(`Server listening on port ${colors.redBright(`${IP}:${PORT}`)} .`);
                    });