const Express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

const server = Express();
server.use(bodyParser.json());
server.use(cookieParser());
server.use(cors());
server.use('/static',Express.static(__dirname + '/uploads'), (req, res) => {
 
});
server.get('/image/:status/:user/:img', (req, res) => res.sendFile(__dirname + `/uploads/${req.params.status}/${req.params.user}/${req.params.img}`));
require('./controllers')(server);

module.exports = server;