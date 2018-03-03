var server = require("./server");
var router = require("./router");
var handler = require("./handle");

var handle = {};
handle["/"] = handler.page;
handle["/start"] = handler.page;
handle["/upload"] = handler.data;
server.start(router.route, handle);