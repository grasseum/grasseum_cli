
const execute = require("./exec-http");

exports.execute = function (conf) {


    execute.validHttp(conf);

};

exports.help = function () {

    const str_cli = "Execute grasshttp.js for stream in HTTP(Experimental)";

    return str_cli;

};

