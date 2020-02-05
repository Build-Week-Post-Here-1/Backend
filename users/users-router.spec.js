const server = require('../api/server');
const request = require('supertest');

const Users = require('./users-model');
const db = require('../database/dbConfig');

describe('server.js', function() {
    describe('environment', function(){
        it('should set environment to testing', function(){
            expect(process.env.DB_ENV).toBe("testing")
        })
    });

describe('users-model', () => {
    beforeEach(async () => {
        await db('users').truncate();
    })

    describe('GET /', function(){
        it('should return a 200 OK', function(){
            return request(server)
            .get('/')
            .then(res => {
                expect(res.status).toBe(200)
            })
        })
        it('should return a JSON', function(){
            return request(server)
                .get('/')
                .then(res => {
                    expect(res.type).toMatch(/json/);
                });
        });
    })
  });
});