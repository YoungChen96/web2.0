var server = require("./server");
var router = require('./router');
var handler = require("./handler");

var handle = {
    "/": handler.getRegister,
    "/search": handler.getData
};
server.start(router.route, handle);