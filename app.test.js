'use strict';

const request = require('supertest');
const app = require('./app');

describe('Test all GET and POST methods in app.js', () => {
    test('GET /characters successful', () => {
        return request(app)
        .get('/characters')
        .expect(200);
    });
    test('GET /comments/list successful', () => {
        return request(app)
        .get('/comments/list')
        .expect(200);
    });
    test('GET /comments/list return JSON', () => {
        return request(app)
        .get('/comments/list')
        .expect('Content-type', /json/);
    });
    test('GET /anyInvalidUrl return 404', () => {
        return request(app)
        .get('/director')
        .expect(404);
    });
    test('GET /characters successful', () => {
        return request(app)
        .get('/characters')
        .expect('Content-type', /json/);
    });
    test('POST /comments/new successful', () => {
        let newComment = {
                "id": 7,
                "userName": "Frank Sinatra",
                "date": "19.1.2021",
                "rating": "Liked",
                "body": "I think film was above-average. Better than the Twilight Series for sure.",
                "likes":0
        };
        newComment = JSON.stringify(newComment);
        const params = {'newComment': newComment}
        return request(app)
        .post('/comments/new')
        .send(params)
	    .expect(200);
    });
    test('POST /comments/like successful', () => {
        let i = 1;
        const params ={'id': i};
        return request(app)
        .post('/comments/like')
        .send(params)
	    .expect(200);
    });
    test('POST /comments/unlike successful', () => {
        let i = 1;
        const params ={'id': i};
        return request(app)
        .post('/comments/unlike')
        .send(params)
	    .expect(200);
    });
});