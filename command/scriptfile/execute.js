var fs = require('fs');
var path = require('path');
const compts = require("compts");
const confFilename = "Grassfile.js";

const grasseum_stream = require("grasseum_stream");

__executeScript = function( join_path ){
    console.log("running");

    let require_action = require( join_path );

    if(compts._.has(require_action,"module") == false){
        console.log("Method `module` is missing in your "+confFilename+" script");
      }else{

        require_action.module(grasseum_stream.module_stream());
      }

      if(compts._.has(require_action,"execute") == false){
        console.log("Method `execute` is missing in your "+confFilename+" script");
      }else{

        require_action.execute(grasseum_stream.module_execute());
      }

      grasseum_stream.prepare_execute();
    
}
exports.validFile=function(file_path){
    let join_path =path.join(file_path,confFilename);
    fs.access(join_path, error => {
        if (!error) {
            // The check succeeded
            __executeScript(join_path);
        } else {
            // The check failed
            console.log("no such file  ",join_path)
        }
    });
}