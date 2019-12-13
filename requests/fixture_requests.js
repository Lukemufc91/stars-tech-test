"use strict";
let chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);

let test_server = "http://localhost:3000";
const fixture = require('../resources/fixture');

function getFixtures (callback) {
  chai.request(test_server)
    .get('/fixtures')
    .end(function(err, res){
      if (err)
        console.error(err);
      callback(err, res);
  });
};

function getFixture (fixtureId, callback) {
  chai.request(test_server)
    .get(`/fixture/${fixtureId}`)
    .end(function(err, res) {
      if (err)
        console.error(err);
      callback(err, res);
    });
};

function postFixture (callback) {
  chai.request(test_server)
    .post('/fixture')
    .set('content-type', 'application/json')
    .send(JSON.stringify(fixture))
    .end(function(err, res){
      if (err)
        console.error(err);
      callback(err, res);
  });
};

function deleteFixture (fixtureId, callback) {
  chai.request(test_server)
    .delete(`/fixture/${fixtureId}`)
    .end(function(err, res) {
      if (err)
        console.error(err);
      callback(err, res);
    });
};

exports.getFixtures = getFixtures;
exports.getFixture = getFixture;
exports.postFixture = postFixture;
exports.deleteFixture = deleteFixture;
