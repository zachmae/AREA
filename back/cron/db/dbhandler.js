
const getDatabase = () => {
    return require('./areadb.json');
}

const parseActionReaction = (area) => {
    var action = area.actionCallback.split(" ");
    var reaction = area.reactionCallback.split(" ");
    var actionParam = area.actionParams;
    var reactionParam = area.reactionParams;
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
