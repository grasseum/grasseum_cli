const structkit = require("structkit");

const grasseumLogs = require("grasseum_logs");
const listAction = {
    isLogFolderGenerate (argVal, action) {

        if (argVal) {

            grasseumLogs.createLogs(action.argv.cwd);

        }

    }
};

exports.callAction = function (name, argVal, action) {


    if (structkit.has(listAction, name)) {

        listAction[name](argVal, action);

    }

};

exports.reviewSettingRequest = function (glb, action) {

    if (structkit.getTypeof(glb) === "json") {

        for (const inc in glb) {

            if (structkit.has(glb[inc])) {

                exports.callAction(inc, glb[inc], action);

            }


        }

    } else {

        console.log("Invalid data type, it must be a json");

    }

};
