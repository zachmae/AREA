const fs = require('fs');

const servicesAbout = ((req, res) => {

    var data = fs.readFileSync(__dirname + '/../config/about.json', 'utf8');

    data = JSON.parse(data);
    data.server.current_time = new Date().getTime();
    data = JSON.stringify(data);
    fs.writeFileSync(__dirname + '/../config/about.json', data);
    res.status(200).send(data);
});

module.exports = {
    servicesAbout
}