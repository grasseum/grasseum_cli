const structkit = require("structkit");
const _validateCmdCountIfNoEmpty = function() {

    if (this.config.argv.argv.length ==0){
        this.varIsValid = false;
        this.varinValidMessage = "No command action specify, please run `help` to see other option";
    }
}

const _validateCmdExist = function() {

    if (this.varIsValid){
        this.commandKey = this.config.argv.argv[0];
        if(structkit.has(this.config.cli_config.command, this.commandKey) == false){
            this.varIsValid = false;
            this.varinValidMessage = "Invalid command, please run `help` to see other option";
        }
   
    }
}

class Command{
    constructor(conf){
        this.config=conf;
        this.varIsValid = true;
        this.varinValidMessage = "";
        this.commandKey = "";
    }

    isValid(){
        _validateCmdCountIfNoEmpty.call(this);
        _validateCmdExist.call(this);
        return this.varIsValid;
    }

    executeCommand(){
   
        this.config.argv['argv']=structkit.toArray(structkit.getValue(structkit.limit(this.config.argv['argv'],1)));
        
        this.config.cli_config.command[this.commandKey].execute(this.config);
    }
    inValidMessage(){
        return this.varinValidMessage;
    }

    
}

module.exports = function(conf){
    return new Command(conf);
}