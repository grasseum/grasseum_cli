
const execute = require("./exec-script");

exports.execute = function (conf) {


    execute.validFile(conf);

};

exports.help = function () {

    let str_cli = "Execute grassfile.js for stream execution";

    str_cli+="\n\t--thread . . . to execute thread function";

    return str_cli;

};

