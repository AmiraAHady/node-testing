var mongoose = require('mongoose')
var bcrypt = require('bcrypt')
var userSchema = mongoose.Schema({
   userName: {
      type: String,
      unique: true,
      minLength: 4,
      maxLength: 15,
      trim: true,
      required: true
   },
   password: {
      type: String,
      required: true,
      trim: true,
   },
   dob: Date,
   favoriteTodos: Array

})

userSchema.pre("save", function (next) {

   const y = bcrypt.genSaltSync(10);
   const x= bcrypt.hashSync(this.password, y);
   this.password = x

   next()
})
var userModel = mongoose.model("User", userSchema)

module.exports = userModel