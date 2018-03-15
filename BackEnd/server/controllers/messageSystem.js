const { Convo, Message, Artist, Client, Shop } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');
const secret = require('../config').secret;
const api_lib = require('../APILibrary');

// const createMessage = (req, res) => {
//   if(!req.verified || !req.token) return res.status(401).json({message: 'UNAUTHORIZED ACCESS'});
//   const user = jwt.decode(req.token, secret);
//   const { to, message, toStatus } = req.body;
//   if(!to || !message || !toStatus) return res.status(422).json({ERROR:'Fill In All Message Details'}); 
//   const Model = api_lib.assignModel(toStatus);
//   if(!Model) return res.status(422).json('INVALID STATUS');
//   Model.findOne({username: to})
//   .exec((err, found) => {
//     if(err || !found) return res.status(401).json(`${to} Not Found`);
//     const newMessage = new Message({message, sender: [user.username, user.status]});
//     newMessage.save((err) => {
//       Convo.findOne({$or:[{to, toStatus, fromStatus: user.status,  from: user.username }, {to: user.username, toStatus: user.status, fromStatus: toStatus,  from: to }]})
//       .exec((err, convo) => {
//         if (err || !convo) convo = new Convo({to, toStatus, from: user.username, fromStatus: user.status});
//         convo.save((err) => {
//           Convo.findOne({$or:[{to, toStatus, fromStatus: user.status,  from: user.username }, {to: user.username, toStatus: user.status, fromStatus: toStatus,  from: to }]})
//           .exec((err, convo) => {
//             convo.messages.push(newMessage);
//             convo.save((err) => {
//               res.json({
//                 token: req.token,
//                 data:'MESSAGE ADDED'
//               });
//             })
//           });
//         })
//       });, 
//     });
//   })
// };

const createMessage = (req, res) => {
  if(!req.verified || !req.token) return res.status(401).json({ Message: 'UNAUTHORIZED ACCESS'});
  const user = jwt.decode(req.token, secret);
  const { to, message, toStatus } = req.body;
  if(!to || !message || !toStatus) return res.status(422).json({ERROR:'Fill In All Message Details'}); 
  const Model = api_lib.assignModel(toStatus);
  if(!Model) return res.status(422).json('INVALID STATUS');
  Model.findOne({username: to})
  .exec((err, found) => {
    if(err || !found) return res.status(401).json(`${to} Not Found`);
    const newMessage = new Message({message, sender: [user.username, user.status]});
    newMessage.save((err) => {
      Convo.findOne({$or:{users:[[user.username, user.status], [to, toStatus]],users:[[to, toStatus]]}})
      .exec((err, convo) => {
        if (err || !convo) convo = new Convo({to, toStatus, from: user.username, fromStatus: user.status});
        convo.save((err) => {
          Convo.findOne({$or:[{to, toStatus, fromStatus: user.status,  from: user.username }, {to: user.username, toStatus: user.status, fromStatus: toStatus,  from: to }]})
          .exec((err, convo) => {
            convo.messages.push(newMessage);
            convo.save((err) => {
              res.json({
                token: req.token,
                data:'MESSAGE ADDED'
              });
            })
          });
        })
      });
    });
  })
}

const clearConvo = (convo) => {
  // romove empty collections in the db
  if(convo.messages.length < 1) {
   return Convo.findByIdAndRemove(convo._id)
   .exec((err, c) => {
    c.save();
   });
  }
  return convo;
};


const sentMessages = (req, res) => {
  if(!req.verified || !req.token) return res.status(401).json('UNAUTHORIZED ACCESS');
  const {username, passward, status} = jwt.decode(req.token, secret);
  Convo.find({$or:[{to: username, toStatus: status}, {from: username, fromStatus: status}]})
  .populate('messages', {}, Message)
  .exec((err, convos) => {
    if(convos.length === 0) return res.json('No Messages');
    res.json({
      token: req.token,
      data:convos.map((convo) => clearConvo(convo))
    });
  })
};

const findMessage = (req, res) => {
  if(!req.verified || !req.token) return res.status(401).json('UNAUTHORIZED ACCESS');
  const {username, status} = req.params;
  const user = api_lib.decodeToken(req.token);
  Convo.findOne({$or:[{to: user.username, toStatus: user.status, from: username, fromStatus: status}, {to: username, toStatus: status, from: user.username, fromStatus: user.status}]})
  .populate('messages', {}, Message)
  .exec((err, convo) => {
    if(err || !convo) return res.status(422).json('Not Found');
    res.json(convo.messages);
  });
}

const recievedMessages = (req, res) => {
  if(!req.verified || !req.token) return res.status(401).json('UNAUTHORIZED ACCESS');
  const {username, passward, status} = jwt.decode(req.token, secret);
  Convo.find({to: username, toStatus: status})
  .populate('messages', {}, Message)
  .exec((err, convos) => {
    if(convos.length === 0) return res.json('No Messages');
    res.json({
      token: req.token,
      data:convos.map((convo) => clearConvo(convo))
    });
  })
};

const deleteMessage = (req, res) => {
  if(!req.token || !req.verified || req.query.id) return res.status(401).json('UNAUTHORIZED ACCESS');
  const id = req.query.id;
  Message.findByIdAndRemove()
};

module.exports = (route) => {
  route.post('/create-message', api_lib.verifyUser, createMessage);
  route.get('/messages/sent', api_lib.verifyUser, sentMessages);
  route.get('/messages/recieved', api_lib.verifyUser, recievedMessages);
  route.get('/message/:username/:status', api_lib.verifyUser, findMessage);
}