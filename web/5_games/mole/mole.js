var start = false;
var score = 0;
var time = 30;
window.onload = function () {
    map();
    for (var i = 0; i < document.getElementById("radio").length; ++i) {
        document.getElementsByClassName("radio")[i].disabled = true;
    }
    document.getElementById("stage").value = "Game Over";
    document.getElementById("operation").onclick = oper();
}
function map() {
    var num = 0;
    
    for (var i = 0; i < 6; ++i) {
        for (var j = 0; j < 10; ++j) {
            var map = document.getElementById("box");
            var node = document.createElement("input");
            node.type = "radio";
            node.checked = false;
            node.className = "radio";
            node.id = "" + num;
            ++num;
            map.appendChild(node);
        }
        var line = document.createElement("br");
        map.appendChild(line);
    }
}


function countTime() {
    if (time == 0) {
        alert("Game over.\nYour score is: " + score);
    } else if (time > 0) {
        count.innerHTML = time;
        time--;
        var count = document.getElementById("times");
    }
}
function oper() {
    if (start == false) {
        for (var i = 0; i < document.getElementsByClassName("radio").length; i++) {
            document.getElementsByClassName("radio")[i].disabled = false;
        }
        document.getElementById("stage").value = "Playing";
        setInterval(countTime, 1000);
        hit();
        document.getElementById("operation").onclick = oper();
    } else {
        start = false;
        for (var i = 0; i < document.getElementsByClassName("radio").length; i++) {
            document.getElementsByClassName("radio")[i].disabled = true;
        }
        document.getElementById("stage").value = "Gameover";
        document.getElementById("operation").onclick = oper();
    }
}
function Random() {
    var randomNum = Math.floor(Math.random() * 60);
    document.getElementById("" + randomNum).checked = true;
    return randomNum;
}
function hit() {
    var mole = Random();
    for (var i = 0; i < document.getElementsByClassName("radio").length; i++) {
        document.getElementsByClassName("radio")[i].onclick = function() {
            if (this.id == "" + mole) {
                document.getElementById("scorer").value = parseInt(document.getElementById("scorer").value) + 1;
                this.checked = false;
                mole = generateMole();
            } else if (this.id != "" + mole) {
                document.getElementById("scorer").value = parseInt(document.getElementById("scorer").value) - 1;
                mole = generateMole();
            }
        }
    }
}