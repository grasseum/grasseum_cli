
var fs = require('fs');
var compt = require("compts");
const grasseumCore = require("grasseum_core");
var str_template = '';
str_template += 'exports.module=function(grassconf){   \n';
    
str_template += '    grassconf.load("default",function(){\n';
            
str_template += '    return grassconf.src(["src/*"]) \n';
str_template += '        .pipe(grassconf.dest("dest/" )); \n';

str_template += '    })   \n';
str_template += ' } \n';

str_template += 'exports.execute=function( lib ){   \n';

str_template += '    lib.default=function(strm){\n';
str_template += '         strm.series("default") \n';
str_template += '    }\n';

str_template += '    return lib;\n';
str_template += '}    \n';



exports.script_template = function(action){
     
    var getcwd = grasseumCore.terminal().getCwdParameter(action.argv.argv);
   
    var script_list = {
        "script":function(){
            fs.writeFile(action.argv.cwd+"/grassfile.js",str_template, function(err) {
                if(err) {
                    return console.log(err);
                }
            
                console.log("The file was saved!");
            }); 
        },
       "http":function(){
           fs.writeFile(action.argv.cwd+"/grasshttp.js",str_template, function(err) {
               if(err) {
                   return console.log(err);
               }
            
               console.log("The file was saved!");
           }); 
       }
    }

    if(compt._.has(getcwd,"script")){
        script_list['script']()
    }
} 