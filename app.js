const express = require("express");
const bodyParser = require("body-parser");
// Refactoring the code, requesting date.js (get Date or get Day function)
const date = require(__dirname + "/date.js");


const app = express();

// List of items to see if res.render inside the get request is working properly.
const items = ["Buy Food", "Cook Food", "Eat Food"];

// For the work list page
const workItems = [];

// EJS procedure
app.set('view engine', 'ejs');

// Body parser procedure
app.use(bodyParser.urlencoded({extended: true}));

// To access/apply the static CSS styles sheet in "list.ejs" to the server side.
app.use(express.static("public"));


// Homepage set up with extracting the right informtion using EJS
app.get("/", function(req,res) {

	// requesting the getDate fuynction from date.js
	const day = date.getDate();
	
	res.render("list", {listTitle: day, newListItems: items});

});

// post request after the user clicks the add button  
app.post("/", function(req,res) {

console.log(req.body);
// placing the user input of new item into the array to display in the To-do list.
	const item = (req.body.newItem);

	if (req.body.list === "Work") {
		workItems.push(item);
		res.redirect("/work");
	} else {
		items.push(item);
		res.redirect("/");
	}

});


// For the work list page 
app.get("/work", function(req,res) {
	res.render("list", {listTitle: "Work List", newListItems: workItems});
})
// Describes the project
app.get("/about", function(req,res) {
	res.render("about");
})
// Home page for Fun
app.get("/home", function(req,res) {
	res.render("home");
})

// local server 
app.listen(3000, function(){
	console.log("Server is on port 3000");
});