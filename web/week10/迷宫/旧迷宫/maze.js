var ifwin = false;
var isstart = false;
var isalert = false;
var start = document.getElementById('startpoint');
var end = document.getElementById('endpoint');
var maze = document.getElementById('maze');



start.onmouseover = function ()
{
	isstart = true;
	document.getElementById('pointer').className = "imgchange";
	function mouseleave()
	{
		if(ifwin == false && isstart == true)
		{
			alert("Don't cheat!");
			isstart = false;
			document.getElementById('pointer').className = "imgnormal";
		}
	}
	function onwall()
	{
		if (isstart)
		{
			event.target.style.backgroundColor = '#fc4225';
			isstart = false;
			document.getElementById('pointer').className = "imgnormal";
		}
	}
	function leavewall()
	{
		event.target.style.backgroundColor = 'black';
	}
	function win()
	{
		if (isstart)
		{
			ifwin = true;
			alert("You Win!");
			isstart = false;
			document.getElementById('pointer').className = "imgnormal";
		}
	}
		ifwin = false;
		document.getElementById('o_1').onmouseover = function () {onwall()};
		document.getElementById('o_2').onmouseover = function () {onwall()};
		document.getElementById('o_3').onmouseover = function () {onwall()};
		document.getElementById('o_4').onmouseover = function () {onwall()};
		document.getElementById('o_5').onmouseover = function () {onwall()};
		document.getElementById('o_6').onmouseover = function () {onwall()};
		document.getElementById('o_1').onmouseleave = function () {leavewall()};
		document.getElementById('o_2').onmouseleave = function () {leavewall()};
		document.getElementById('o_3').onmouseleave = function () {leavewall()};
		document.getElementById('o_4').onmouseleave = function () {leavewall()};
		document.getElementById('o_5').onmouseleave = function () {leavewall()};
		document.getElementById('o_6').onmouseleave = function () {leavewall()};
		maze.onmouseleave = function () {mouseleave()};
		end.onmouseover = function () {win()};
	
		
}