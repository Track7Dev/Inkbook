const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jwt-simple');
const { Artist, Client, Shop } = require('../models');
const server = require('../server');
const expect = chai.expect;
const mongoose = require('mongoose');
const secret = require('../config').secret;
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/test', { useMongoClient: true })
.catch((err) => {
  if (err) console.log('TEST - USERCONFIG: Mongo DB Server is not connected');
});

chai.use(chaiHttp);

// Test Routes
describe('{POST} /rank/:token', () => {
  describe('{ARTIST}', () => {
    const testArtist = {
      name: 'Brandon',
      age: 27,
      username: 'testArtist',
      password: 'password',
      email: 'example@gmail.com',
      status: 'artist'
    }
    const testObj = {
      username: testArtist.username,
      status: testArtist.status,
      operation: 'add',
      points: 20
    };
    const token = jwt.encode(testObj, secret);
    it('should add point the the artist rank', (done) => {
      //Add Artist
      chai.request(server)
      .post('/signup')
      .send(testArtist)
      .end((err, res) => {
        chai.request(server)
        .get(`/rank/${token}`)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res.body.success).to.equal(true);
          expect(res.body.message).to.equal(`succefully added ${testObj.points} to ${testObj.username}`);
          Artist.findOne({username: testArtist.username})
          .exec((err, artist) => {
            expect(artist.rank).to.equal(testObj.points);
            done();
          }); 
        });
      });
    });
  });
  describe('{CLIENT}', () => {
    const testClient = {
      name: 'Brandon',
      age: 27,
      username: 'testClient',
      password: 'password',
      email: 'example@gmail.com',
      status: 'client'
    }
    const testObj = {
      username: testClient.username,
      status: testClient.status,
      operation: 'add',
      points: 20
    };
    const token = jwt.encode(testObj, secret);
    it('should add point the the client rank', (done) => {
      //Add Artist
      chai.request(server)
      .post('/signup')
      .send(testClient)
      .end((err, res) => {
        chai.request(server)
        .get(`/rank/${token}`)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res.body.success).to.equal(true);
          expect(res.body.message).to.equal(`succefully added ${testObj.points} to ${testObj.username}`);
          Client.findOne({username: testClient.username})
          .exec((err, client) => {
            expect(client.rank).to.equal(testObj.points);
            done();
          }); 
        });
      });
    });
  });
  describe('{SHOP}', () => {
    const testShop = {
      name: 'Brandon',
      age: 27,
      username: 'testShop',
      password: 'password',
      yearOpened: 2017,
      email: 'example@gmail.com',
      status: 'shop'
    }
    const testObj = {
      username: testShop.username,
      status: testShop.status,
      operation: 'add',
      points: 20
    };
    const token = jwt.encode(testObj, secret);
    it('should add point the the shop rank', (done) => {
      //Add Shop
      chai.request(server)
      .post('/signup')
      .send(testShop)
      .end((err, res) => {
        chai.request(server)
        .get(`/rank/${token}`)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res.body.success).to.equal(true);
          expect(res.body.message).to.equal(`succefully added ${testObj.points} to ${testObj.username}`);
          Shop.findOne({username: testShop.username})
          .exec((err, shop) => {
            expect(shop.rank).to.equal(testObj.points);
            done();
          }); 
        });
      });
    });
  });
  afterEach((done) => {
    Artist.remove({}, () => {
      Client.remove({}, () => {
        Shop.remove({}, () => {
          done();
        });
      });
    });
  });
});
