const compts = require("compts");

const grasseumLogs = require("grasseum_logs");
const grasseumCore = require("grasseum_core");

exports.prep_deploy=function(req_cls,require_action,grasseum_stream,action){

    if(compts._.has(req_cls,"default")){

        req_cls.default( require_action.execute(grasseum_stream.module_execute(action)) );
    }
    if(compts._.has(req_cls,"thread")){
        req_cls.thread( require_action.execute(grasseum_stream.module_execute_thread(action)) );
    }

}
exports.run_deploy=function(req_cls,cnt_prepare_exec,grasseum_stream,action){
    var getcwd = grasseumCore.terminal().getCwdParameter(action.argv.argv);

    if(compts._.has( getcwd,"name" )){
        grasseum_stream.execute_pipe_name_only(getcwd["name"],action);
    }

    if(compts._.has( getcwd,"thread" )){
        if(cnt_prepare_exec ==2){            
            grasseum_stream.prepare_thread_execution();
        }
    }
    else{
        if(cnt_prepare_exec ==2){
     
            grasseum_stream.prepare_execute(grasseum_stream.getListLoad()["execute"]);
    
          
        }
    }
    
}