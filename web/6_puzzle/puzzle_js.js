var count = 0;
var steps = 0;
var pos = 1;
var t;

/*var idArr = [
	"r1c1", "r1c2", "r1c3", "r1c4", "r2c1", "r2c2", "r2c3", "r2c4",
	"r3c1", "r3c2", "r3c3", "r3c4", "r4c1", "r4c2", "r4c3", "r4c4"
]
*/
init();

function init() {
	for (var r = 1; r < 5; ++r) {
		for (var c = 1; c < 5; ++c) {
			var node = document.createElement("div");
			node.id = "r" + r + "c" + c;
			node.className = "part pos" + r + "-" + c;
			var game = document.getElementById('game');
			game.appendChild(node);
		}
	}
	parts = document.getElementsByClassName("part");
	document.getElementById('start').onclick = startGame;
	document.getElementById('getback').onclick = getback;
}
function startGame() {
	document.getElementById("start").disabled = true;
	document.getElementById('getback').disabled = false;
	mess();
	countTime();
	for (x in parts) {
		parts[x].onclick = function() {
			change(this);
		}
	}
	document.getElementById("step_bar").value = steps;
}
var id;
var new_part;
var blankR = 4;
var blankC = 4;
function mess() {  // ramdomly motify the steps
	
	for (var i = 0; i < 50; ++i) {
		var choice = Math.round(Math.random() * 4);
		switch (choice) {
			case 0:
			if ((blankC - 1) > 0) {
				id = document.getElementById('r' + blankR + 'c' + (blankC - 1));
				new_part = document.getElementById('r' + blankR + "c" + blankC);
				var x = parseInt(id.className[8]);
				var y = parseInt(id.className[10]);
				id.className = new_part.className;
				changeBlank();
				function changeBlank() {
					blankR = x;
					blankC = y;
				}
				new_part.className = "part pos" + x + "-" + y;
			}
			break;
			case 1:
			if ((blankC + 1) < 5) {
				id = document.getElementById('r' + blankR + 'c' + (blankC + 1));
				new_part = document.getElementById('r' + blankR + "c" + blankC);
				var x = parseInt(id.className[8]);
				var y = parseInt(id.className[10]);
				id.className = new_part.className;
				blankR = x;
				blankC = y;
				new_part.className = "part pos" + x + "-" + y;
			}
			break;
			case 2:
			if ((blankR - 1) > 0) {
				id = document.getElementById('r' + (blankR - 1) + 'c' + blankC);
				new_part = document.getElementById('r' + blankR + "c" + blankC);
				var x = parseInt(id.className[8]);
	var y = parseInt(id.className[10]);
	id.className = new_part.className;
	blankR = x;
	blankC = y;
	new_part.className = "part pos" + x + "-" + y;
			}
			break;
			case 3:
			if ((blankR + 1) < 5) {
				id = document.getElementById('r' + (blankR + 1) + 'c' + blankC);
				new_part = document.getElementById('r' + blankR + "c" + blankC);
				var x = parseInt(id.className[8]);
	var y = parseInt(id.className[10]);
	id.className = new_part.className;
	blankR = x;
	blankC = y;
	new_part.className = "part pos" + x + "-" + y;
			}
			break;
		}
	}
}
function getback() {
	document.getElementById('getback').disabled = true;
	document.getElementById('start').disabled = false;
	steps = 0;
	count = 0;
	t =clearTimeout();
	for (var i = 1; i <= 4; i++) {
		for (var j = 1; j < 5; j++) {
			document.getElementById("r" + i + "c" + j).className = "part pos" + i + "-" + j;
        	parts[i - 1].onclick = function () { return false; } // Remove onclick event
		} 
    }
	// mix();
}
function change(part) {
	var x = parseInt(part.className[8]);
	var y = parseInt(part.className[10]);
	if (Math.abs(y - blankC) <=1 || Math.abs(x - blankR) <=1) {
		part.className = "part pos" + blankR + "-" + blankC;
		var new_part = document.getElementById('r' + blankR + "c" + blankC);
		blankC = y;
		blankR = x;
		new_part.className = "part pos" + x + "-" + y;
		++steps;
		document.getElementById("step_bar").value = steps;
	}
	if (finish()) {
		win();
	}
}
function finish() {
	for (var i = 1; i < 5; ++i) {
		for (var j = 1; j < 5; ++j) {
			if (document.getElementById('r' + i + 'c' + j).className != "pos" + i + "-" + j) {
				return false;
			}
		}
	}
	return true;
}
function countTime() {
	var x = document.getElementById('time_bar');
	x.value = count;
	++count;
	t = setTimeout("countTime", 1000);
}
function win() {
	alert("You win!\nYou used " + steps + " steps\nYou used " + count + " seconds\n");
	getback();
}
