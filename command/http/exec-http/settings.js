const compts = require("compts");

const grasseumLogs = require("grasseum_logs");
const  grasseum_http = require("grasseum_http");

exports.execute = function(grasseum_stream,action){
    grasseum_http.run_server(grasseum_stream,action);
}