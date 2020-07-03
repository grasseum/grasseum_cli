const compts = require("compts");

const grasseumLogs = require("grasseum_logs");
var listAction = {
    isLogFolderGenerate:function( argVal,action ){

       if(argVal){
        grasseumLogs.createLogs(action.argv.cwd);
       }
       
    }
}

exports.callAction = function(name,argVal,action){
    

    if(compts._.has(listAction,name)){
        listAction[name](argVal,action);
    }

}

exports.reviewSettingRequest = function(glb,action){
    if(compts._.getTypeof(glb) == "json"){
        for(var i in glb){
            exports.callAction(i , glb[i],action);
        }
    }else{
        console.log("Invalid data type, it must be a json");
    }
}