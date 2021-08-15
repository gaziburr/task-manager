const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user'); //requiring mongoose User model
const router = new express.Router();
// creating routes for storing new user to database
router.post('/users', async (req, res) => {
  //creating new instance of User model
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});
router.post('/users/login', async (req, res) => {
  try {
    //calling a custom function created in user model
    const user = await User.findByEmailPasswordByGazi(
      req.body.email,
      req.body.password,
    );

    const authToken =await user.GeneratejwtByGazibur()
console.log(authToken)
    res.send({user,authToken});
  } catch (e) {
    console.log(e);
    res.status(404).send('Unable to login');
    }
});
router.get('/users',async (req,res)=>{
 try{
    //getting all user from database
    const users = await User.find({});
    //sending to the client
    res.send(users);
  } catch (e) {
    //in case of Server specific error
    res.status(500).send();
  }
});
//getting all user from database by id
router.get('/users/:id', async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).send();
    }
   const userToken =GeneratejwtByGazibur()
    res.send(userToken);
  } catch (e) {
    res.status(500).send();
  }
});
// routes for updating user by id
router.patch('/users/:id', async (req, res) => {
  const updates = Object.keys(req.body); //creates array bringing all  priperties of Object
  const allowedUpdates = ['name', 'email', 'password', 'age'];
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update),
  );
  //allowing users to update specific fields
  if (!isValidOperation) {
    return res.status(400).send({error: 'Invalid updates!'});
  }
  try {
    const user = await User.findById(req.params.id);
    updates.forEach(update => {
      user[update] = req.body[update];
    });
    await user.save();
    if (!user) {
      return res.status(404).send();
    }
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});
// routes for delete from database
router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (e) {
    res.status(500).send();
  }
});
module.exports = router;
