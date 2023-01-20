const yaml = require('js-yaml');
const fs = require('fs');

const sleepSync = (ms) => {
    const end = new Date().getTime() + ms;

    while (new Date().getTime() < end) { };
}

const editFile = (filepath, tuples, sleep = false) => {
    var file = yaml.load(fs.readFileSync(filepath, 'utf-8'));
    tuples.forEach(tuple => {
        const [func, data] = [tuple[0], tuple[1]];
        if (sleep)
            sleepSync(500);
        fs.writeFileSync(filepath, yaml.dump(file = func(file, data)));
    });
}
function editName(file, name) {
    const reg = new RegExp("[a-zA-Z_]+");

    if (reg.test(name) && name.length < 50)
        file.api.name = name;
    return file;
}

function editDescription(file, description) {
    const reg = new RegExp("[a-zA-Z_]+");

    if (reg.test(description) && description.length < 255)
        file.api.description = description;
    return file;
}

function editVersion(file, version) {
    const reg = new RegExp("\\d+.\\d+.\\d+");

    if (reg.test(version))
        file.api.version = version;
    return file;
}

function editLatestUpdate(file, latestUpdate) {
    const reg = new RegExp("(3[0-1]|[1-2][0-9]|0[1-9])-\\d{2}-\\d{4}");
    if (reg.test(latestUpdate))
        file.api.latestUpdate = latestUpdate;
    return file;
}

function editUrl(file, url) {
    file.api.url = url;
    return file;
}


function editIp(file, ip) {
    const reg = new RegExp("^(25[0-5].|2[0-4][0-9].|1[0-9]{2}.|[1-9][0-9].|[0-9].){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])$");

    if (reg.test(ip))
        file.api.ip = ip;
    return file;
}

function editPort(file, port) {
    if (port > 0 && port < 65536)
        file.api.version = port;
    return file;
}

function editServiceIp(file, serviceName, ip) {
    const reg = new RegExp("^(25[0-5].|2[0-4][0-9].|1[0-9]{2}.|[1-9][0-9].|[0-9].){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])$");

    if (reg.test(ip))
        file.api.services.forEach(service => {
            if (service.name == serviceName)
                service.ip = ip;
        });
    return file;
}

function editServicePort(file, serviceName, port) {
    if (port > 0 && port < 65536)
        file.api.services.forEach(service => {
            if (service.name == serviceName)
                service.port = port;
        });
    return file;
}

module.exports = {
    editFile,
    editName,
    editDescription,
    editVersion,
    editLatestUpdate,
    editUrl,
    editIp,
    editPort,
    editServiceIp,
    editServicePort
};