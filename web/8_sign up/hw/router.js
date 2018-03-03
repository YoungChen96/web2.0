var url = require("url");

function route(req, handle, pathname, res, postData, statue) {
    console.log("Route " + pathname);
    if (statue == 0 && url.parse(req.url, true).query.username == null) {
        //console.log(url.parse(req.url, true).query.username == null);
        handle["/"](req, res, postData, statue);
    } else {
        handle["/upload"](req, res, postData, statue);
    }
}

exports.route = route;