
const execute = require("./exec-script");
exports.execute = function(conf){

   
    execute.validFile(conf);
}

exports.help = function(){
    var str_cli = "Execute grassfile.js for stream execution";
    //str_cli+="\n\t_____________";
    str_cli+="\n\t--thread . . . to execute thread function";
    str_cli+="\n\t--name=<name> . . . run only specific task name function";
    //str_cli+="\n\t_____________";
    return str_cli;
}

