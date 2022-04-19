const { expect } = require('chai');
const chai = require('chai');
const chaiHTTP = require('chai-http');
const should = chai.should()

chai.use(chaiHTTP);

//Post endpoint testes
const endPoint = "http://localhost:4000/create"

describe(`POST new user ${endPoint}`, () => {
    it('should post a new user', (done) => {
        const newUser = {
            username: "Mikkel",
            password: "1234"
        };
        chai
        .request(endPoint)
        .post("")
        .set("content-type", "application/json")
        .send(newUser)
        .end((err, res) => {
            //general
            expect(err).to.be.null;
            //check if status is good
            res.should.have.status(201);
            //check if body is an obejct
            res.body.should.be.a('object')
            //check object has right properties
            res.body.should.have.property('username').eq("Mikkel")
            res.body.should.have.property('password').eq("1234")
        done();
        });
    });
});


