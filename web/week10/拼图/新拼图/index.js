var total = $("#total");
var oFragment = document.createDocumentFragment();
var havestart = false;
var size = 4;
var start = false;
var second = 99;
var timer = null;

for (var i = 0; i < size; i++) 
{
	for (var j = 0; j < size; j++) 
	{
		var frag = document.createElement("div");
		frag.id = "divId"+(i*size+j);
		frag.className = "div"+(i*size+j);
		oFragment.appendChild(frag);
	}
}

function countdown()
{
	$("#time").val(second);
	if (second)
	{
		second--;
		timer = setTimeout("countdown()",1000);
	}
	else
	{
		alert("Game Over");
		start = false;
	}
}

total.append(oFragment);
var div = $("#total div");

var array = new Array;
for (var i = 0; i < size*size-1; i++) 
{
	array[i] = i;
}


total.click(function () 
{
	if (start == true) 
	{ 
		var temp = parseInt(event.target.className.substr(3));
		var classname = event.target.className;
		var blank = parseInt(document.getElementById("divId15").className.substr(3));
		var blankname = document.getElementById("divId15").className;
		var blankx = Math.floor(blank/size), blanky = blank%size;
		var i = Math.floor(temp/size);
		var j = temp%size;
		if (Math.abs(blankx-i) == 1 && blanky == j || Math.abs(blanky-j) == 1 && blankx == i) 
		{
			document.getElementById("divId15").className = "div"+(size*i+j);
			event.target.className = "div"+(size*blankx+blanky);
			var digit = array.indexOf("blank");
			array[array.indexOf(temp)] = blank;
			array[digit] = temp;
			if (check()) 
			{
				alert("You win~");
				start = false;
			}
		}
	}
});

function check() 
{
	for (var i = 0; i < size*size-1; i++)
		if (array[i] != i)
			return false;
	return true;
}

$("#play").click(function () 
{
	second = 99;
	clearInterval(timer);
 	timer = null;
	start = true;
	countdown();
	var count = 0;
	while (count % 2 != 0 || count == 0) 
	{
		count = 0;
		array.sort(function(){ return 0.5 - Math.random() })
		for (var i = 0; i < size*size-1; i++) 
		{
			var temp = array[i];
			for (var j = i+1; j < size*size-1; j++) 
			{
				if (array[j] < temp) ++count;
			}
		}
	}
	for (var i = 0; i < size*size-1; i++) 
	{
		document.getElementById("divId"+i).className = "div"+array[i];
	}
});
