window.onload = function() {
    var name = document.getElementsByName("username")[0];
    var id = document.getElementsByName("id")[0];
    var phone = document.getElementsByName("phone")[0];
    var email = document.getElementsByName("email")[0];
    var submit = document.getElementsByClassName("submit")[0];
    var hint = document.getElementsByClassName("hint");
    var is_valid = function() {
        if (/[^a-zA-Z]/.test(name.value[0])) {
            hint[0].innerHTML = "*用户名首位应为字母";
        } else if (name.value.length < 6 || name.value.length > 18) {
            hint[0].innerHTML = "*用户名长度限制在6-18位之间";
        } else if (/[^a-zA-Z0-9_]/.test(name.value)) {
            hint[0].innerHTML = "*用户名不允许出现除英文、数字和下划线的其它字符";
        } else {
            hint[0].innerHTML = "";
        }
        if (id.value[0] == 0) {
            hint[1].innerHTML = "*学号不能以0开头";
        } else if (id.value.length != 8) {
            hint[1].innerHTML = "*学号长度应为8位";
        } else if (/[^0-9]/.test(id.value)) {
            hint[1].innerHTML = "*学号应全为数字";
        } else {
            hint[1].innerHTML = "";
        }
        if (phone.value[0] == 0) {
            hint[2].innerHTML = "*电话不能以0开头";
        } else if (phone.value.length != 11) {
            hint[2].innerHTML = "*电话长度应为11位";
        } else if (/[^0-9]/.test(phone.value)) {
            hint[2].innerHTML = "*电话应全为数字";
        } else {
            hint[2].innerHTML = "";
        }
        if (!/.+@.+\..+/.test(email.value)) {
            hint[3].innerHTML = "*邮箱格式错误";
        } else {
            hint[3].innerHTML = "";
        }
        for (var i = 0; i < 4; i++) {
            if (document.getElementsByTagName("input")[i].value == "") {
                hint[i].innerHTML = "";
            }
        }
        var ajax = new XMLHttpRequest();

    }
    for (var i = 0; i < 4; i++) {
        document.getElementsByTagName("input")[i].onkeyup = is_valid;
    }
}