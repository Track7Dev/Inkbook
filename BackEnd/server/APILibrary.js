const { Artist, Client, Shop, Admin } = require('./models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secret = process.env.KEY_ACCESS;

// VAIABLES
//#############################
// Minutes until the JWT Expires
const eTime = 6000000;
const Models = [Shop, Artist, Client, Admin];
const statusName = ['_AUTH', '_USER','_SERVER']
const statusCode = [401, 422, 500];

// FUNCTIONS
//#############################

// Error Handling 
const error = (res, status, err) =>  res.status(statusCode[statusName.indexOf(status)]).json(err);

// Returns the JWT expiration time in miliseconds 
const setExp = time => Date.now() + time;

// Assigns the Model of the status input
const assignModel = (status) => {
  const accpetedStatus = ['artist', 'client', 'shop', 'admin'];
  const statusModels = [Artist, Client, Shop, Admin];
  if(!accpetedStatus.includes(status)) return;
  const Model = statusModels[accpetedStatus.indexOf(status)];
  return Model;
}

// Encode JWT
const createToken = (payload) => 
{
  payload.ex = setExp(eTime);
  return jwt.sign(payload, secret);
}

// Decode JWT
const decodeToken =  token => jwt.decode(token, secret);

// Hash Password
const hash = (req, res, next) => {
  bcrypt.hash(req.body.password, 11).then(
    (hash) => { 
       req.hash = hash; 
       next();
    })
    .catch((err) => {
      req.error = err;
      next();
    });
};

// Verify Admin user by JWT and issue a new Token
const verifyAdmin = (req, res, next) => {
  req.verified = false;
  if(!req.headers.token || req.headers.token === 'null' ) return next();
  const user = decodeToken(req.headers.token);
  if(!user.ex || user.ex < Date.now()) return next();
  Admin.findOne({ username: user.username, password: user.password }, {password: 0, createdAt:0, __v: 0,})
  .exec((err, found) => {
    if (err || !found) return next();
    req.token = createToken({_id: found._id, username: user.username, password: user.password, name: found.name, status: user.status});
    req.status = user.status;
    req.verified = true;
    next();
  });
}

// Verify the  user by JWT and issue a new token
const verifyUser = (req, res, next) => {
  req.verified = false;
  if(!req.headers.token || req.headers.token === 'null' ) return next();
  const user = decodeToken(req.headers.token);
  const Model = assignModel(user.status);
  if(!Model || !user.ex || user.ex < Date.now()) return next();
  Model.findOne({ username: user.username, password: user.password }, {password: 0, createdAt:0, __v: 0,})
  .exec((err, found) => {
    if (err || !found) return next();
    req.token = createToken({_id: found._id, username: user.username, password: user.password, name: found.name, status: user.status});
    req.status = user.status;
    req.verified = true;
    next();
  });
};

// Authorize SignIn
const authorizeUser = (req, res, next) => {
  const info = jwt.decode(req.body.token, process.env.KEY_ACCESS);
  const Model = assignModel(info.status);
  if(!Model) return next();
  Model.findOne({ username: info.username })
  .exec((err, user) => {
    if (err || !user) return res.json("Credentials Dont Match");
    bcrypt.compare(info.password, user.password, (err, matched) => {
      err || !matched ? null : req.token = createToken({username: user.username, password: user.password, status: info.status});
      next();
    });
  });
};



module.exports = {
  assignModel,
  verifyUser,
  verifyAdmin, 
  setExp,
  createToken,
  decodeToken,
  hash, 
  authorizeUser,
  Models,
  error
}