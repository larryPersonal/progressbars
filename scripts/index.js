var buttons = [document.createElement('input'),
				document.createElement('input'),
				document.createElement('input'),
				document.createElement('input')];
var bars; //progressbars here. They can't seem to be created using createElement.
var barlengths; //the barlengths are the ACTUAL percent of a given progress bar. 
				//the virtual values of a progress bar (which anyone can see) ends at 100%. 

var values = [-25, -10, 10, 25];
var selector;
var maxlength = 100;

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
		buttons[i].value = values[i];
		buttons[i].addEventListener('click', function() {
			affectbar(selector.selectedIndex, this.value)
		});
		document.body.appendChild(buttons[i]);
	}

}


function affectbar( selectedindex, value)
{
	alert(selectedindex + " " + value);
	barCurrVal = parseInt(barlengths[selectedindex]);
	barTargetVal = barCurrVal + parseInt(value);
	
	updateBar(selectedindex);
	
}


function updateBar(selectedindex) 
{
  var selectedbar = bars[selectedindex].getElementsByTagName('div')[0];
  
  var id = setInterval(frame, 10);
  function frame() 
  {
    if (barlengths[selectedindex] >= barTargetVal) 
	{
      clearInterval(id);
	  barlengths[selectedindex] = barTargetVal;
	  barCurrVal = barTargetVal = 0;
    } 
	else 
	{
      barlengths[selectedindex]++;
	  
	  var targetwidthpercent = barlengths[selectedindex]/maxlength * 100;
	  
	  if (targetwidthpercent >= 1)
	  {
		selectedbar.setAttribute("style","width:100%"); 
	  }
	  else if (targetwidthpercent <= 0)
	  {
		selectedbar.setAttribute("style","width:0%"); 
	  
	  }
	  else
	  {
		selectedbar.setAttribute("style","width:" + targetwidthpercent +"%" ); 
	  
	  }
      selectedbar.innerHTML = barlengths[selectedindex] * 1  + '%';
    }
  }
}