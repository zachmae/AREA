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
const servicesList = require('./services/config')

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

const storeArea = ((model, res) => {
    client.CreateArea(model, function (err, response) {
        if (!err) {
            console.log('Sign:CreateArea', response.message);
            res.status(response.status).send({ message: response.message });
        } else {
            console.log(err.message);
            res.status(503).send({ status: false });
        }
    });
});

const createArea = ((req, res) => {
    //create action
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

        if (servicesList[model.service_act].actionsType[model.action] === "hook") {
            if (servicesList[model.service_act].auth)
                service_token

            servicesList[model.service_act].actionsList[model.action]({ auth_token: service_token, args: model.action_args })
                .then(response => {
                    model.action_data = response;
                    if (model.action_data !== null) {
                        console.log(model.action_data);
                        storeArea(model, res);
                    } else {
                        console.log("data is null");
                        res.status(503).send({ status: false });
                    }
                }).catch(error => {
                    console.error("Error: catch listing webhooks:", error);
                    res.status(503).send({ status: false });
                });
        } else {
            storeArea(model, res);
        }
    } catch (err) {
        res.status(503).send({ status: false });
        console.log('-------------------');
    }
})

const deleteArea = ((req, res) => {
    //    var model = {
    //        token: req.body.token,
    //        token_area: req.body.token_area,
    //    }
    //
    res.status(503).send({ status: false });
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


const activateArea = ((req, res) => {
    //    client.activateArea(model, function(err, response) {
    //        if (!err) {
    //            console.log('Sign:ActivateArea', response.message);
    //            res.status(response.status).send({status: true});
    //        } else {
    //            console.log(err.message);
    //            res.status(503).send({status: false});
    //            console.log('-------------------');
    //            return;
    //        }
    //    });
    res.status(503).send({ status: false });
})

const deactivateArea = ((req, res) => {
    //    client.activateArea(model, function(err, response) {
    //        if (!err) {
    //            console.log('Sign:ActivateArea', response.message);
    //            res.status(response.status).send({status: true});
    //        } else {
    //            console.log(err.message);
    //            res.status(503).send({status: false});
    //            console.log('-------------------');
    //            return;
    //        }
    //    });
    res.status(503).send({ status: false });
})

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