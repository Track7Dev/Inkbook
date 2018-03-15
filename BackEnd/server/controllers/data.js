const jwt = require('jwt-simple');
const secret = require('../config').secret;
const { Artist, Client, Shop } = require('../models');
const api_lib = require('../APILibrary');


const membersList = (req, res) => {
  if(!req.verified || !req.token) return api_lib.error(res, '_AUTH', 'UNAUTHORIZED ACCESS');
  let members = [];


  Artist.find({}, {password: 0, createdAt:0, __v: 0, _id:0, email:0})
  .then((artists) => {
    Client.find({}, {password: 0, createdAt:0, __v: 0, _id:0, email:0})
    .then((clients) => {
      Shop.find({}, {password: 0, createdAt:0, __v: 0, _id:0, email:0})
      .exec((err, shops) => {
        members = members.concat(shops, artists, clients);
        res.json({
          token: req.token,
          members
        });
      })
    })
  })
}

const deleteUser = (req, res) => {
  if(!req.verified || !req.token) return api_lib.error(res, '_AUTH', 'UNAUTHORIZED ACCESS');
  const delUser = req.query.u;
  const delStatus = req.query.s;
  const user = api_lib.decodeToken(req.token);
  if((user.status !== delStatus || user.username !== delUser) && user.status !== 'admin' ) return api_lib.error(res, '_AUTH', 'UNAUTHORIZED ACCESS');
  const Model = api_lib.assignModel(delStatus);
  Model.findOneAndRemove({username: delUser})
.exec((err, model) => {
  if(err || !model) return api_lib.error(res, '_USER', 'USER NOT FOUND'); 
  res.json({token: req.token, message:`DELETED ${delUser}`})
});

}

const groupList = (req, res) => {
  if(!req.token || !req.verified) return api_lib.error(res, '_AUTH','UNAUTHORIZED ACCESS');
  const Model = api_lib.assignModel(req.params.status);
  if(!Model) return api_lib.error(res,'_USER', 'INVALID STATUS');
  Model.find({}, {password: 0, createdAt:0, __V: 0, _id:0})
  .exec((err, users) => {
    if(err) return api_lib.error(res, '_SERVER', err);
    res.json({token: req.token ,users});
  });
};

module.exports = (route) => {
  route.get('/members/all', api_lib.verifyUser, membersList);
  route.get('/members/:status', api_lib.verifyUser, groupList);
  route.delete('/delete-user', api_lib.verifyAdmin, deleteUser);
};