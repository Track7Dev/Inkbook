const { Convo, Message, Artist, Client } = require('../models');
const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiJWT = require('chai-jwt');
const jwt = require('jwt-simple');
const server = require('../server');
const expect = chai.expect;
const mongoose = require('mongoose');
const secret = require('../config').secret;
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/test', { useMongoClient: true })
.catch((err) => {
  if (err) console.log('TEST - AUTH: Mongo DB Server is not connected');
});

describe('MESSAGE SYSTEM', () => {
  describe('{POST} /create-message/', () => {
    
    beforeEach((done) => {
      Artist.remove({}, () => {
        Client.remove({}, () => {
          Convo.remove({}, () => {
            Message.remove({}, () => {
              done();
            });
          });
        });
      });
    });


    const testMessage = {
      to: null,
      toStatus: null,
      message: null
    }
    const testObj = {
      name: 'Brandon',
      age: 27,
      username: 'testArtist',
      password: 'password',
      email: 'example@gmail.com',
      status: 'artist'
    }
    
    const token = jwt.encode(testObj, secret);

    it('should create a new conversation if one doesnt exist', (done) => {
      chai.request(server)
      .post('/create-message/')
      .send({token})
      .end((err, res) => {
        Convo.find({})
        .exec((err, convos) => {
          expect(err).to.be.null;
          expect(convos).to.have.a.lengthOf(1);
          done();
        });        
      });
    });
    it('should add a new message to the database', (done) => {
      chai.request(server)
      .post('/create-message/')
      .send({token})
      .end((err, res) => {
        Message.find({})
        .exec((err, messages) => {
          expect(err).to.be.null;
          expect(messages).to.have.a.lengthOf(1);
          done();
        });
      });
    });
    it('should reference the message into convo', (done) => {
      chai.request(server)
      .post('/create-message/')
      .send({token})
      .end((err, res) => {
        Convo.findOne({ to: testObj.to, from: testObj.from})
        .populate('messages')
        .exec((err, convo) => {
          expect(err).to.be.null;
          expect(convo.messages).to.have.a.lengthOf(1);
          expect(convo.messages[0].message).to.equal(testUser.message);
          done();
        });
      });
    });
  });
});