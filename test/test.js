var supertest = require("supertest");
var should = require("chai").should();
var dotenv = require('dotenv')
var PORT = process.env.PORT || 8080
// This agent refers to PORT where program is runninng.
dotenv.config()
// console.log('environment port: ', process.env.PORT)
var server = supertest.agent("http://localhost:"+PORT);

// UNIT test begin

describe("SAMPLE unit test", function () {

    // #1 should return home page

    it("should return home page", function (done) {

        // calling home page api
        server
            .get("/")
            // .expect("Content-type", /json/)
            .expect(200,done) // THis is HTTP response
    
    });

});
