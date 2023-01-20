const config = require('../../config');
const path = 'config.yml';

function editVersion(file, version) {
    const reg = new RegExp("\\d+.\\d+.\\d+");

    if (reg.test(version)) {
        try {
            file.apigateway.version = version;
        } catch (e) {
            console.log("not a valid parse");
        }
    }
    return file;
}

config.editFile(path,
                [   [editVersion, "1.0.1"],
                    [editVersion, "1.0.2"]],
                true);