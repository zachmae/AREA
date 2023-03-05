const cron = require("node-cron");


const { actionMap } = require('./areas/actionmap.js');
const { reactionMap } = require('./areas/reactionmap.js');

const { getDatabase, parseActionReaction, getUser, getArea } = require('./db/dbhandler.js');

// every minute
cron.schedule('*/15 * * * * *', () => {
    console.log('running a task every 15 seconds');
    getDatabase().then((areadb) => {
        console.log(areadb);
        for (var i = 0; i < areadb.areas.length; i++) {
            try {
                if (areadb.areas[i].active == true) {
                    var Area = parseActionReaction(areadb.areas[i]);
                    var action = Area.action;
                    var reaction = Area.reaction;
                    var actionParam = Area.actionParam;
                    var reactionParam = Area.reactionParam;
                    console.log("###################  ACTION  ###################");
                    console.log(action);
                    console.log(actionParam);
                    console.log("###################  REACTION  ###################");
                    console.log(reaction);
                    console.log(reactionParam);
                    console.log("###################  START  ###################");
                    actionMap[action[0]][action[1]]({}, actionParam).then((result) => {
                        if (result == true)
                            reactionMap[reaction[0]][reaction[1]]({}, reactionParam);
                        else
                            console.log("action return false");
                        console.log("###################  END  ###################");
                    });
                }
            } catch (e) {
                console.log(e);
            }
        }
    console.log('done');
    });
});
