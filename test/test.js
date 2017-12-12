const supertest = require('supertest');
const expect = require('chai').expect;
const server = require('../server/server.js');

describe('initialize test', () => {
    // #1 should return home page
    it('should say hello world at server initiation', (done) => {
        // calling home page api
        supertest(server)
            .get('/')
            // .expect("Content-type", /json/)
            .expect(200, done); // THis is HTTP response
    });
});