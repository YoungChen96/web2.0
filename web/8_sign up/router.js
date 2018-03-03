var url = require('url');
exports.route = function(req, res, handle, postData, pathname, whetherHaveInf) {
    console.log('Route ' + pathname);
    if (!whetherHaveInf && url.parse(req.url, true).query.username == null) {
        handle["/"](req, res, postData, whetherHaveInf);
    } else {
        console.log(handle["/search"]);
        handle["/search"](req, res, postData, whetherHaveInf);
    }
}