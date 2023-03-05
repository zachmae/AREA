
const getDatabase = () => {
    const axios = require('axios');
    const conf = require('./dbconfig.json');
    var config = {
        method: 'get',
        url: conf.url_get_areas,
        headers: { }
    };
    return axios(config)
        .then(function (response) {
            return response.data;
        }
    );
}

const parseActionReaction = (area) => {
    var action = [area.serviceAct, area.action];
    var reaction = [area.serviceRea, area.reaction];
    var actionParam = JSON.parse(area.actionArgs);
    var reactionParam = JSON.parse(area.reactionArgs);
    return {
        action: action,
        reaction: reaction,
        actionParam: actionParam,
        reactionParam: reactionParam
    };
}

const getUser = (id, database) => {
    for (var temp = 0; temp < database.users.length; temp++) {
        if (database.users[temp].id == id) {
            return database.users[temp];
        }
    }
    return {};
}

const getArea = (id, database) => {
    var area = {};
    for (var temp = 0; temp < database.arealist.length; temp++) {
        if (database.arealist[temp].id == id) {
            area[database.arealist[temp].id] = database.arealist[temp];
        }
    }
    return area;
}

module.exports = {
    getDatabase: getDatabase,
    parseActionReaction: parseActionReaction,
    getUser: getUser,
    getArea: getArea
}
