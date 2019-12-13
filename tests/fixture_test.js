let chai = require('chai');
let should = chai.should();

const fixture = require('../resources/fixture');
let requests = require('../requests/fixture_requests');

describe('Fixtures', function() {
  it('should list ALL fixtures on /fixtures GET', function(done) {
    requests.getFixtures(function(err, res) {
      res.should.have.status(200);
      res.body.should.have.lengthOf(3);
      for (i = 0; i < 3; i++) {
        res.body[i].fixtureId.should.not.be.null;
      }
      done();
    })
  });

  it('should add a fixture on /fixture POST', function(done) {
    this.timeout(6000);
    let fixtureId = fixture.fixtureId;
    requests.postFixture(function(err, res) {
      res.should.have.status(200);
      requests.getFixture(fixtureId, function(err, res) {
        res.should.have.status(200);
        res.body.footballFullState.teams[0].teamId.should.equal('HOME');
        done();
      });
    });
  });

  it('should find the added fixture on /fixture/{id} GET', function(done) {
    requests.getFixture(4, function(err, res) {
      res.should.have.status(200);
      res.body.footballFullState.teams[0].teamId.should.equal('HOME');
      done();
    });
  });

  it('should delete the added fixture on /fixtures/{id} DELETE', function(done) {
    let fixtureId = fixture.fixtureId;
    this.timeout(6000);
    requests.postFixture(function(err, res) {
      res.should.have.status(200);
      requests.deleteFixture(fixtureId, function(err, res) {
        res.should.have.status(200);
        requests.getFixture(fixtureId, function(err, res) {
          res.should.have.status(404);
          done();
        });
      });
    });
  });
});
