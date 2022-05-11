var chai = require("chai")
var chaiHttp = require('chai-http');
const should = chai.should();

chai.use(chaiHttp);

const endPoint = 'http://localhost:1000/loginBruger'
describe("Tester om bruger kan logge ind", () => {
    it("skal have status 200, da payloaden indeholder rigtige oplysninger ", function (done) {
        const payload = {
            name: "s",
            password: "s"
        };
        chai
            .request(endPoint)
            .post("")
            .set("content-type", "application/json")
            .send(payload)
            .end((err, res) => {
                res.should.have.status(200)
                done();
            });
    })
})
//FORKERT LOGIN
const endPoint2 = 'http://localhost:1000/loginBruger'
describe("Tester om bruger kan logge ind med forkerte oplysninger", () => {
    it("skal have status 404, da payloaden indeholder forkerte oplysninger ", function (done) {
        const payload = {
            name: "sss",
            password: "sss"
        };
        chai
            .request(endPoint2)
            .post("")
            .set("content-type", "application/json")
            .send(payload)
            .end((err, res) => {
                res.should.have.status(404)
                done();
            });
    })
})
//rigtigt navn men forkert password
const endPoint3 = 'http://localhost:1000/loginBruger'
describe("Tester om bruger kan logge ind", () => {
    it("skal have status 404, da payloaden indeholder rigtigt navn men forkert password ", function (done) {
        const payload = {
            name: "s",
            password: "sss"
        };
        chai
            .request(endPoint3)
            .post("")
            .set("content-type", "application/json")
            .send(payload)
            .end((err, res) => {
                res.should.have.status(404)
                done();
            });
    })
})
//rigtgt password men forkert navn
const endPoint4 = 'http://localhost:1000/loginBruger'
describe("Tester om bruger kan logge ind", () => {
    it("skal have status 404, da payloaden indeholder rigtigt password men forkert navn ", function (done) {
        const payload = {
            name: "sss",
            password: "s"
        };
        chai
            .request(endPoint4)
            .post("")
            .set("content-type", "application/json")
            .send(payload)
            .end((err, res) => {
                res.should.have.status(404)
                done();
            });
    })
})

