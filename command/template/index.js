
const scripttype = require("./scripttype");
const compts = require("compts");
exports.execute = function(conf){
    let local_type = scripttype.script_template(conf)

}

exports.help = function(){
    //return "Create template for your project";
    var str_cli = "Create template for your project";
    str_cli+="\n\t--script . . . to create the filename `grassfile.js`";

    return str_cli;
}

