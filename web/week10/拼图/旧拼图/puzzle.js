var play = document.getElementById('play');
var time = document.getElementById('time');
var level = document.getElementById('level');
var ground = document.getElementById('ground');
var ref = document.getElementById('reference');
var skip = document.getElementById('skip');
var grade = 1;
var second = 90;
var ongame = false;
var timer = null;
var size; //size of puzzle
var PieceSize;
var blacktop, blackleft;
var count = 0;
var piece = new Array();
var order = new Array();



function run(x,y)
{
	alert(x);
	move(x,y);
}

function start()
{
 		clearBoard();
 		ongame = true;
 		clearInterval(timer);
 		timer = null;
 		second = 99;
 		ref.className = "ref"+grade;
		level.value = grade;
		createpuzzle(grade);
		countdown();

}

function countdown()
{
	time.value = second;
	if (second)
	{
		second--;
		timer = setTimeout("countdown()",1000);
	}
	else
	{
		alert("Game Over");
		clearBoard();
		ongame = false;
	}
}


function createpuzzle(n)
{
	size = 2 + n;
	PieceSize = 360 / (2 + n);
	piece.length = size;
	for (var i = 0; i < size; i++)
	{
		piece[i] = new Array(size);
		count = 0;
		for(var j = 0; j < size; j++)
		{
			if (i == (size - 1) && j == (size - 1))
			{
				break;
			}
			piece[i][j] = document.createElement("div");
			piece[i][j].className = "puzzles";
			piece[i][j].id = count;
			piece[i][j].style.top = i*PieceSize+"px";
			piece[i][j].style.left = j*PieceSize+"px";
			piece[i][j].style.backgroundImage = "url(img/levels"+n+".jpg)";
			piece[i][j].style.width = (PieceSize-2)+"px";
			piece[i][j].style.height = (PieceSize-2)+"px";
			
			var dy = -i*PieceSize;
			var dx = -j*PieceSize;

			piece[i][j].style.backgroundPosition=dx+"px "+dy+"px";
			count++;
		}
	}

	function randomsort(a, b) 
	{
		return Math.random()>.5 ? -1 : 1;
	}

	order.length = (size*size-1)
	
	for(i = 0; i < size*size-1; i++)
	{
		order[i]=i;
	}
	//check whether it can put back
	while(1)
	{
		order.sort(randomsort);
		var e,f,tol=0;
		for (e = 0; e < size*size-1; e++)
		{
			for (f = e + 1; f < size*size-1; f++)
			{
				if (order[e] > order[f])
				{
					tol++
				}
			}
		}
		if (tol % 2 == 0)
		{
			break;
		}
	}
	

	var pi,pj;

	var total = 0;

	for (i = 0; i < size; i++)
	{
		for (j = 0; j < size; j++)
		{
			if (!(i === size-1 && j == size-1))
			{
				pi = parseInt((order[total])/size);
				if ((order[total]-pi*size) >= 0)
				{
					pj = order[total]-pi*size;
				}
				else
				{
					pj = order[total];
				}
				piece[i][j].style.top = pi*PieceSize+"px";
				piece[i][j].style.left = pj*PieceSize+"px";
				total++;
			}
			
		}
	}

	

	//tracking the position of the blank
	blanktop = (size-1)*PieceSize;
	blankleft = (size-1)*PieceSize;

	for (i = 0; i < size; i++)
	{
		for (j = 0; j < size; j++)
		{
			if (!(i === size-1 && j == size-1))
			ground.appendChild(piece[i][j]);
		}
	}

	for (var a = 0; a < size; a++)
	{
		for (var b = 0; b < size; b++)
		{
			if (a == size-1 && b == size -1)
			{
				
			}
			else
			{
				piece[a][b].onclick = function () 
				{ 
					if (ongame)
					{
						move(this); 
					}
				}
			}
			
		}
	}	
}
function move(pie)
{
	while(1)
	{
		//bottom
		if (blanktop != (size-1)*PieceSize)
		{
			if (pie.style.top == ((blanktop+PieceSize)+"px") && pie.style.left == blankleft+"px")
			{
				pie.style.top = blanktop+"px";
				blanktop = blanktop + PieceSize;
				break;
			}

			
		}
		//top
		if (blanktop != 0)
		{
			if (pie.style.top == ((blanktop-PieceSize)+"px") && pie.style.left == blankleft+"px")
			{
				pie.style.top = blanktop+"px";
				blanktop = blanktop - PieceSize;
				break;
			}
			
		}
		//left
		if (blankleft != 0)
		{
			if (pie.style.left == ((blankleft-PieceSize)+"px") && pie.style.top == blanktop+"px")
			{
				pie.style.left = blankleft+"px";
				blankleft = blankleft - PieceSize;
				break;
			}
			
		}
		//right
		if (blankleft != (size-1)*PieceSize)
		{
			if (pie.style.left == ((blankleft+PieceSize)+"px") && pie.style.top == blanktop+"px")
			{
				pie.style.left = blankleft+"px";
				blankleft = blankleft + PieceSize;
				break;
			}
			
		}
		break;
	}
	
}
function check()
{
	var i,j;
	var win = true;
	for (i = 0; i < size; i++)
	{
		for (j = 0; j<size; j++)
		{
			if (i == size-1 && j == size-1)
			{
				break;
			}
			if (piece[i][j].style.top == i*PieceSize+"px" && piece[i][j].style.left ==j*PieceSize+"px")
			{
				continue;
			}
			else
			{
				win = false;
				break;
			}
		}
		if(win)
		{
			alert("win!");
			if (grade <3)
			{
				grade++;
			}
			clearInterval(timer);
		}
	}
	return true;
}
play.onclick = function()
{
	start();
}

ground.mouseover = function()
{
	if(ongame)
	{
		check();
	}
}
skip.onclick = function()
{
	if (grade < 3)
	{
		grade++;
		start();
	}

}
window.onload = function()
{
	createpuzzle(1);
}
function clearBoard() 
{
	var i, j;

	for (i = 0; i < size; i++)
	{
		for (j = 0; j<size; j++)
		{
			if (i == size-1 && j == size-1)
			{
				break;
			}
			piece[i][j].style.opacity = "0";
		}
	}
}