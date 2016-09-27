// View
// Adds buttons
// Generates the HTML for the board 


/**
 * View 
 * 
 * @param {string} HTML element (in this case, an ID)
 * @return functions: setPresetChange,setPresetNames,updateBoard, 
    setClickHandler, setPlayButton, and setPauseButton
 */

var View = function(buttonLayer){ //the View will render content in the #buttonLayer div 
	var outer = buttonLayer.children().first(); //the div with the ID "outer" is where we will add the game tile divs to
	
	var that = Object.create(View.prototype); //creates Controller object

	//callback fn
	setPresetChange = function(presetChange){
		that.presetChange = presetChange;
	};

	//callback fn
	setPlayButton = function(playClick){
		that.playClick = playClick;
	};
	//callback fn
	setPauseButton = function(pauseClick){
		that.pauseClick = pauseClick;
	};

	//builds up the dropdown menu on UI to include all the available preset boards from boards.js
	setPresetNames = function(presetNames){
		var select = buttonLayer.prepend('<select name="presetBoards"></select>').children().first();
		presetNames.forEach(function(boardName){
			select.append('<option value="'+boardName+'">'+boardName+'</option>');
		});//end of forEach
		select.on('change', function(){
			that.presetChange($(this).val()); //when a board is selected from the dropdown menu, gets the value that's selected
		});
	};

	setClickHandler = function(clickHandler){//handles game tile clicks
		that.clickHandler = clickHandler;
	}//end setClickHandler

	//adds the pause button to the HTML and allows clicking
	buttonLayer.prepend('<button id="pause">Pause</button>').children().first().on('click',function(){ 
			that.pauseClick();
	});
	//adds the play button to the HTML and allows clicking
	buttonLayer.prepend('<button id="play">Play</button>').children().first().on('click',function(){
			that.playClick();
	});

	//takes in a board (which is an array of 1's and 0's) and generates HTML divs accordingly
	updateBoard = function(board){
		outer.empty(); //clears all the divs (the board) in the outer div
		board.forEach(function(game_tile){
			if (game_tile === 0){ //sets the div to "dead"
				outer.append('<div class="dead"></div>')
			}//end if
			else{//it is a 1 and alive
				outer.append('<div class="alive"></div>');
			}// end else
			outer.children().last().on('click',function(){
				index = $(this).index();
				that.clickHandler(index); 
			});
		}); //end of board.forEach (this repopulates board)	
	}//end of updateBoard

	
	//expose functions
	return {"setPresetChange":setPresetChange,"setPresetNames":setPresetNames,"updateBoard": updateBoard, 
			"setClickHandler":setClickHandler, "setPlayButton":setPlayButton, "setPauseButton":setPauseButton};
}//end of View