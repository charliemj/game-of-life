//links together the view and controller

var view = View($("#buttonLayer")); //jQuery will return an HTML element with #buttonLayer id 
//the buttons and the game board divs will be added under this id

//creates an instance of Controller which is connected to the view, which listens for user input
var controller = Controller(view); 
