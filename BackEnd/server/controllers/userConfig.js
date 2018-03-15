const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');
const secret = require('../config').secret;
const { Artist, Client, Shop } = require('../models');

const addRank = (req, res) => {
  const decode = jwt.decode(req.params.token, secret);
  let Model;

  if(decode.status === 'artist') {
    Model = Artist;
  }else if(decode.status === 'client') {
    Model = Client;
  } else if (decode.status === 'shop') {
    Model = Shop;
  }
  Model.findOne({username: decode.username})
  .exec((err, user) => {
    if (err || !user) return res.json(`${decode.status} Not Found`);
    decode.operation === 'add' ? user.rank += decode.points : user.rank -= decode.points;
    user.save((err) => {
      return err 
      ? 
      res.json({success: false, message: `Could not ${decode.operation} points to ${decode.username}`})
      :
      res.json({success: true, message: `succefully ${decode.operation}ed ${decode.points} to ${decode.username}`});
    });
  });
};

module.exports = (route) => {
  route.get('/rank/:token', addRank);
}