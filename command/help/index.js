

const structkit = require("structkit");

exports.execute = function (conf) {

    console.log("These are the available command");
    for (const inc in conf.cli_config.command) {

        if (structkit.has(conf.cli_config.command[inc])) {

            console.log("   ", inc, " . . . . ", conf.cli_config.command[inc].help());

        }


    }

};

exports.help = function () {

    return "See all available command";

};

