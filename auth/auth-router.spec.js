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

   describe('add', () => {
       it('should add user into db', async () => {
           await Users.add({
               username: 'chris',
               password: 'password'
           });
           const users = await db('users');

           expect(users).toHaveLength(1);
       });
       it('should add user into db', async () => {
           const {id} = await Users.add({
               username: 'chris',
               password: 'password'
           })
           let user = await db('users')
           .where({id})
           .first();

           expect(user.username).toBe('chris')
       });
     });    

     it.skip('setting sample  header', function(){
        return request(server)  //return here when testing async code
        .post('/login')
        .send({username: 'me', password: 'pass'})
        .then(res => {
            const token = res.body.token;
            return request(server)
            .get('/')
            .set('authorization', token)
            .then(res => {
                expect(Array.isArray(res.body)).toBe(true);
            });
        });  
        })
   });
});