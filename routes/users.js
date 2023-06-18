var express = require("express");
var userModel = require("../models/users")
var bcrypt = require("bcrypt")
var jwt = require("jsonwebtoken")
var router = express.Router();




router.get("/", async function (req, res, next) {
  var users = await userModel.find()
  res.json(users)
});

router.get("/:id", function (req, res, next) {
  res.json({ userName: "amira" });
});


router.post("/", async function (req, res, next) {
  console.log("hello");
  try {
    var newUser = await userModel.create(req.body)
    console.log(newUser);
    res.json(newUser)
  } catch (err) {
    res.json(err)
  }


})


router.post("/login", async function (req, res, next) {
  const { userName, password } = req.body;

  var user = await userModel.findOne({ userName: userName }).exec()    //thenable object  not instance of promise

  if (user) {
    var valid = bcrypt.compareSync(password, user.password);
    if (valid) {
      // console.log(process.env.SECRET)
      var token = jwt.sign({
        data: { userName: user.userName, userId: user.id }
      }, process.env.SECRET, { expiresIn: '1h' });

      res.json(token)

    } else {
      res.status(401).json("please insert correct data")
    }

  } else {
    res.status(401).json("username or password is invalid try again")
  }


})

module.exports = router;



//salting


//register  amira 1234
//1234
//1234.ljlkhk54755645   >> sdhfjhsdfjdf.ljlkhk5475


//login
//4574
//4574.ljlkhk5475  >>> adsdsfsadggdg.ljlkhk5475