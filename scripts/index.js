var buttons = [document.createElement('input'),
				document.createElement('input'),
				document.createElement('input'),
				document.createElement('input')];
var bars; //progressbars here. They can't seem to be created using createElement.
var barlengths; //the barlengths are the ACTUAL percent of a given progress bar. 
				//the virtual values of a progress bar (which anyone can see) ends at 100%. 

var values = [-25, -10, 10, 25];
var selector;

//
var barCurrVal = 0;
var barTargetVal = 0;
				
window.onload = function() 
{
	//this should save the bars into global space
	bars = [document.getElementById("progress1"),
			document.getElementById("progress2"),
			document.getElementById("progress3")];
	barlengths = [1,1,1]; //initialize bar values
									
	selector = document.getElementById("barselector");
		
	for (var i = 0; i < 4; ++i)
	{
		buttons[i].type = "button";
		buttons[i].id = "button" + i;
		buttons[i].value = values[i] + "";
		buttons[i].addEventListener('click', affectbar(selector.selectedIndex, values[i]));
		document.body.appendChild(buttons[i]);
	}

}


function affectbar( selectedindex, value)
{
	alert(selectedindex + " " + value);
	barCurrVal = barlengths[selectedindex];
	barTargetVal = barCurrVal + value;
	
	updateBar(selectedindex);
	
}


function updateBar(selectedindex) 
{
  var selectedbar = bars[selectedindex].childNodes[0];
	
  var id = setInterval(frame, 10);
  function frame() 
  {
    if (barCurrVal >= barTargetVal) 
	{
      clearInterval(id);
	  barlengths[selectedindex] = barTargetVal;
	  barCurrVal = barTargetVal = 0;
    } 
	else 
	{
      barCurrVal++; 
      selectedbar.style.width = barCurrVal + '%'; 
      selectedbar.innerHTML = barCurrVal * 1  + '%';
    }
  }
}