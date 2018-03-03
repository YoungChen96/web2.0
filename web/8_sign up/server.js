var http = require('http');
var fs = require('fs');
var url = require('url');
var querystring = require('querystring');

exports.start = function(route, handle) {
    function onRequest(req, res) {
        var postData = "";
        var pathname = url.parse(req.url).pathname;
        console.log("Request for " + pathname + " received.");
        if (req.method == "GET") {
            console.log("GET");
            postData = "username=" + url.parse(req.url, true).query.username + "&id=" + url.parse(req.url, true).query.id + "&phone=" + url.parse(req.url, true).query.phone + "&email=" + url.parse(req.url, true).query.email;
            route(req, res, handle, postData, pathname, false);
        } else {
            req.on('data', function(chunk) {
                postData += chunk;
            });
            req.on('end', function() {
                route(req, res, handle, postData, pathname, true);
            });
        }
    }
    http.createServer(onRequest).listen(8000);
    console.log('Server has started.');
}