var sortarray = new Array();
var indexnumber;
var tr_holder;
var tbody_holder;
var tr_result;

$(document).ready(function()
{
	$("th").click(function()
	{
		if ($(this).parents("table").attr("id") == "todo")
		{
			tr_holder = $("#todo").find("tbody tr");
			tbody_holder = $("#todo").find("tbody");
		}
		else
		{
			tr_holder = $("#staff").find("tbody tr");
			tbody_holder = $("#staff").find("tbody");
		}

		indexnumber = $(this).index();
		sortarray.length = 0;
		
		$(tr_holder).find("td").each(function()
		{
			if ($(this).index() == indexnumber)
			{
				sortarray.push($(this).text());
			}
		})

		if ($(this).hasClass("sortascend")) 
		{
      		$("th").removeClass();
      		$(this).addClass("sortdescend");
      		descend();
    	} 
    	else 
    	{
      		ascend();
     	 	$("th").removeClass();
     	 	$(this).addClass("sortascend");
    	}
	})
})

//7 lines
function ascend() 
{
  sortarray.sort();
  for (var i = 0; i <= 2; i++) 
  {
    for (var j = 0; j < 3; j++) 
    {
    	var bodyTds = $(tr_holder[j]).find("td");
      	if (bodyTds[indexnumber].innerHTML == sortarray[i]) 
      	{
       		tbody_holder.append(tr_holder[j]);
      	}
    }
  }
}

//7 lines
function descend() 
{
  sortarray.sort();
  for (var i = 2; i >= 0; i--) 
  {
    for (var j = 0; j < 3; j++) 
    {
      var bodyTds = $(tr_holder[j]).find("td");
      	if (bodyTds[indexnumber].innerHTML == sortarray[i]) 
      	{
       		tbody_holder.append(tr_holder[j]);
      	}
    }
  }
}