var fs = require('fs');
var path = require('path');
const structkit = require("structkit");
const confFilename = "grasshttp.js";

const grasseum_stream = require("grasseum_stream");
const  grasseum_http = require("grasseum_http");
const settings = require("./settings");
const log_settings = require("grasseum_cli/lib/log_setting");

const {logRed,logWhite} = require("grasseum_console");

__executeHttp = function( join_path,action ){
    console.log("Executing grasshttp.js . . .");

    let require_action = require( join_path );
    var cnt_prepare_exec = 0;
    if(structkit.has(require_action,"module") == false){
        console.log("Method `module` is missing in your "+confFilename+" script");
      }else{

        require_action.module(grasseum_stream.module_stream(action));
        cnt_prepare_exec++;
      }


      var arg_require_action = {};
      if(structkit.has(require_action,"setting") ){
         arg_require_action = require_action.setting();
        log_settings.reviewSettingRequest(arg_require_action,action);
        cnt_prepare_exec++;
         
      }else{
        logRed("Method `setting` is missing in your "+confFilename+" script");
      }
      
      if(structkit.has(require_action,"http") == false){
        logRed("Method `http` is missing in your "+confFilename+" script");
      }else{
        const http_route= grasseum_http.http_route();
        require_action.http( { route :()=> http_route });
        cnt_prepare_exec++;
      }

      if(cnt_prepare_exec ==3){
        logWhite("This is a trial feature, further updates will come along the way");
        settings.execute(grasseum_stream,action)
      
         
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