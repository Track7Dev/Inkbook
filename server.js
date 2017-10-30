const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const User = require('./app/src/models/userModel');
const bcrypt = require('bcrypt');
const STATUS_USER_ERROR = 422;
const STATUS_SERVER_ERROR = 500;
const server = express();
server.use(bodyParser.json());
server.use(cors());
server.use(session({
    secret: 'hjasdfkjhasdjhasdkjhasdfjkhasdf',
    saveUninitialized: true
}))


const checkPass = (req, res, next) => {
    User.findOne({ username: req.body.username }, (err, found) => {
        if (err || found === null) return res.json({ success: 'false', username: req.body.username });
        bcrypt.compare(req.body.password, found.password)
        .then((isSame) => {
            if (isSame === false) return res.json('WRONG PASSWORD');
            req.isSame = isSame;
            req.password = found.password;
            req.admin = found.admin;
            next();
        });
    });
    
};
server.get('/redirect', (req, res) => {
    res.redirect('http://redirectedServer/endpoint');
});


server.post('/login', checkPass, (req, res) => {
    const isSame = req.isSame;
    if(isSame === true){
        session.username = req.body.username;
        session.admin = req.admin;
        console.log('SESSION:' + session.admin);
        
        res.json({success: 'true', username: req.body.username, password: req.password, admin: req.admin});
    } else {
        res.json({ success: 'false', username: req.body.username });
    }
});

server.get('/users', (req, res) => {
    User.find({}, (err, users) => {
        if (err) return res.status(STATUS_SERVER_ERROR).json({ERROR: "Cannot Connect To The Server"});
        users.map(user => {user.password = undefined});
        res.json(users);
    }).sort({fname: 1});
});




server.get('/logout', (req, res) => {
    session.username = undefined;
    session.admin = undefined;
    res.json({success: 'true'});
});

const hashPass = (req, res, next) => {
    bcrypt.hash(req.body.password, 11, (err, hPass) =>{ 
            req.hPass = hPass;
            console.log(req.hPass);
            next();
    });
};

server.post('/user', hashPass, (req, res) => {
    const { username, fname, lname, age, gender, email, userClass } = req.body;
    const password = req.hPass;
    console.log('password:' + password);
    const user = new User({ username, password, fname, lname, age, gender, email, userClass });
    user.save((err) => {
        if (err) return res.status(STATUS_USER_ERROR).json(err);
        user.password = undefined;
        user._id = undefined;
        console.log(user);
        return res.json(user);
    });
    
});

server.get('/remove-user/:username', (req, res) => {
    const { username } = req.params;
    User.findOneAndRemove({ username: { $eq: username } }, (err) => {
        if (err) return res.status(STATUS_USER_ERROR).json(err);
        res.json({success: true});
    });
//     .then(
//     User.find({}, (err, users) => {
//         if (err) return res.status(STATUS_SERVER_ERROR).json({ERROR: "Cannot Connect To The Server"});
//         res.json(users);
//     }).sort({fname: 1})
// );
});


mongoose.Promise = global.Promise;
const connect = mongoose.connect(
  'mongodb://localhost/app-db',
  { useMongoClient: true }, (error) => {
      if (error) return console.log('MONGO SERVER NOT RUNNING');
  }
);

/* eslint no-console: 0 */
connect.then(() => {
  const port = 5000;
  server.listen(port);
  console.log(`Server Listening on ${port}`);
}, (err) => {
  console.log('\n************************');
  console.log("ERROR: Couldn't connect to MongoDB. Do you have it running?");
  console.log('************************\n');
});