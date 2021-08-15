const express = require('express');
const jwt = require('jsonwebtoken');
require('./db/mongoose.js'); //To load the this index.js file after running mongoose.js(connecting to mongodb)

const TaskRouter = require('./router/task');
const UserRouter = require('./router/user'); //requiring mongoose User routes
//creates an express application
const app = express();
// confiuring port for heroku or local development
const port = process.env.PORT || 3000;

// our custom express middleware function
// app.use((req,res,next)=>{
// res.status(503).send("server is temporarily under maintenance")
 // next()
// })

// parse all son to an object comming to express server
app.use(express.json());
app.use(TaskRouter);
app.use(UserRouter);
app.listen(port, () => {
  console.log('Server is up on port ' + port);
});

