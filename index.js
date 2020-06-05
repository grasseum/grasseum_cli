
const config = require("./config");
const validate = require("./lib/validate");
module.exports = function(conf){
    const assignValue = {
        "argv":conf,
        "cli_config":config
    }
    const clsValidate = validate.command(assignValue);

    if( clsValidate.isValid()){
        clsValidate.executeCommand();
    }else{
        console.log(clsValidate.inValidMessage());
    }
}