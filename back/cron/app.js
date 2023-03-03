const cron = require("node-cron");


const { actionMap } = require('./areas/actionmap.js');
const { reactionMap } = require('./areas/reactionmap.js');

const { getDatabase, parseActionReaction, getUser, getArea } = require('./db/dbhandler.js');

// every minute
cron.schedule('*/5 * * * * *', () => {
    console.log('running a task every 5 minute');
    var areadb = getDatabase();
    for (var i = 0; i < areadb.arealist.length; i++) {
        try {
            if (areadb.arealist[i].active == true) {
                const userid = areadb.arealist[i].user_id;
                var user  = getUser(userid, areadb);
                var Area = parseActionReaction(areadb.arealist[i]);
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
                console.log("###################  USER  ###################");
                console.log(user);
                console.log("###################  START  ###################");
                actionMap[action[0]][action[1]](user, actionParam).then((result) => {
                    if (result == true)
                        reactionMap[reaction[0]][reaction[1]](user, reactionParam);
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
