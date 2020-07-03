
const execute = require("./exec-http");
exports.execute = function(conf){

   
    execute.validHttp(conf);
}

exports.help = function(){
    var str_cli = "Execute grasshttp.js for stream in HTTP";

    return str_cli;
}

