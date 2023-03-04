const { repoPubliciseCreate,
    repoCreatedCreate,
    repoDeletedCreate,
    starCreatedCreate,
    starDeletedCreate,
    watchCreate,
    sendMail} = require('./github');

const servicesList = {
    "github": {
        "auth": true,
        "actionsType": {
            "github-repository-publicise": 'hook',
            "github-repository-created": 'hook',
            "github-repository-deleted": 'hook',
            "github-star-created": 'hook',
            "github-star-deleted": 'hook',
            "github-watch": 'hook',
        },
        "actionsList": {
            "github-repository-publicise": repoPubliciseCreate,
            "github-repository-created": repoCreatedCreate,
            "github-repository-deleted": repoDeletedCreate,
            "github-star-created": starCreatedCreate,
            "github-star-deleted": starDeletedCreate,
            "github-watch": watchCreate,
        },
        "reactionsList": {
            "github-send-email": sendMail,
        }
    },
    "weather": {
        "auth": "?",
        "actionsType": {
        },
        "actionsList": {
        },
        "reactionsList": {
        }
    }
}

module.exports = {
    servicesList
};
