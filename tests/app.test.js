'use strict';

const request = require('supertest');
const app = require('../app');

describe('Test all GET and POST methods in app.js', () => {

    // Testing GET Methods
    // Charcters Section
    test('GET /characters successful', () => {
        return request(app)
        .get('/characters')
        .expect(200);
    });
    test('GET /characters returns JSON', () => {
        return request(app)
        .get('/characters')
        .expect('Content-type', /json/);
    });
    test('GET /characters returns JSON containing Scott Pilgrim', () => {
        return request(app)
        .get('/comments/list')
        .expect(/Scott Pilgrim/);
    });
    test('GET /characters returns JSON with 15 characters', async () => {
        let response = await request(app).get('/characters');
        let characterList = response.body;
        characterList = JSON.parse(JSON.stringify(characterList));
        const charLength = characterList.length;
        expect(charLength).toBe(15);
    });

    // Comment Section
    test('GET /comments/list successful', () => {
        return request(app)
        .get('/comments/list')
        .expect(200);
    });
    test('GET /comments/list returns JSON', () => {
        return request(app)
        .get('/comments/list')
        .expect('Content-type', /json/);
    });
    test('GET /comments/list returns JSON containing Tom Jones', () => {
        return request(app)
        .get('/comments/list')
        .expect(/Tom Jones/);
    });
    test('GET /comments/list returns JSON with 7 comments', async () => {
        let response = await request(app).get('/comments/list');
        let comments = response.body;
        comments = JSON.parse(JSON.stringify(comments));
        const comLength = comments.length;
        expect(comLength).toBe(7);
    });

    // Invalid URL Test
    test('GET /anyInvalidUrl returns 404', () => {
        return request(app)
        .get('/director')
        .expect(404);
    });
    
    // Testing POST Methods
    // Testing /comments/new
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
        return request(app).post('/comments/new').send(params).expect(200);
    });
    test('POST /comments/new returns JSON', () => {
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
        return request(app).post('/comments/new').send(params).expect('Content-type', /json/);
    });
    test('POST /comments/new returns JSON containing Frank Sinatra', () => {
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
        return request(app).post('/comments/new').send(params).expect(/Frank Sinatra/);
    });
    test('POST /comments/new returns JSON with length = original length + 1', async () => {
        let response = await request(app).get('/comments/list');
        let comments = response.body;
        comments = JSON.parse(JSON.stringify(comments));
        const orgLength = comments.length;
        let newComment = {
                "id": 7,
                "userName": "Frank Sinatra",
                "date": "19.1.2021",
                "rating": "Liked",
                "body": "I think film was above-average. Better than the Twilight Series for sure.",
                "likes":0
        };
        newComment = JSON.stringify(newComment);
        const params = {'newComment': newComment};
        response = await request(app).post('/comments/new').send(params);
        let newComments = response.body;
        newComments = JSON.parse(JSON.stringify(newComments));
        const newLength = newComments.length;
        expect(newLength).toBe(orgLength+1);
    });

    // Testing /comments/unlike
    test('POST /comments/like successful', () => {
        let i = 1;
        const params ={'id': i};
        return request(app).post('/comments/like').send(params).expect(200);
    });
    test('POST /comments/like returns JSON', () => {
        let i = 1;
        const params ={'id': i};
        return request(app).post('/comments/like').send(params).expect('Content-type', /json/);
    });
    test('POST /comments/like returns JSON with "like" attribute increased by 1', async() => {
        let response = await request(app).get('/comments/list');
        let comments = response.body;
        comments = JSON.parse(JSON.stringify(comments));
        let i = 0;
        const orgLikes = comments[i].likes;
        const params = {'id': i};
        response = await request(app).post('/comments/like').send(params);
        let newComments = response.body;
        newComments = JSON.parse(JSON.stringify(newComments));
        const newLikes = newComments[i].likes;
        expect(newLikes).toBe(orgLikes+1);
    });

    // Testing /comments/unlike
    test('POST /comments/unlike successful', () => {
        let i = 1;
        const params ={'id': i};
        return request(app).post('/comments/unlike').send(params).expect(200);
    });
    test('POST /comments/unlike returns JSON', () => {
        let i = 1;
        const params ={'id': i};
        return request(app).post('/comments/unlike').send(params).expect('Content-type', /json/);
    });
    test('POST /comments/unlike returns JSON with "like" attribute decreased by 1', async() => {
        let response = await request(app).get('/comments/list');
        let comments = response.body;
        comments = JSON.parse(JSON.stringify(comments));
        let i = 0;
        const orgLikes = comments[i].likes;
        const params = {'id': i};
        response = await request(app).post('/comments/unlike').send(params);
        let newComments = response.body;
        newComments = JSON.parse(JSON.stringify(newComments));
        const newLikes = newComments[i].likes;
        expect(newLikes).toBe(orgLikes-1);
    });
    
});