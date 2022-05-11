const { expect } = require('chai');
const chai = require('chai');
const chaiHTTP = require('chai-http');
const should = chai.should()

chai.use(chaiHTTP);

//Post endpoint testes
const endPoint = "http://localhost:1000/nyBruger"

describe(`POST new user ${endPoint}`, (done) => {
    it('should post a new user', (done) => {
        const payload = {
            name: "Mikkel",
            password: "1234"
        };
        chai
        .request(endPoint)
        .post("")
        .set("content-type", "application/json")
        .send(payload)
        .end((err, res) => {
            //general
            expect(err).to.be.null;
            //check if status is good
            res.should.have.status(200);
            //check if body is an obejct
            res.body.should.be.a('object')
            //check object has right properties
        done();
        });
    });
});

