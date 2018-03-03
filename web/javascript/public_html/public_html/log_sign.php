<!doctype html>
<html>

<head>
<meta charset="utf-8">
<title>登陆</title>
<link rel="stylesheet" href="log_sign.css">
</head>

<body>

	<div id="login">
        <div id="head"><h1>登陆</h1></div>
        <div id="input_message">
    	<form action="" method="post" autocomplete="on">
        	<input type="text" placeholder="请输入账号" required="required" id="account">
            <br>
            <input type="password" placeholder="请输入密码" required="required" id="password">
            <br>
            <input type="text" placeholder="验证码" required="required" id="check">
            <img src="image/vcode.jpg" alt="点击刷新" id="vcode">
        </form>
        </div>
        <div id="jump">
        	<a href="#" id="jump_forget">忘记密码</a>
            <br>
            <a href="#" id="jump_reg">注册账户</a>
        </div>
    </div>
    
    <div id="register">
    	<form action="" method="post" autocomplete="on">
        	
        </form>
    </div>
    
</body>

</html>