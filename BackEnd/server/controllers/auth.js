const api_lib = require('../APILibrary');

// Signup User
const signup = (req, res) => {
  let yearOpened, age;
  !req.body.age ? age = null : age = req.body.age;
  !req.body.yearOpened ? yearOpened = null : yearOpened = req.body.yearOpened;
  const { name, username, email, status } = req.body;
  const Model = api_lib.assignModel(status);
  if (req.error || !Model) return res.status(422).json({ERROR: 'MISSING CREDENTIALS'});
  const password = req.hash;
  const user = new Model({name, username, password, age, yearOpened, email, status});
  user.save((err) => {
    const token = api_lib.createToken({username: user.username, password: user.password, status: status});
    err ? res.json(`Error creating ${status}`) : res.json({token, message: 'User Created'});
  });
};

//Signin User
const signin = (req, res) => req.error || !req.token ? api_lib.error(res,'_USER', 'Credentials Did Not Match') : res.json({token:req.token, message:`${req.body.username} Signed In`});

//Signout user
const logout = (req, res) => req.headers.token ? res.send(`Logged Out User ${api_lib.decodeToken(req.headers.token).username}`) : res.send('Currently Not Logged In');

//Verify User
const verify = (req, res) => !req.verified || !req.headers.token ? res.json({message: false}) : res.json({token: req.token,status: req.status,message:req.verified});

//User Credentials
const current = (req, res) =>{ if(!req.verified || !req.headers.token) return api_lib.error(res,'_AUTH', 'UNAUTHORIZED ACCESS');
const user = api_lib.decodeToken(req.token);
user.password = undefined;
res.json({token: req.token, user});
};


module.exports = (route) => {
  route.post('/signup', api_lib.hash, signup);
  route.post('/signin', api_lib.authorizeUser, signin);
  route.get('/logout', logout);
  route.get('/verify', api_lib.verifyUser, verify);
  route.get('/user', api_lib.verifyUser, current);
}