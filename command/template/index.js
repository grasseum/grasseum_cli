
const scripttype = require("./scripttype");
const compts = require("compts");
exports.execute = function(conf){
    let local_type = scripttype.script_template(conf.argv.cwd)
    let key_local_type = compts._.getKey(local_type);
    
    if(compts._.isExact(key_local_type,conf.argv.argv) ){

        conf.argv.argv.forEach(element => {
            local_type[element]();
        });
    }else{
        console.log("Invalid command")
    }
}

exports.help = function(){
    return "Create template for your project";
}

