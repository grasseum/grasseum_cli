var fs = require('fs');
var path = require('path');
const compts = require("compts");
const confFilename = "grassfile.js";

const grasseum_stream = require("grasseum_stream");

const settings = require("./settings");
const log_settings = require("grasseum_cli/lib/log_setting");
__executeScript = function( join_path,action ){
    console.log("Executing grassfile.js . . .");

    let require_action = require( join_path );
    var cnt_prepare_exec = 0;
    if(compts._.has(require_action,"module") == false){
        console.log("Method `module` is missing in your "+confFilename+" script");
      }else{

        require_action.module(grasseum_stream.module_stream(action));
        cnt_prepare_exec++;
      }

      if(compts._.has(require_action,"execute") == false){
        console.log("Method `execute` is missing in your "+confFilename+" script");
      }else{
        
        var req_cls = require_action.execute({ });
        settings.prep_deploy(req_cls,require_action,grasseum_stream,action);
        cnt_prepare_exec++;
      }
      var arg_require_action = {};
      if(compts._.has(require_action,"setting") ){
         arg_require_action = require_action.setting();
        log_settings.reviewSettingRequest(arg_require_action,action);
         
      }
      settings.run_deploy(req_cls,cnt_prepare_exec,grasseum_stream,action);
      
      
    
}
exports.validFile=function(action){
    let join_path =path.join(action.argv.cwd,confFilename);
    fs.access(join_path, error => {
        if (!error) {
            // The check succeeded
            __executeScript(join_path,action);
        } else {
            // The check failed
            console.log("no such file  ",join_path)
        }
    });
}