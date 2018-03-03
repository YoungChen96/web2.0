var querystring = require('querystring');
var fs = require("fs");
var url = require('url');
var mime = require('./mime').types;
var Path = require("path");

exports.getRegister = function(req, res, postData, whetherHaveInf) {
    /*console.log("Register page.");
    var pathname = url.parse(req.url).pathname;
    var path = pathname.substr(1);
    // var index = path.indexOf('.');
    if (path == "/html" || path == "")
        path = "./html/index.html";
    if (path == "/favicon.ico")
        return;
    console.log(path);
    /*console.log(index);
    var ext = path.substr(index);
    /*var ext = Path.extname(pathname);
    console.log(ext);
    ext = ext ? ext.slice(1) : 'unknown';*/
    // var contentType = mime[ext] || "text/plain";
    /*console.log(ext);
    console.log(contentType);*/
    // response.writeHead(200, { 'Content-Type': contentType });
    /*fs.readFile("./" + path, "utf-8", function(err, data) {
        if (err) {
            console.log(err);
            res.writeHead(404, { 'Content-Type': "text/html" });
            res.write("5秒后自动跳转回主页面\n");
            setTimeout(function() {
                res.write(fs.readFileSync("./html/index.html"));
            }, 5000);
        } else {
            res.writeHead(200, { "Content-Type": "text/html" });
            // console.log(data);
            res.write(data);
        }
        res.end();
    })*/
    console.log("Send Page.");
    var pathname = url.parse(req.url).pathname;
    console.log(pathname);
    var path = pathname.substr(1);
    if (path == "/" || path == "/html" || path == "")
        path = "html/index.html";
    if (path == "favicon.ico")
        return;
    // console.log(path);
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

exports.getData = function(req, res, postData, whetherHaveInf) {
    console.log("Get Post data page.");
    console.log(postData);
    var informArr = postData.split("&");
    console.log(informArr);
    var index0 = informArr[0].indexOf("=");
    var userName = informArr[0].substr(index0 + 1);
    var index1 = informArr[1].indexOf("=");
    var id_number = informArr[1].substr(index1 + 1);
    var index2 = informArr[2].indexOf('=');
    var Phone = informArr[2].substr(index2 + 1);
    var index3 = informArr[3].indexOf('=');
    var Email = informArr[3].substr(index3 + 1);
    if (!/@/.test(Email)) {
        Email = decodeURIComponent(Email);
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
    } else {
        json_data = JSON.parse(string_data);
        if (!whetherHaveInf) {
            var ret = "";
            if (!dataCheck(json_data, userName, id_number, Phone, Email))
                res.write('<script>window.location.href="http://localhost:8000";</script>');
            else {
                for (var i = 0; i < json_data.username.length; i++) {
                    if (json_data.username[i] == userName)
                        ret = "用户名： " + userName + "<br />学号： " + json_data.id[i] + "<br />电话： " + json_data.phone[i] + "<br />邮箱： " + json_data.email[i];
                }
                res.write(ret);
            }
            res.end();
            return;
        }
        var ret_code = dataCheck(json_data, userName, id_number, Phone, Email);
        if (ret_code == 0) {
            json_data.username.push(userName);
            json_data.id.push(id_number);
            json_data.phone.push(Phone);
            json_data.email.push(Email);
            var ret = "以下为您提交的信息：<br />用户名： " + userName + "<br />学号： " + id_number + "<br />联系电话： " + Phone + "<br />邮箱： " + Email;
            res.write(ret);
            fs.writeFileSync("./data/user.json", JSON.stringify(json_data));
            res.end();
        } else {
            switch (ret_code) {
                case 1:
                    res.write("<script>alert('当前用户已经存在!');history.go(-1)</script>");
                    break;
                case 2:
                    res.write("<script>alert('当前学号已经存在!');history.go(-1)</script>");
                    break;
                case 3:
                    res.write("<script>alert('当前电话已经存在!');history.go(-1)</script>");
                    break;
                case 4:
                    res.write("<script>alert('当前邮箱已经存在!');history.go(-1)</script>");
                    break;
            }
            res.end();
        }
    }
}

dataCheck = function(json_data, userName, id_number, Phone, Email) {
    for (var i = 0; i < json_data.username.length; i++) {
        if (json_data.username[i] == userName)
            return 1;
        if (json_data.id[i] == id_number)
            return 2;
        if (json_data.phone[i] == Phone)
            return 3;
        if (json_data.email[i] == Email)
            return 4;
    }
    return 0;
}