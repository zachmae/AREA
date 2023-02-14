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

const { PrismaClientSign } = require('./prisma-client');
const PCS = new PrismaClientSign();

const { sendMail } = require('./utils');
const { v4: uuidv4 } = require('uuid');

/* Function setup */
function signUp(call, callback) {
    var code = uuidv4();
    //PCS.signUsernameFunction into result
    PCS.isUsername(call.request.username).then(response => {
        if (response) {
            PCS.addUser(call.request.username, call.request.password, code).then(response => {
                if (response) {
                    console.log(`SignUp Succeed) ${call.request.username} ${call.request.password}`);
                    sendMail('epi.area.code@outlook.com', 'azerty1&', call.request.username, `Come there: http:localhost:8080/api/v1/sign/up-verif/${call.request.username}/${code} `);
                    callback(null, { message: 'We are glad to see you here ' + call.request.username + '. check your mail', status: 400 });
                    return;
                } else {
                    console.log(`SignUp Failed) ${call.request.username} ${call.request.password}`);
                    callback(null, { message: 'Something went wrong for ' + call.request.username, status: 400 });
                }
            });
        } else {
            console.log(`SignUp Failed) ${call.request.username} ${call.request.password}`);
            callback(null, { message: 'Something went wrong for ' + call.request.username, status: 400 });
        }
    });
}

function signUpVerif(call, callback) {
    PCS.signUpVerif(call.request.username, call.request.code).then(response => {
        if (response) {
            console.log(`You can SignIn ${call.request.username} ${call.request.code}`);
            callback(null, { message: 'You can SignIn as ' + call.request.username, status: 200 });
        } else {
            console.log(`SignUpVerif Failed) ${call.request.username} ${call.request.code}`);
            callback(null, { message: 'Something went wrong for ' + call.request.username, status: 400 });
        }
    });
}

function signIn(call, callback) {
    PCS.isAccount(call.request.username, call.request.password).then(response => {
        if (response) {
            PCS.getUser(call.request.username, call.request.password).then(response => {
                if (response) {
                    console.log(`SignIn Succeed) ${call.request.username} ${call.request.password}`);
                    callback(null, { message: 'It\'s been a long time ' + call.request.username + ' !', status: 200 });
                } else {
                    console.log(`SignIn Failed) ${call.request.username} ${call.request.password}`);
                    callback(null, { message: 'Something went wrong for ' + call.request.username, status: 400 });
                }
            });
        } else {
            console.log(`SignIn Failed) ${call.request.username} ${call.request.password}`);
            callback(null, { message: 'Something went wrong for ' + call.request.username, status: 400 });
        }
    });
}

function signOut(call, callback) {
    console.log(`SignOut Succeed) ${call.request.username}`);
    callback(null, { message: 'You sign out successfully, See you soon ' + call.request.username + ' !', status: 200 });
}
/* Server setup */
var server = new grpc.Server();
server.addService(signProto.SignService.service,
    {
        signUp: signUp,
        signIn: signIn,
        signOut: signOut,
        signUpVerif: signUpVerif
    });

server.bindAsync(`${IP}:${PORT}`,
                    grpc.ServerCredentials.createInsecure(),
                    () => {
                        server.start();
                        console.log(`Server listening on port ${colors.redBright(`${IP}:${PORT}`)} .`);
                    });