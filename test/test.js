var supertest = require("supertest");
var should = require("chai").should();

// This agent refers to PORT where program is runninng.

var server = supertest.agent("http://localhost:3000");

// UNIT test begin

describe("SAMPLE unit test", function () {

    // #1 should return home page

    it("should return home page", function (done) {

        // calling home page api
        server
            .get("/")
            // .expect("Content-type", /json/)
            .expect(200) // THis is HTTP response
            .end(function (err, res) {
                // HTTP status should be 200
                res.body.message.should.equal('Hello World!')
                res.status.should.equal(200);
                done();
            });
    });

});