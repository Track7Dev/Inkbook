const jwt = require('jwt-simple');
const secret = process.env.KEY_ACCESS;
const api_library = require('../APILibrary');
const multer = require('multer');

const storage = multer.diskStorage({destination:(req, file, cb) => {
  if(!req.verified || !req.token) return cb('UNATHORIZED ACCESS', null);
  const user = jwt.decode(req.token, secret);
  multer({dest: `uploads/${user.status}/${user.username}`});
  cb(null, `./uploads/${user.status}/${user.username}`);
},
  filename: (req, file, cb) => {
    if(!req.verified || !req.token) return cb('UNATHORIZED ACCESS', null);
    const user = jwt.decode(req.token, secret);
    cb(null, `profile.jpg`);
  }
});
const upload = multer({storage:storage});

const fs = require('fs');

const imageUpload = (req, res) => !req.token ? res.json('EROORRRRRR') : res.json({token: req.token});


const getImage = (req, res) => res.sendFile(require('../uploads/shop/Track7Dev'));


const deleteImg =  (req, res) => fs.unlink('./uploads/'+ req.params.name, (err) => err ? res.json('failed') : res.json('success'));

module.exports = (route) => {
  route.delete('/delete/:name', deleteImg);
  route.post('/profile', api_library.verifyUser, upload.single('image'), imageUpload);
  route.get('/images/get', getImage);
}