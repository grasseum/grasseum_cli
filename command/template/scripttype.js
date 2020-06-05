
var fs = require('fs');


var str_template = ""
str_template +="exports.module=function(grassconf){ \n"

str_template +='grassconf.load("test1",function(test){ \n \n';


str_template +='}) \n';




str_template +="    } \n"
str_template +="exports.execute=function(){ \n"
str_template +="\n"    
str_template +=' return "test1"; \n   } \n';



exports.script_template = function(file_path){

    return {
        "--script":function(){
            fs.writeFile(file_path+"/Grassconf.js",str_template, function(err) {
                if(err) {
                    return console.log(err);
                }
            
                console.log("The file was saved!");
            }); 
        },
    //    "--api":function(){
    //        fs.writeFile(file_path+"/Grassapi.js",str_template, function(err) {
    //            if(err) {
    //                return console.log(err);
    //            }
            
    //            console.log("The file was saved!");
    //        }); 
    //    }
    }
} 