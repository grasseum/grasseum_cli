
const scripttype = require("./scripttype");

exports.execute = function (conf) {

    scripttype.script_template(conf);

};

exports.help = function () {

    // Return "Create template for your project";
    let str_cli = "Create template for your project";

    str_cli+="\n\t--script . . . to create the filename `grassfile.js`";

    return str_cli;

};
