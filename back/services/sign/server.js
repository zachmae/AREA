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
            PCS.addUser(call.request.username, call.request.password, code, false).then(response => {
                if (response) {
                    console.log(`SignUp Succeed) ${call.request.username} ${call.request.password}`);
                    sendMail('epi.area.code@outlook.com', 'azerty1&', call.request.username, 'Area SignUp Verification', `Come there: http:localhost:8080/api/v1/sign/upverif/${call.request.username}/${code} `);
                    callback(null, { message: 'We are glad to see you here ' + call.request.username + '. check your mail.', status: 200 });
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
    PCS.userVerif(call.request.username, call.request.code).then(response => {
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
    PCS.getUser(call.request.username, call.request.password).then(response => {
        if (response != null) {
            console.log(`SignIn Succeed) ${call.request.username} ${call.request.password} <${response.token}>`);
            callback(null, { message: 'It\'s been a long time ' + call.request.username + ' !', token: response.token, status: 200 });
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

function signOAuth(call, callback) {
    var code = uuidv4();

    PCS.isUsername(call.request.username).then(response => {
        if (response) {
            PCS.addUser(call.request.username, '', code, true).then(response => {
                if (response) {
                    console.log(`SignUp Succeed) ${call.request.username}`);
                    callback(null, { message: 'We are glad to see you here ' + call.request.username, status: 200 });
                    return;
                } else {
                    console.log(`SignUp Failed) ${call.request.username}`);
                    callback(null, { message: 'Something went wrong for ' + call.request.username, status: 400 });
                }
            });
        }
        PCS.getUserOAuth(call.request.username).then(response => {
            if (response != null) {
                console.log(`SignIn Succeed) ${call.request.username} <${response.token}>`);
                callback(null, { message: 'It\'s been a long time ' + call.request.username + ' !', token: response.token, status: 200 });
            } else {
                console.log(`SignIn Failed) ${call.request.username}`);
                callback(null, { message: 'Something went wrong for ' + call.request.username, status: 400 });
            }
        });
    });
}

function SetGithubToken(call, callback) {
    console.log(`SignSetGithubToken ${call.request.token} ${call.request.github_token}`);
    PCS.setGithubToken(call.request.token, call.request.github_token).then(response => {
        if (response == true) {
            callback(null, { message: 'github token add to account', status: 200 });
        } else {
            callback(null, { message: 'set github token failed', status: 400 });
        }
    }).catch(error => {
        callback(null, { message: 'set github token failed', status: 400 });
    });
}

function GetGithubToken(call, callback) {
    console.log(`SignGetGithubToken ${call.request}`);
    PCS.getGithubToken(call.request.token).then(response => {
        if (response != null) {
            callback(null, { message: 'github token get from account', github_token: response, status: 200 });
        } else {
            callback(null, { message: 'get github token failed', status: 400 });
        }
    }).catch(error => {
        callback(null, { message: 'get github token failed', status: 400 });
    });
}


function CreateArea(call, callback) {
    console.log(`SignCreateArea call.request ${JSON.stringify(call.request)}`);
    PCS.createArea(call.request).then(response => {
        console.log(response);
        if (response) {
            console.log(`SignCreateArea Succeed) ${call.request}`);
            callback(null, { message: 'Area created successfully', status: 200});
        } else {
            console.log(`SignCreateArea Failed) ${call.request}`);
            callback(null, { message: 'Area creation failed', status: 400 });
        }
    });
}

function DeleteArea(call, callback) {
    console.log(`DeleteArea ${call.request.area_id}`);
    PCS.deleteArea(call.request).then(response => {
        if (response === true) {
            console.log(`SignDeleteArea Succeed) ${call.request}`);
            callback(null, { message: 'Area deleted successfully', status: 200});
        } else {
            console.log(`SignDeleteArea Failed) ${call.request}`);
            callback(null, { message: 'Area deletion failed', status: 400 });
        }
    }).catch(error => {
        console.log(`SignDeleteArea Failed) ${call.request}`);
        callback(null, { message: 'Area deletion crashed', status: 400 });
    });
}

function ActivateArea(call, callback) {
    console.log(`ActivateArea ${call.request.area_id}`);
    PCS.activateArea(true, call.request).then(response => {
        if (response === true) {
            console.log(`SignActivateArea Succeed) ${call.request}`);
            callback(null, { message: 'Area activate successfully', status: 200});
        } else {
            console.log(`SignActivateArea Failed) ${call.request}`);
            callback(null, { message: 'Area activate failed', status: 400 });
        }
    }).catch(error => {
        console.log(`SignActivateArea Failed) ${call.request}`);
        callback(null, { message: 'Area activate crashed', status: 400 });
    });
}

function DeactivateArea(call, callback) {
    console.log(`DeactivateArea ${call.request.area_id}`);
    PCS.activateArea(false, call.request).then(response => {
        if (response === true) {
            console.log(`SignDeactivateArea Succeed) ${call.request}`);
            callback(null, { message: 'Area deactivate successfully', status: 200});
        } else {
            console.log(`SignDeactivateArea Failed) ${call.request}`);
            callback(null, { message: 'Area deactivate failed', status: 400 });
        }
    }).catch(error => {
        console.log(`SignDeactivateArea Failed) ${call.request}`);
        callback(null, { message: 'Area deactivate crashed', status: 400 });
    });
}


function ListArea(call, callback) {
    console.log("ListArea");
    PCS.listArea().then(response => {
        if (response) {
            console.log(`SignListArea Succeed)`);
            console.log(JSON.stringify(response));
            callback(null, { message: 'Area listed successfully', areas: JSON.stringify(response), status: 200});
        } else {
            console.log(`SignListArea Failed) ${call.request}`);
            callback(null, { message: 'Area listing failed', areas: 'null', status: 400 });
        }
    }).catch(error => {
        console.log(`SignListArea Failed) ${call.request}`);
        callback(null, { message: 'Area listing failed', status: 400 });
    });
}

function GetArea(call, callback) {
    console.log("GetArea");
    PCS.getUserArea(call.request).then(response => {
        if (response) {
            console.log(`SignListArea Succeed)`);
            console.log(JSON.stringify(response));
            callback(null, { message: 'Area listed successfully', areas: JSON.stringify(response), status: 200});
        } else {
            console.log(`SignListArea Failed) ${call.request}`);
            callback(null, { message: 'Area listing failed', areas: 'null', status: 400 });
        }
    }).catch(error => {
        console.log(`SignListArea Failed) ${call.request}`);
        callback(null, { message: 'Area listing failed', status: 400 });
    });
}

/* Server setup */
var server = new grpc.Server();
server.addService(signProto.SignService.service,
    {
        SignUp: signUp,
        SignUpVerif: signUpVerif,
        SignIn: signIn,
        SignOut: signOut,
        signOAuth: signOAuth,
        SetGithubToken: SetGithubToken,
        GetGithubToken: GetGithubToken,
        CreateArea: CreateArea,
        DeleteArea: DeleteArea,
        ActivateArea: ActivateArea,
        DeactivateArea: DeactivateArea,
        ListArea: ListArea,
        GetArea: GetArea
    });

server.bindAsync(`${IP}:${PORT}`,
                    grpc.ServerCredentials.createInsecure(),
                    () => {
                        server.start();
                        console.log(`Server listening on port ${colors.redBright(`${IP}:${PORT}`)} .`);
                    });