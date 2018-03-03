var count = 0;
var steps = 0;
var pos = 1;
var t;
var startCount = false;

window.onload = init;

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
	//alert(parts[0]);
	document.getElementById('start').onclick = startGame;
	document.getElementById('getback').onclick = getback;
}
function startGame() {
	//alert("lala");
	document.getElementById("start").disabled = true;
	document.getElementById('getback').disabled = false;
	mess();
	
	startCount = true;
	
	var timer = setInterval(function(){
		if(!startCount){
        	clearInterval(timer);
        }else{
        	var x = document.getElementById('time_bar');
			x.value = count;
			count++;
    	}
	},1000);

	for (var r = 1; r < 5; ++r) {
		for (var c = 1; c < 5; ++c) {
			document.getElementById( "r" + r + "c" + c).onclick = function() {
				//alert("r" + r + "c" + c);
				change(this);
			}
		}
	}
	document.getElementById("step_bar").value = steps;
}
var id;
var new_part;
var blankR = 4;
var blankC = 4;
function mess() {  // ramdomly motify the steps
	
	for (var i = 0; i < 100; ++i) {
		var choice = Math.round(Math.random() * 4);
		switch (choice) {
			case 0:
			if ((blankC - 1) > 0) {
				id = document.getElementById('r' + blankR + 'c' + (blankC - 1));
				new_part = document.getElementById('r' + blankR + "c" + blankC);
				var x = parseInt(id.className[8]);
				var y = parseInt(id.className[10]);
				id.className = new_part.className;
				blankR = x;
				blankC = y;
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
	var square = document.getElementsByClassName("part");
	for(var i = 0; i < 16; i++) {
		if(square[i].className == "part pos4-4") {
			blankC = (i + 1) % 4;
			if(blankC == 0) blankC = 4;

			if(i >= 0 && i <= 3) blankR = 1;
			if(i >= 4 && i <= 7) blankR = 2;
			if(i >= 8 && i <= 11) blankR = 3;
			if(i >= 12 && i <= 15) blankR = 4;

			break;
			//alert(i);
		}
	}
	//alert(+blankC  + " " + blankR);
}
function getback() {
	document.getElementById('getback').disabled = true;
	document.getElementById('start').disabled = false;
	steps = 0;
	count = 0;
	startCount = false;

	var x = document.getElementById('time_bar');
	x.value = "0";

	var y = document.getElementById('step_bar');
	y.value = "0";
	

	for (var i = 1; i <= 4; i++) {
		for (var j = 1; j < 5; j++) {
			document.getElementById("r" + i + "c" + j).className = "part pos" + i + "-" + j;
        	parts[(i - 1) * 4 + j - 1].onclick = function () { return false; } // Remove onclick event
		} 
    }
	// mix();
}
function change(part) {
	//alert(part.id);
	var x = parseInt(part.id[3]);
	var y = parseInt(part.id[1]);
	//alert(x + " xy " + y);
	if ((Math.abs(y - blankR) <=1 && x == blankC) ||( Math.abs(x - blankC) <=1 && y == blankR)) {
		//alert("here");
		var tempClass = part.className;
		part.className = "part pos4-4";
		var new_part = document.getElementById('r' + blankR + "c" + blankC);
		blankC = x;
		blankR = y;
		new_part.className = tempClass;
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
			if (document.getElementById('r' + i + 'c' + j).className != "part pos" + i + "-" + j) {
				return false;
			}
		}
	}
	return true;
}
function win() {
	alert("You win!\nYou used " + steps + " steps\nYou used " + count + " seconds\n");
	getback();
	startCount = false;
}