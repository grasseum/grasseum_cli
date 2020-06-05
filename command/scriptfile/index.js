
const execute = require("./execute");
exports.execute = function(conf){
    //conf.argv.cwd
   
    execute.validFile(conf.argv.cwd);
}

exports.help = function(){
    return "Execute Grassfile.js";
}

