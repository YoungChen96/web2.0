var ifwin = false;
var isstart = false;
var isalert = false;

$("#startpoint").mouseover(function ()
{
	isstart = true;
	$("#pointer").removeClass().addClass("imgchange");
	ifwin = false;
	$(".wall").mouseover(function(){
		onwall();
	});
	$(".wall").mouseleave(function(){
		leavewall();
	});
	$("#maze").mouseleave(function(){
		mouseleave();
	});
	$("#endpoint").mouseover(function(){
		win();
	});
});

function mouseleave()
{
	if(ifwin == false && isstart == true)
	{
		alert("Don't cheat!");
		isstart = false;
		$("#pointer").removeClass().addClass("imgnormal");
	}
}

function onwall()
{
	if (isstart)
	{
		event.target.style.backgroundColor = '#fc4225';
		isstart = false;
		$("#pointer").removeClass().addClass("imgnormal");
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
		$("#pointer").removeClass().addClass("imgnormal");
	}
}