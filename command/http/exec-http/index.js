var fs = require('fs');
var path = require('path');
const compts = require("compts");
const confFilename = "grasshttp.js";

const grasseum_stream = require("grasseum_stream");
const  grasseum_http = require("grasseum_http");
const settings = require("./settings");
const log_settings = require("grasseum_cli/lib/log_setting");
__executeHttp = function( join_path,action ){
    console.log("Executing grasshttp.js . . .");

    let require_action = require( join_path );
    var cnt_prepare_exec = 0;
    if(compts._.has(require_action,"route") == false){
        console.log("Method `route` is missing in your "+confFilename+" script");
      }else{

        require_action.route(grasseum_stream.module_stream(action));
        cnt_prepare_exec++;
      }


      var arg_require_action = {};
      if(compts._.has(require_action,"setting") ){
         arg_require_action = require_action.setting();
        log_settings.reviewSettingRequest(arg_require_action,action);
        cnt_prepare_exec++;
         
      }else{
        console.log("Method `setting` is missing in your "+confFilename+" script");
      }
      if(cnt_prepare_exec ==2){
      //  grasseum_stream.prepare_execute(action);
        grasseum_http.run_server();
      }
    
}
exports.validHttp=function(action){
    let join_path =path.join(action.argv.cwd,confFilename);
    fs.access(join_path, error => {
        if (!error) {
            // The check succeeded
            __executeHttp(join_path,action);
        } else {
            // The check failed
            console.log("no such file  ",join_path)
        }
    });
}