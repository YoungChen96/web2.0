var http = require("http");
var fs = require("fs");
var url = require("url");
var querystring = require("querystring");

function start(route, handle) {
    function request(req, res) {
        var postData = "";
        var pathname = url.parse(req.url).pathname;
        console.log("Request for " + pathname + " received.");
        if (req.method == "GET") {
            console.log("GET");
            postData = "username=" + url.parse(req.url, true).query.username + "&id=" + url.parse(req.url, true).query.id + "&phone=" + url.parse(req.url, true).query.phone + "&email=" + url.parse(req.url, true).query.email;
            route(req, handle, pathname, res, postData, 0);
        } else {
            req.on("data", function(postDataChunk) {
                postData += postDataChunk;
            });
            req.on("end", function() {
                route(req, handle, pathname, res, postData, 1);
            });
        }
    }
    http.createServer(request).listen(8080);
    console.log("Server has started.");
}
exports.start = start;

/*
http.createServer(function(req, res) {
    var pathname = url.parse(req.url).pathname;
    fs.readFile(pathname.substr(1), function(err, data) {
        if (err) {
            console.log(err);
            res.writeHead(404, { 'Content-Type': 'text/html' });
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data.toString());
        }
        res.end();
    });
    req.on('data', function(chunk) {
        console.log(chunk.toString());
    });
}).listen(8080);
/*
http.createServer(function(req, res) {
    var post = '';
    req.on('data', function(chunk) {
        post += chunk;
    });
    req.on('end', function() {
        post = querystring.parse(post);
        res.end(util.inspect(post));
    })
}).listen(8081);
*/