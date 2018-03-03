var count = 0;
var steps = 0;
var timer;
var isStart = false;
var before_part;
var new_part;
var blankR = 4;
var blankC = 4;
var parts;

$(document).ready(init);
function init() {
	for (var r = 1; r < 5; ++r) {
		for (var c = 1; c < 5; ++c) {
			var node = document.createElement("div");
			node.id = "r" + r + "c" + c;
			node.className = "part pos" + r + "-" + c;
			$("#game").append(node);
		}
	}
	parts = document.getElementsByClassName("part");
	$("#start").click(startGame);
	$("#getback").click(reset);
}

function startGame() {
	if (isStart) return;
	mess();
	startCount = true;
	$("#time_bar").val("0");
	timeCount();
	for (var r = 1; r < 5; ++r) {
		for (var c = 1; c < 5; ++c) { $("#r" + r + "c" + c).click(function() {
			change(this);
		});}
	}
	$("#step_bar").val(steps);
	isStart = true;
}
function timeCount() {
	var timer = setInterval(function(){
		if(!startCount){
        	clearInterval(timer);
        } else {
        	count++;
        	var x = document.getElementById('time_bar');
			x.value = count;	
    	}
	}, 1000);
}
/*function timeEnd() {
	count = 0;
	// setTimeout($('#time_bar').val(0), 0);
	setTimeout(function() {
		document.getElementById('time_bar').value = 0;
	}, 0);
	clearTimeout(timer);
}*/
function mess() {
	_.times (100, function() {
		var choice = Math.floor(Math.random() * 3.9);
		move(choice);
	});
}
function move(choice) {
	switch(choice) {
		case 0:
		if (blankC - 1 > 0) new_part = document.getElementById('r' + blankR + 'c' + (blankC - 1)); break;
		case 1:
		if (blankC + 1 < 5) new_part = document.getElementById('r' + blankR + 'c' + (blankC + 1)); break;
		case 2:
		if (blankR - 1 > 0) new_part = document.getElementById('r' + (blankR - 1) + 'c' + blankC); break;
		case 3:
		if (blankR + 1 < 5) new_part = document.getElementById('r' + (blankR + 1) + 'c' + blankC); break;
	}
	exchange();
	findBlank();
}
function findBlank() {
	var square = document.getElementsByClassName("part");
	for (var i = 0 ; i < 16; ++i) {
		if(square[i].className == "part pos4-4") {
			blankC = (i + 1) % 4;
			if(blankC == 0) blankC = 4;
			if(i >= 0 && i <= 3) blankR = 1;
			if(i >= 4 && i <= 7) blankR = 2;
			if(i >= 8 && i <= 11) blankR = 3;
			if(i >= 12 && i <= 15) blankR = 4;
			break;
		}
	} 
}
function exchange() {
	before_part = document.getElementById('r' + blankR + "c" + blankC);
	var x = parseInt(new_part.className[8]);
	var y = parseInt(new_part.className[10]);
	new_part.className = before_part.className;
	blankR = x;
	blankC = y;
	before_part.className = "part pos" + x + "-" + y;
}
function reset() {
	if (!isStart) return;
	steps = 0;
	count = 0;
	startCount = false;
	$('#step_bar').val('0');
	$('#time_bar').val('0');
	for (var i = 1; i < 5; ++i) {
		for (var j = 1; j < 5; ++j) {
			$("#r" + i + "c" + j).removeClass();
			$("#r" + i + "c" + j).addClass("part pos" + i + "-" + j);
			parts[(i - 1) * 4 + j - 1].onclick = function() {return;}
		}
	}
	isStart = false;
}
function change(part) {
	if (!isStart) return;
	var x = parseInt(part.id[3]);
	var y = parseInt(part.id[1]);
	if ((Math.abs(y - blankR) <=1 && x == blankC) ||( Math.abs(x - blankC) <=1 && y == blankR)) {
		var tempClass = part.className;
		part.className = "part pos4-4";
		var new_part = document.getElementById('r' + blankR + "c" + blankC);
		blankC = x;
		blankR = y;
		new_part.className = tempClass;
		steps++;
		$("#step_bar").val(steps);
	}
	if (finish()) {
		win();
	}
}
function finish() {
	for (var i = 1; i < 5; ++i) {
		for (var j = 1; j < 5; ++j) {
			if (document.getElementById('r' + i + 'c' + j).className != "part pos" + i + "-" + j) {
				return false;
			}
		}
	}
	return true;
}
function win() {
	alert("You win!\nYou used " + steps + " steps\nYou used " + count + " seconds\n");
	reset();
	isStart = false;
}