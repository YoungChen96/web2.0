(function() {
	var isOperated = false;	
})
function show_click(operand) {
	var str = String($("#_display").val());
	if(str == "0" || str == null || isOperated == true || str == "Math ERROR") {
    	str = "";
    }
	str += operand;
    isOperated =false;
	$("#_display").val(str);
}
function Delete() {
	var temp = String();
	var str = String($("#_display").val());
	if (str == null || str == "0" || str.length <= 1 || isOperated == true) {
        temp = "0";
    } else {
        temp = str.substr(0, str.length - 1);
    }
    $("#_display").val(temp);
    isOperated =false;
}
function Clear() {
    isOperated = false;
    $("#_display").val("0");
}

function getResult() {
    var result;
    toform();
    if (isinfinite()) {
        result = "Math ERROR!";
        alert("Math error!");
    } else {
        result = eval(String($("#_display").val()));
    }
    isOperated = true;
    $("#_display").val(result);
}

function isinfinite() {
    if (eval($("#_display").val()) == Infinity) return true;
    else return false;
}

// 1++1 1+-1 is permitted, using the former operation
function toform() {
    var str = String(document.getElementById("#_display").value);
    var count = 0;
    var temp = str;
    for (var i = 0; i < str.length -1; ++i) {
        if (isOper(str[i] && isOper(str[i + 1]))) {
            temp = temp.substr(0, i - count) + temp.substr(i - count + 2, str.length -1);
            count++;
        }
    }
    $("#_display").val(temp);
}

function isOper(data) {
    if (data == '+' || data == '-' || data == '*' || data == '/') return true;
    return false;
}