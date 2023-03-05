const colors = require('chalk');
/* ----------------------------------------------------- */
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const GRPC_IP = 'sign';
const GRPC_PORT = 7001;
const PROTO_PATH_SIGN = __dirname + '/../proto/sign.proto';

var packageDefinition = protoLoader.loadSync(PROTO_PATH_SIGN, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});

var protoSign = grpc.loadPackageDefinition(packageDefinition).sign;

var client = new protoSign.SignService(`${GRPC_IP}:${GRPC_PORT}`,
    grpc.credentials.createInsecure());
/* ----------------------------------------------------- */

const setGithubToken = ((req, res) => {
    const model = {
        token: req.body.token,
        github_token: req.body.token_github
    };

    console.log(">>" + req.body.token_github);

    client.SetGithubToken(model, function (err, response) {
        if (!err) {
            console.log('SetGithubToken', response.message);
            res.status(response.status).send({ status: true, message: response.message });
        } else {
            console.log(err.message);
            res.status(503).send({ status: false });
        }
    })
})

const getGithubToken = ((req, res) => {
    const model = {
        token: req.body.token,
    }
    client.GetGithubToken(model, function (err, response) {
        if (!err) {
            console.log('GetGithubToken', response.message);
            res.status(response.status).send({ status: true, message: response.message, github_token: response.github_token });
        } else {
            console.log(err.message);
            res.status(503).send({ status: false });
        }
    })
})

//function createAction(err, response) {
//    ;
//}

//const servicesList = require('./services/config')
const { repoPubliciseCreate,
    repoCreatedCreate,
    repoDeletedCreate,
    starCreatedCreate,
    starDeletedCreate,
    watchCreate,
    sendMail} = require('./services/github');

//const servicesList = {
//    "github": {
//        "auth": true,
//        "actionsType": {
//            "github-repository-publicise": "hook",
//            "github-repository-created": "hook",
//            "github-repository-deleted": "hook",
//            "github-star-created": "hook",
//            "github-star-deleted": "hook",
//            "github-watch": "hook",
//        },
//        "actionsList": {
//            "github-repository-publicise": repoPubliciseCreate,
//            "github-repository-created": repoCreatedCreate,
//            "github-repository-deleted": repoDeletedCreate,
//            "github-star-created": starCreatedCreate,
//            "github-star-deleted": starDeletedCreate,
//            "github-watch": watchCreate,
//        },
//        "reactionsList": {
//            "github-send-email": sendMail,
//        }
//    },
//    "weather": {
//        "auth": "?",
//        "actionsType": {
//        },
//        "actionsList": {
//        },
//        "reactionsList": {
//        }
//    }
//}

//console.log(servicesList);

//const storeArea = ((model, res) => {
//    client.CreateArea(model, function (err, response) {
//        if (!err) {
//            console.log('CreateArea', response.message);
//            res.status(response.status).send({ status: true, message: response.message });
//        } else {
//            console.log(err.message);
//            res.status(503).send({ status: false });
//        }
//    });
//});

const createArea = ((req, res) => {
    //create action
    //create area
    try {
        var model = {
            token: req.body.token,
            service_act: req.body.service_act,
            action: req.body.action,
            action_args: req.body.action_args,
            action_data: null,
            service_rea: req.body.service_rea,
            reaction: req.body.reaction,
            reaction_args: req.body.reaction_args,
        };
        /*if (servicesList[model.service_act].actionsType[model.action] === "hook") {
            if (servicesList[model.service_act].auth && model.service_act === "github") {
                client.GetGithubToken(model, function (err, res) {
                    if (!err) {
                        console.log(res.github_token);
                        servicesList[model.service_act].actionsList[model.action]({ auth_token: res.github_token, args: model.action_args })
                        .then(response => {
                            console.log('1');
                            model.action_data = response;
                            if (model.action_data !== null) {
                                console.log(model.action_data);
                                storeArea(model, res);
                            } else {
                                console.log("data is null");
                                res.status(503).send({ status: false, message: 'data is null' });
                            }
                        }).catch(error => {
                            console.error("Error: catch listing webhooks:", error);
                            res.status(503).send({ status: false, message: 'catch callback' });
                        });
                    } else {
                        res.status(503).send({ status: false, message: 'getTokenFailed' });
                    }
                });
            } else {
                res.status(503).send({ status: false, message: 'not github' });
            }
        } else {*/
        client.CreateArea(model, function (err, response) {
            if (!err) {
                console.log('CreateArea', response.message);
                res.status(response.status).send({ status: true, message: response.message });
            } else {
                console.log(err.message);
                res.status(503).send({ status: false });
            }
        });
        /*storeArea(model, res);
        }*/
    } catch (err) {
        res.status(503).send({ status: false, message: 'createArea broke up' });
    }
})

const deleteArea = ((req, res) => {
    try {
        var model = {
            token: req.body.token,
            area_id: req.body.area_id,

        };
        client.DeleteArea(model, function (err, response) {
            if (!err) {
                console.log('DeleteAreaArea', response.message);
                res.status(response.status).send({ status: true, message: response.message });
            } else {
                console.log(err.message);
                res.status(503).send({ status: false , message: err.message});
            }
        });
        //}
    } catch (err) {
        res.status(503).send({ status: false, message: 'Delete broke up' });
    }
})

const activateArea = ((req, res) => {
    try {
        var model = {
            token: req.body.token,
            area_id: req.body.area_id,

        };
        client.ActivateArea(model, function (err, response) {
            if (!err) {
                console.log('ActivateArea', response.message);
                res.status(response.status).send({ status: true, message: response.message });
            } else {
                console.log(err.message);
                res.status(503).send({ status: false , message: err.message});
            }
        });
        //}
    } catch (err) {
        res.status(503).send({ status: false, message: 'Delete broke up' });
    }
})

const deactivateArea = ((req, res) => {
    try {
        var model = {
            token: req.body.token,
            area_id: req.body.area_id,

        };
        client.DeactivateArea(model, function (err, response) {
            if (!err) {
                console.log('DeactivateArea', response.message);
                res.status(response.status).send({ status: true, message: response.message });
            } else {
                console.log(err.message);
                res.status(503).send({ status: false , message: err.message});
            }
        });
        //}
    } catch (err) {
        res.status(503).send({ status: false, message: 'Delete broke up' });
    }
})


const listArea = ((req, res) => {
    console.log('ListArea');
    const model = {};
    client.ListArea(model, function (err, response) {
        if (!err && response.areas !== 'null') {
            res.status(response.status).send({ status: true, areas: JSON.parse(response.areas) });
        } else {
            res.status(503).send({ status: false });
        }
    });
});

const getArea = ((req, res) => {
    console.log('GetArea');
    const model = {
        token: req.body.token
    }
    console.log(model.token);
    client.GetArea(model, function (err, response) {
        if (!err) {
            res.status(response.status).send({ status: true, areas: JSON.parse(response.areas) });
        } else {
            res.status(503).send({ status: false });
        }
    });
});

module.exports = {
    setGithubToken,
    getGithubToken,
    listArea,
    getArea,
    createArea,
    deleteArea,
    activateArea,
    deactivateArea
}