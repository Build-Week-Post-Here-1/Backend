const server = require('../api/server');
const request = require('supertest');

const Users = require('../users/users-model');
const Auth = require('./auth-router');
const db = require('../database/dbConfig');

describe('server.js', function() {
    describe('environment', function(){
        it('should set environment to testing', function(){
            expect(process.env.DB_ENV).toBe("testing")
        })
    });

    describe('auth-router', () => {
        beforeEach(async () => {
            await db('users').truncate();
    })

    describe('POST /register', function(){
        it('should return a 201 OK', function(){
            request(server)
                .post('/register')
                .send('username=NewUser')
                .set('Accept', 'application/json')
                .expect(201, {
                    username: 'NewUser'
                })
        })

        it('responds with a 401', () => {
            request(server)
                .post('/login')
                .auth('NewUser', 'pass')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(401)
        })
    });
   })
});