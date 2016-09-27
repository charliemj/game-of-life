// Controller: takes in a view and listens to inputs (clicks) and drives the loop to make the game board evolve

var Controller = function(view){
	var startingBoard = _.range(1024).map(function(el_in_range){return 0;}); //32x32 board (original board)

	var that = Object.create(Controller.prototype); //creates Controller object
	that.board = startingBoard.slice(); //make a copy of the board
	that.intervalID = 0; //starts in a "paused" state

	//hook up UI from the view.js
	view.setPresetNames(presetNames);

	view.setClickHandler(function(index){
		onInitialBoardClick(index); 
	});

	view.setPlayButton(function(){
		startGame();
	});

	view.setPauseButton(function(){
		pauseGame();
	});

	view.setPresetChange(function(boardName){
		pauseGame(); //starts off paused so the user can look at the preset board before it starts running
		that.board = boardDict[boardName]; //gets the board from the "boardName":board dict in boards.js
		view.updateBoard(that.board); //updates the view to the preset board
	});

	view.updateBoard(that.board);
	//end hook up UI

	var onInitialBoardClick = function(index){
		//if a user clicks on a dead cell, make it alive
		if (that.board[index] === 0){
			that.board[index] = 1;	
		}//end if
		//if a user clicks on an alive cell, make it dead
		else{
			that.board[index] = 0;	
		}//end else

		//now update the board
		view.updateBoard(that.board);
	};//end onInitialBoardClick

	//if the game is not going (i.e. paused or the page was just refreshed), it will start the game by updating
	//the current board by the rules (applyRules) and returning a new board (updateBoard)
	var startGame = function(){
		if(that.intervalID ===0){
			that.intervalID = window.setInterval(function(){
				that.board = applyRules(that.board);//gets new board from the model 
				view.updateBoard(that.board); //makes the view update the board that the user sees
			},500);//500 miliseconds between updates
		}
	};//end startGame

	//pause button functionality
	var pauseGame = function(){
		window.clearInterval(that.intervalID);
		that.intervalID = 0;
	};//end pauseGame

	//expose functions
	return {"onInitialBoardClick": onInitialBoardClick, "startGame":startGame, "pauseGame":pauseGame};
};//end Controller

// var controller = Controller(initialBoard)
// controller.onInitialBoardClick(4)
// console.log(controller.onInitialBoardClick(0))



