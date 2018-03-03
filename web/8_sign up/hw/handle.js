var fs = require("fs");
var url = require("url");
var querystring = require("querystring");

//传递请求的文件
function getPage(req, res, postData, statu) {
    console.log("Send Page.");
    var pathname = url.parse(req.url).pathname;
    console.log(pathname);
    var path = pathname.substr(1);
    if (path == "/" || path == "/html" || path == "")
        path = "html/index.html";
    if (path == "/favicon.ico")
        return;
    console.log(path);
    fs.readFile("./" + path, "utf-8", function(err, data) {
        if (err) {
            console.log(err);
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.write(fs.readFileSync("./html/index.html"));
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
        }
        res.end();
    });
}

//处理传递的数据
function getData(req, res, postData, statu) {
    console.log("Get POST data from html page.");
    res.writeHead(200, { "Content-Type": "text/html" });
    console.log(postData);
    var index0 = postData.indexOf("&");
    var index1 = postData.indexOf("&", index0 + 1);
    var index2 = postData.indexOf("&", index1 + 1);
    var index3 = postData.indexOf("=");
    var index4 = postData.indexOf("=", index3 + 1);
    var index5 = postData.indexOf("=", index4 + 1);
    var index6 = postData.indexOf("=", index5 + 1);
    var _username = postData.substring(index3 + 1, index0);
    var _id = postData.substring(index4 + 1, index1);
    var _phone = postData.substring(index5 + 1, index2);
    var _email = postData.substring(index6 + 1);
    if (!/[@]/.test(_email)) {
        _email = decodeURIComponent(_email);
    }
    var string_data = fs.readFileSync("./data/user.json");
    var json_data;
    if (string_data == "") {
        json_data = {
            username: [],
            id: [],
            phone: [],
            email: [],
        };
    } else
        json_data = JSON.parse(string_data);
    if (statu == 0) {
        var ret = "";
        if (!dataCheck(json_data, _username, _id, _phone, _email))
            res.write('<script>window.location.href="http://localhost:8080";</script>');
        else {
            for (var i = 0; i < json_data.username.length; i++) {
                if (json_data.username[i] == _username)
                    ret = "用户名： " + _username + "<br />学号： " + json_data.id[i] + "<br />电话： " + json_data.phone[i] + "<br />邮箱： " + json_data.email[i];
            }
            res.write(ret);
        }
        res.end();
        return;
    }
    var ret_code = dataCheck(json_data, _username, _id, _phone, _email);
    if (ret_code == 0) {
        json_data.username.push(_username);
        json_data.id.push(_id);
        json_data.phone.push(_phone);
        json_data.email.push(_email);
        var ret = "以下为您提交的信息：<br />用户名： " + _username + "<br />学号： " + _id + "<br />联系电话： " + _phone + "<br />邮箱： " + _email;
        res.write(ret);
        fs.writeFileSync("./data/user.json", JSON.stringify(json_data));
        res.end();
    } else {
        switch (ret_code) {
            case 1:
                res.write("<script>alert('当前用户已经存在!请不要重复注册!');history.go(-1)</script>");
                break;
            case 2:
                res.write("<script>alert('当前学号已经存在!请不要重复注册!');history.go(-1)</script>");
                break;
            case 3:
                res.write("<script>alert('当前电话已经存在!请不要重复注册!');history.go(-1)</script>");
                break;
            case 4:
                res.write("<script>alert('当前邮箱已经存在!请不要重复注册!');history.go(-1)</script>");
                break;
        }
        res.end();
    }
}

function dataCheck(json_data, _username, _id, _phone, _email) {
    console.log(_id);
    for (var i = 0; i < json_data.username.length; i++) {
        if (json_data.username[i] == _username)
            return 1;
        if (json_data.id[i] == _id)
            return 2;
        if (json_data.phone[i] == _phone)
            return 3;
        if (json_data.email[i] == _email)
            return 4;
    }
    return 0;
}

exports.page = getPage;
exports.data = getData;
exports.check = dataCheck;