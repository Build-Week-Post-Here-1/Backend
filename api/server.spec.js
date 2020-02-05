const request = require('supertest');
const server = require('./server');


describe('server.js', () => {
    describe('environment', function(){
        it('should set environment to testing', function(){
            expect(process.env.DB_ENV).toBe('testing')
        })
    });
})