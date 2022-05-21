var fs = require('fs');
var path = require('path');
const structkit = require("structkit");


const grasseum_stream = require("grasseum_stream");

const settings = require("./settings");
const log_settings = require("grasseum_cli/lib/log_setting");

const RegeExpModule = /(pipe)\(([a-zA-Z0-0_-]{1,})\)/g;
const RegeExpExecute = /(series|parallel)\(([a-zA-Z0-9_-]{1,})\)/g;

const confFilename = "grassfile.js";
const confFilenameJson = "grassconfig.json";

const {logRed,logWhite,logGreen} = require("grasseum_console");

__executeScriptJsonConfig = function( join_path,action,data ){
  console.log('Prototype concept');
  
  console.log("Executing "+confFilenameJson+" . . .");
  try{
    const grassconf = grasseum_stream.module_stream(action);
    var cnt_prepare_exec = 0;
    let req_cls = {};
    const jsonVar = JSON.parse(  data.toString()  );
  
      if(structkit.has(jsonVar,"module") == false){
        logRed("Method `module` is missing in your "+confFilenameJson+" script");
      }else{
          
           
          for(var key in jsonVar["module"]){

            let conf = grassconf;
            const keyModule = jsonVar["module"][key];

       
       
            structkit.each(keyModule,function(key,value){
               
                if (key =="src"){
                  conf = conf.src( value );
                }
                key.replace(RegeExpModule,function(word,s1,s2){
                    if(s1 == 'pipe'){
                      if(s2 =='dest'){
                        conf = conf.pipe(grassconf.dest(value));
                      }else{
                        const requireImport = require(s2);
                        conf = conf.pipe( requireImport.apply(this,value) );
                      }
                      
                    }
                });
            });
            grassconf.load(key,function(test){
              
              return  conf; 

            })
          }
          
       
        cnt_prepare_exec++;
      }

      if(structkit.has(jsonVar,"execute") == false){
        logRed("Method `execute` is missing in your "+confFilenameJson+" script");
      }else{
        req_cls = grasseum_stream.module_execute(action);
        if(structkit.has(jsonVar["execute"],'default') == false){
          logRed("Method `default` in `execute` is missing in your "+confFilenameJson+" script");
        }else{
           
            structkit.each(jsonVar["execute"]['default'],function(key,value){
         
              value.replace(RegeExpExecute,function(word,s1,s2){
                
                if(s1 == 'series'){
                  
                  req_cls.series(s2);
              
                }

                if(s1 == 'parallel'){
              
                  req_cls.parallel(s2);
                }

            });
        });
       
      }
      var arg_require_action = {};
      if(structkit.has(jsonVar,"setting") ){
        arg_require_action = jsonVar['setting'];
       log_settings.reviewSettingRequest(arg_require_action,action);
        
      }
   
        cnt_prepare_exec++;  
      }
      const defaultValue =structkit.varExtend({executeDelay:1},arg_require_action);
 
       setTimeout(() => { 
        settings.run_deploy(req_cls,cnt_prepare_exec,grasseum_stream,action);
      }, defaultValue.executeDelay) ;
      
  }catch(e){
    console.log(e);
  }
}
__executeScript = function( join_path,action ){
    logGreen("Executing "+confFilename+" . . .");

    let require_action = require( join_path );
    var cnt_prepare_exec = 0;
    if(structkit.has(require_action,"module") == false){
        logRed("Method `module` is missing in your "+confFilename+" script");
      }else{

        require_action.module(grasseum_stream.module_stream(action));
        cnt_prepare_exec++;
      }

      if(structkit.has(require_action,"execute") == false){
        logRed("Method `execute` is missing in your "+confFilename+" script");
      }else{
        
        var req_cls = require_action.execute({ });
        settings.prep_deploy(req_cls,require_action,grasseum_stream,action);
        cnt_prepare_exec++;
      }
      var arg_require_action = {};
      if(structkit.has(require_action,"setting") ){
        arg_require_action = require_action.setting();
        log_settings.reviewSettingRequest(arg_require_action,action);
         
      }
     const defaultValue =structkit.varExtend({executeDelay:1},arg_require_action);
 
       setTimeout(() => {
        settings.run_deploy(req_cls,cnt_prepare_exec,grasseum_stream,action);
      }, defaultValue.executeDelay) ;
      
      
    
}
exports.validFile=function(action){
    let join_path =path.join(action.argv.cwd,confFilename);
    let join_path_json =path.join(action.argv.cwd,confFilenameJson);
    fs.access(join_path, error => {
        if (!error) {
            // The check succeeded
            __executeScript(join_path,action);
        } else {
            // The check failed
            fs.readFile(join_path_json, (error,data) => {
              if (!error) {
                  // The check succeeded
                  __executeScriptJsonConfig(join_path_json,action,data);
              } else {
                  // The check failed
                  logRed("no such file for js ",join_path);
                  logRed("no such file  for json config",join_path_json)
              }
          });
        }
    });
}
