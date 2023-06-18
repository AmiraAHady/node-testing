const express = require("express");
var todosRoutes = require('./routes/todos')
var usersRoutes = require('./routes/users')
const cors = require('cors');
var mongoose = require('mongoose')
mongoose.connect("mongodb://localhost:27017/MEARNITI")

var app = express();

app.use(cors(
  //   {
  //   origin:"*",
  //   methods:"GET POST PUT PATCH DELETE",
  //   allowedHeaders:""
  // }
))

app.use(express.json())//js  //middleware 
app.set("views","./views")
app.set("view engine","ejs")

app.get("/", function (req, res, next) {

  res.render("user",{userName:"amira",arr:[1,2,3,4]})
})
//users
app.use(express.static("./static"))
app.use("/todos", todosRoutes);
app.use("/users", usersRoutes)
app.listen(3000, () => {
  console.log("server listening on port 3000");
});

module.exports=app