const express = require('express');
//creates an express application
require('./db/mongoose.js'); //To load the this index.js file after running mongoose.js(connecting to mongodb)

const TaskRouter = require('./router/task');
const UserRouter = require('./router/user'); //requiring mongoose User routes
const app = express()
// confiuring port for heroku or local development
const port = process.env.PORT || 3000;

// parse all json to an object comming to express server
app.use(express.json());
app.use(TaskRouter);
app.use(UserRouter);
// Routes for app to run and listen on specific port
app.listen(port, () => {
  console.log('Server is up on port ' + port);
});
