const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiJWT = require('chai-jwt');
const jwt = require('jwt-simple');
const { Artist, Client, Shop } = require('../models');
const server = require('../server');
const expect = chai.expect;
const mongoose = require('mongoose');
const secret = require('../config').secret;
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/test', { useMongoClient: true })
.catch((err) => {
  if (err) console.log('TEST - AUTH: Mongo DB Server is not connected');
});

chai.use(chaiHttp);
chai.use(chaiJWT);



describe('{POST} /signup', () => {
  describe('{ARTIST}', () => {
    const testObj = {
      name: 'Brandon',
      age: 27,
      username: 'testArtist',
      password: 'password',
      email: 'example@gmail.com',
      status: 'artist'
    }
    it('should add the artist to the database and return a JWT', (done) => {
      chai.request(server)
      .post('/signup')
      .send(testObj)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.body).to.be.a.jwt;
        const decode = jwt.decode(res.body, secret);
        Artist.findOne({username: decode.username, password: decode.password})
        .exec((err, artist) => {
          expect(err).to.be.null;
          expect(artist).to.be.an('object');
          expect(artist.password).to.not.equal(testObj.password);
          expect(artist.password).to.equal(decode.password);
          expect(artist.name).to.equal(testObj.name);
          expect(artist.username).to.equal(decode.username);
          expect(artist.email).to.equal(testObj.email);
          expect(artist.status).to.equal(decode.status);
          done();
        });
      });
    });
  });
  describe('{CLIENT}', () => {
    const testObj = {
      name: 'Brandon',
      age: 27,
      username: 'testClient',
      password: 'password',
      email: 'example@gmail.com',
      status: 'client'
    }
    it('should add the client to the database and return a JWT', (done) => {
      chai.request(server)
      .post('/signup')
      .send(testObj)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.body).to.be.a.jwt;
        const decode = jwt.decode(res.body, secret);
        Client.findOne({username: decode.username, password: decode.password})
        .exec((err, client) => {
          expect(err).to.be.null;
          expect(client).to.be.an('object');
          expect(client.password).to.not.equal(testObj.password);
          expect(client.password).to.equal(decode.password);
          expect(client.name).to.equal(testObj.name);
          expect(client.username).to.equal(decode.username);
          expect(client.email).to.equal(testObj.email);
          expect(client.status).to.equal(decode.status);
          done();
        });
      });
    });
  });
  describe('{SHOP}', () => {
    const testObj = {
      name: 'Brandon',
      yearOpened: 2015,
      username: 'testShop',
      password: 'password',
      email: 'example@gmail.com',
      status: 'shop'
    }
    it('should add the shop to the database and return a JWT', (done) => {
      chai.request(server)
      .post('/signup')
      .send(testObj)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.body).to.be.a.jwt;
        const decode = jwt.decode(res.body, secret);
        Shop.findOne({username: decode.username, password: decode.password})
        .exec((err, shop) => {
          expect(err).to.be.null;
          expect(shop).to.be.an('object');
          expect(shop.password).to.not.equal(testObj.password);
          expect(shop.password).to.equal(decode.password);
          expect(shop.name).to.equal(testObj.name);
          expect(shop.username).to.equal(decode.username);
          expect(shop.email).to.equal(testObj.email);
          expect(shop.status).to.equal(decode.status);
          done();
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

describe('{POST} /signin',() => {
  describe('{ARTIST}', () => {
    const testObj = {
      name: 'Brandon',
      age: 27,
      username: 'testArtist',
      password: 'password',
      email: 'example@gmail.com',
      status: 'artist'
    }
    it('should log in the artist and return JWT', (done) => {
      chai.request(server)
      .post('/signup')
      .send(testObj)
      .end((err, res) => {
        chai.request(server)
        .post('/signin')
        .send({ username: testObj.username, password: testObj.password, status: testObj.status })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res.body).to.be.a.jwt;
          const decode = jwt.decode(res.body, secret);
          expect(decode).to.be.an('object');
          expect(decode.username).to.equal(testObj.username);
          expect(decode.status).to.equal(testObj.status);
          done();
        });
      });
    });
  });
  describe('{CLIENT}', () => {
    const testObj = {
      name: 'Brandon',
      age: 27,
      username: 'testClient',
      password: 'password',
      email: 'example@gmail.com',
      status: 'client'
    }
    it('should log in the client and return JWT', (done) => {
      chai.request(server)
      .post('/signup')
      .send(testObj)
      .end((err, res) => {
        chai.request(server)
        .post('/signin')
        .send({ username: testObj.username, password: testObj.password, status: testObj.status })
        .end((err, res) => {
          const decode = jwt.decode(res.body, secret);
          expect(err).to.be.null;
          expect(res.body).to.be.a.jwt;
          expect(decode).to.be.an('object');
          expect(decode.username).to.equal(testObj.username);
          expect(decode.status).to.equal(testObj.status);
          done();
        });
      });
    });
  });
  describe('{SHOP}', () => {
    const testObj = {
      name: 'Brandon',
      yearOpened: 2015,
      username: 'testShop',
      password: 'password',
      email: 'example@gmail.com',
      status: 'shop'
    }
    it('should log in the shop and return a JWT', (done) => {
      chai.request(server)
      .post('/signup')
      .send(testObj)
      .end((err, res) => {
        chai.request(server)
        .post('/signin')
        .send({ username: testObj.username, password: testObj.password, status: testObj.status })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res.body).to.be.a.jwt;
          const decode = jwt.decode(res.body, secret);
          expect(decode).to.be.an('object');
          expect(decode.username).to.equal(testObj.username);
          expect(decode.status).to.equal(testObj.status);
          done();
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