const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid');
      }
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes('password')) {
        throw new Error('Password cannot contain "password"');
      }
    },
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error('Age must be a postive number');
      }
    },
  },
});
// creating custom function
// userSchema.methods are accessible to specific and individual instance of User, sometimes called instance methods
userSchema.methods.GeneratejwtByGazibur = async function (){
const userToken=await jwt.sign({_id:this._id.toString()},"thisisme")
 return userToken
};
// creating custom function
// userSchema.statics are accessible to model, sometimes called model methods
userSchema.statics.findByEmailPasswordByGazi = async (email, password) => {
  const user = await User.findOne({email});
  if (!user) {
    throw new Error('Unable t8 find user');
  }
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error('Unable to login');
  }
  return user;
};
userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});
const User = mongoose.model('User', userSchema);
module.exports = User;
