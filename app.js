var express = require("express");

var app = express();

app.set("view engine","jade");

app.use(express.static("static"));

app.get("/", (req,res) => {
	res.render("./layouts/layout");
});

app.listen(8080, () => { console.log ("Server running on http://localhost:8080")});