const fs = require('fs');
const structkit = require("structkit");
const grasseumCore = require("grasseum_core");
let str_template = '';

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


exports.script_template = function (action) {

    const getcwd = grasseumCore.terminal().getCwdParameter(action.argv.argv);

    const script_list = {
        "http" () {

            fs.writeFile(action.argv.cwd+"/grasshttp.js", str_template, function (err) {

                if (err) {

                    console.log(err);

                }

                console.log("The file was saved!");


            });

        },
        "script" () {

            fs.writeFile(action.argv.cwd+"/grassfile.js", str_template, function (err) {

                if (err) {

                    console.log(err);

                }

                console.log("The file was saved!");

            });

        }

    };

    if (structkit.has(getcwd, "script")) {

        script_list.script();

    }

};
