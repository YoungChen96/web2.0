var isOperated = false;  // judge whether we have press the '='

function show_click(operand) {
    var str = String(document.getElementById("_display").value);
	if(str == "0" || str == null || isOperated == true || str == "Math ERROR") {
            str = "";
    }
	str += operand;
    isOperated =false;
	document.getElementById("_display").value = str;
}

function Delete() {
    var temp = String();
    var str = String(document.getElementById("_display").value);
    if (str == null || str == "0" || str.length <= 1 || isOperated == true) {
        temp = "0";
    } else {
        temp = str.substr(0, str.length - 1);
    }
    document.getElementById("_display").value = temp;
    isOperated =false;
}

function Clear() {
    isOperated = false;
    document.getElementById("_display").value ="0";
}

function getResult() {
    var result;
    toform();
    if (isinfinite()) {
        result = "Math ERROR!";
        alert("Math error!");
    } else {
        result = eval(String(document.getElementById("_display").value));
    }
    // result = eval(String(document.getElementById("_display").value));
    isOperated = true;
    document.getElementById("_display").value = result;
}

function isinfinite() {
    if (eval(document.getElementById("_display").value) == Infinity) return true;
    else return false;
}

// 1++1 1+-1 is permitted, using the former one
function toform() {
    var str = String(document.getElementById("_display").value);
    var count = 0;
    var temp = str;
    for (var i = 0; i < str.length -1; ++i) {
        if (isOper(str[i] && isOper(str[i + 1]))) {
            temp = temp.substr(0, i - count) + temp.substr(i - count + 2, str.length -1);
            count++;
        }
    }
    document.getElementById("_display").value = temp;
}

function isOper(data) {
    if (data == '+' || data == '-' || data == '*' || data == '/') return true;
    return false;
}