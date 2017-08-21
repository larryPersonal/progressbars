var endpoint = "http://pb-api.herokuapp.com/bars";
var buttons = [document.createElement('input'),
				document.createElement('input'),
				document.createElement('input'),
				document.createElement('input')];
var bars; //progressbars here. They can't seem to be created using createElement.
var barbackgrounds; //backgrounds of the bars here.
var barlengths; //the barlengths are the ACTUAL percent of a given progress bar. 
				//the virtual values of a progress bar (which anyone can see) ends at 100%. 

var values; 
var selector = document.createElement('select');
var maxlength = 100;
var barCurrVal = 0;
var barTargetVal = 0;

var barAnimating = false;

				
window.onload = function() 
{
	Init();
		
	for (var i = 0; i < 4; ++i)
	{
		buttons[i].type = "button";
		buttons[i].id = "button" + i;
		buttons[i].value = values[i];
		buttons[i].addEventListener('click', function() {
			affectbar(selector.selectedIndex, this.value)
		});
		document.body.appendChild(buttons[i]);
	}

}

function Init()
{
	//this should save the bars into global space
	//the HTML
	bars = [document.getElementById("progress1"),
			document.getElementById("progress2"),
			document.getElementById("progress3"),
			document.getElementById("progress4"),
			document.getElementById("progress5")];
	backgrounds = [document.getElementById("progressback1"),
			document.getElementById("progressback2"),
			document.getElementById("progressback3"),
			document.getElementById("progressback4"),
			document.getElementById("progressback5")];		

	selector = document.getElementById("barselector");
	selector.id = "barselector";
	selector.selectedIndex = 0;
	
	var barjson = JSON.parse(QueryEndPoint());
	values = barjson.buttons; 
	barlengths = barjson.bars;
	for (var i = 0; i < barlengths.length; ++i)
	{
		bars[i].setAttribute("style","width:" + barlengths[i] +"%" ); 
		bars[i].innerHTML = barlengths[i] * 1  + '%';
		var option = document.createElement("option");
		option.text = "#progress" + (i + 1);
		selector.add(option);
	}
	
	for (var j = barlengths.length; j < bars.length; ++j)
	{
		if (bars[j] !== null)
			bars[j].setAttribute("style","display:none");
			
		if (backgrounds[j] !== null)
			backgrounds[j].setAttribute("style","display:none");
		
	}	
	maxlength = barjson.limit;
}

//this function reads data from the end point.
function QueryEndPoint()
{
    var Httpreq = new XMLHttpRequest(); 
    Httpreq.open("GET",endpoint,false);
    Httpreq.send(null);
    return Httpreq.responseText;          

}


function affectbar( selectedindex, value)
{
	if (barAnimating == true) return;
	
	barCurrVal = parseInt(barlengths[selectedindex]);
	barTargetVal = barCurrVal + parseInt(value);
	if (barTargetVal > maxlength) barTargetVal = maxlength;
	if (barTargetVal < 0) barTargetVal = 0;
	
	var forwarddirection = true;
	if (barTargetVal == barCurrVal) return; //no animation required, length is the same
	if (barTargetVal > barCurrVal) forwarddirection = true;
	if (barTargetVal < barCurrVal) forwarddirection = false;
	
	updateBar(selectedindex, forwarddirection);
	
}


function updateBar(selectedindex, direction) 
{
	var selectedbar = bars[selectedindex];
	var id; // interval
  
	barAnimating = true;
	if (direction == false)
		id = setInterval(framebackward, 10);
	else
		id = setInterval(frameforward, 10);
  
	//the following 2 functions are scoped to updateBar only
	//frameforward - animate in the forward direction
	function frameforward()
	{
		if (barlengths[selectedindex] >= barTargetVal) 
		{
			clearInterval(id);
			barlengths[selectedindex] = barTargetVal;
			barCurrVal = barTargetVal = 0;
			barAnimating = false;
		} 
		else 
		{
			barlengths[selectedindex]++;
	  
			var targetwidth = barlengths[selectedindex]/maxlength * maxlength;
	    
			if (targetwidth <= 100)
				selectedbar.setAttribute("style","width:" + targetwidth +"%;background-color:blue;" ); 
			else
				selectedbar.setAttribute("style","width:100%; background-color:red;" ); 

			selectedbar.innerHTML = barlengths[selectedindex] * 1  + '%';
		}	
	}

	//framebackward - animate in the reverse direction
	function framebackward()
	{
		if (barlengths[selectedindex] <= barTargetVal) 
		{
			clearInterval(id);
			barlengths[selectedindex] = barTargetVal;
			barCurrVal = barTargetVal = 0;
			barAnimating = false;
		} 
		else 
		{
			barlengths[selectedindex]--;
	  
			var targetwidth = barlengths[selectedindex]/maxlength * maxlength;
			if (targetwidth <= 0)
			{
				selectedbar.setAttribute("style","width:0%"); 
			}
			else if (targetwidth >= 100)
			{
				selectedbar.setAttribute("style","width:100%; background-color:red;" ); 
	  
			}
			else
			{
				selectedbar.setAttribute("style","width:" + targetwidth +"%;background-color:blue" ); 
	  
			}
			selectedbar.innerHTML = barlengths[selectedindex] * 1  + '%';
		}
	}
}
