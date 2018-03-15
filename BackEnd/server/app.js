const mongoose = require('mongoose');
const server = require('./server');
const port = 7777;
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/InkedIn', { useMongoClient: true })
.then((res) => {
  server.listen(port,(req, res) =>{
    console.log(`Server is listening to port:${port}`);
  });
})
.catch((err) => {
  console.error('ERROR: Cannot Connect To Mongo DB');
});



