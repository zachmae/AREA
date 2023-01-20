/**
 * @fileoverview Get the IP address in app.conf
 **/
function getIp(filepath) {
    const fs = require('fs');
    const reg = new RegExp("^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$");
    var ip = "127.0.0.1";

    try {
        tmp = fs.readFileSync(filepath, "utf8").trim();
        if (reg.test(tmp))
            ip = tmp;
    } catch (e) {
        console.err("no IP found, default IP: 127.0.0.1");
    }
    return ip;
}

module.exports = {
    getIp,
}