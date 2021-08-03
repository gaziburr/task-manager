require('./db/mongoose.js');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const Task = require('./models/task');
const User = require('./models/user');

app.use(express.json());
app.post('/tasks', (req, res) => {
  const task = new Task(req.body);
  task
    .save()
    .then(() => {
      res.send(task);
      console.log(task);
    })
    .catch(e => {
      res.send(e);
      console.log(e);
    });
});

app.post('/users', (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then(() => {
      res.send(user);
      console.log(user);
    })
    .catch(e => {
      res.send(e);
      console.log(e);
    });
});

app.listen(port, () => {
  console.log('server is starting on port ' + port);
});
