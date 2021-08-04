// requiring mongoose npm module
const mongoose = require('mongoose')
//connecting to mongodb database 
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
