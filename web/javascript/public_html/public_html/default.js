// JavaScript Document

function clearMessage() {
    document.getElementById("login_name").value = "";
}

function judgeAccount() {
	if (document.getElementById("login_name").value == "") {
		document.getElementById("login_name").value = "手机号/账号/邮箱";
	}
}
