

exports.execute = function(conf){
   
   console.log("These are the available command");
   for(var i in conf.cli_config.command){
 
       console.log("   ",i," . . . . ",conf.cli_config.command[i].help());
   }
}

exports.help = function(){
    return "See all available command";
}

