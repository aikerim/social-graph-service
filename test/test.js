var supertest = require("supertest");
var should = require("chai").should();
var dotenv = require('dotenv')
// This agent refers to PORT where program is runninng.
dotenv.config()
// console.log('environment port: ', process.env.PORT)
var server = supertest.agent("http://localhost:"+process.env.PORT);

// UNIT test begin

describe("SAMPLE unit test", function () {

    // #1 should return home page

    it("should return home page", function (done) {

        // calling home page api
        server
            .get("/")
            // .expect("Content-type", /json/)
            .expect(200, done) // THis is HTTP response
    
    });

});
