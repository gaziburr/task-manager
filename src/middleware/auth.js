const User = require('../models/user.js');
const jwt = require('jsonwebtoken');
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = await jwt.verify(token, 'Waalaikumas');
    const user = await User.findOne({_id: decoded._id, 'tokens.token': token});
    if (!user) {
      throw new Error();
    }
   // setting user,token to req so that necessary user routes can usee 
    req.user = user;
    req.token = token;

    next();
  } catch (e) {
    res.status(400).send('Please authenticate');
  }
};
module.exports = auth;
