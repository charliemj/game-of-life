// Rules:
// 1. Any live cell with fewer than two live neighbours dies, as if caused by under-population.
// 2. Any live cell with two or three live neighbours lives on to the next generation.
// 3. Any live cell with more than three live neighbours dies, as if by over-population.
// 4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

// Every cell interacts with its eight neighbours, which are the cells that are horizontally, vertically, or diagonally adjacent


//@param: takes in a board (array of 1's and 0's of len 1024)  
//@return: outputs a new board based on the rules stated above (Conway's Game of Life rules)
var applyRules = function(board){
	var newBoard = board.slice();
	var width = 32; //board is 32x32
	var height = 32; //board is 32x32
	var XYtoIndex = function(x,y){
		index = width*((y+height)%height) + ((x+width)%width);
		return index;
	};//convert an x and y pair into an index into the board array

	_.range(width).forEach(function(x){
		_.range(height).forEach(function(y){//+y goes down
				var neiList = [];
				neiList.push(XYtoIndex(x+1,y)); // right
				neiList.push(XYtoIndex(x-1,y)); // left
				neiList.push(XYtoIndex(x,y-1)); // up
				neiList.push(XYtoIndex(x,y+1)); // down
				neiList.push(XYtoIndex(x+1,y-1)); // diag upright
				neiList.push(XYtoIndex(x-1,y-1)); // diag upleft
				neiList.push(XYtoIndex(x+1,y+1)); // diag downright
				neiList.push(XYtoIndex(x-1,y+1)); // diag downleft

				liveNeiCount = 0;
				//console.log(neiList);
				neiList.forEach(function(nei){
					if (board[nei] === 1){
						liveNeiCount ++;
					}//end if
				});//end of neiList forEach
	
				// 1. Any live cell with fewer than two live neighbours dies, as if caused by under-population.
				// 2. Any live cell with two or three live neighbours lives on to the next generation.
				// 3. Any live cell with more than three live neighbours dies, as if by over-population.
				// 4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

				if (board[XYtoIndex(x,y)]===1){
					if(liveNeiCount < 2){newBoard[XYtoIndex(x,y)]=0;}
					else if (liveNeiCount ===2 || liveNeiCount === 3){newBoard[XYtoIndex(x,y)]=1;}
					else if (liveNeiCount > 3){newBoard[XYtoIndex(x,y)]=0;}
				}//end if
				else {//the cell is dead	
					if (liveNeiCount === 3){newBoard[XYtoIndex(x,y)]=1;}
				}//end else		
		});//end height range forEach

	}); //end width range forEach
	
	
	return newBoard;
};//end appliesRules
