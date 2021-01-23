const express = require('express');
const app = express();
app.use(express.static('client'));
app.use(express.json());

//GET Methods
app.get('/characters', function(req, resp){
    resp.json(characterList);
});
app.get('/comments/list', function(req, resp){
    resp.json(commentsList);
});

//POST Methods
app.post('/comments/new', function(req, resp){
    const newComment = req.body.newComment;
    commentsList.push(newComment);
    resp.json(commentsList);
});
app.post('/comments/like', function(req, resp){
    const commentId = req.body.id;
    commentsList[commentId].likes +=1;
    resp.json(commentsList);
});
app.post('/comments/unlike', function(req, resp){
    const commentId = req.body.id;
    commentsList[commentId].likes -=1;
    resp.json(commentsList);
});
// If any other page is typed in the URL, then the Error will show. Placed at the bottom so that the other methods at priority.
app.get('*', function(req, res){
    res.status(404).send('<h1>404 Error: Page Not Found</h1>');
});


module.exports = app;

//Below are all the character information and comments

let characterList =
[
    {
        "Name": "Scott Pilgrim",
        "ActorActress": "Micheal Cera",
        "Description": "Scott William Pilgrim is the 22 year old protagonist. He is the bass player for the band Sex Bob-Omb with his friends Stephen Stills and Kim Pine; he plays a Rickenbacker 4003 in the film."
    },
    {
        "Name": "Ramona Flowers",
        "ActorActress": "Mary Elizabeth Winstead",
        "Description": "Ramona Victoria Flowers is an American expatriate who lived in New York and now works as a 'Ninja delivery girl' for Amazon.ca in Canada. She is 24 years old and Scott's main love interest."
    },
    {
        "Name": "Wallace Wells",
        "ActorActress": "Kieran Culkin",
        "Description": "Wallace Wells is Scott Pilgrim's cool gay roommate; they met in college. Although he and Scott are just friends, they share a double bed because they cannot afford two beds, however, Wallace does show sexual interest in Scott on several occasions."
    },
    {
        "Name": "Knives Chau",
        "ActorActress": "Ellen Wong",
        "Description": "Knives Chau is a 17-year-old Chinese-Canadian catholic high school girl. When Knives dates Scott, she is happy-go-lucky, but when he cheated on her (initially 'forgetting' to break up with her), her personality drastically changes. "
    },
    {
        "Name": "Kim Pine",
        "ActorActress": "Alison Pill",
        "Description": "Kimberly 'Kim' Pine is Scott's high school friend and drummer of Sex Bob-omb. She is 23 years old and was Scott's first girlfriend, whom he 'saved' from Simon Lee."
    },
    {
        "Name": "Stephen Stills",
        "ActorActress": "Mark Webber",
        "Description": "Stephen Stills is the lead singer, guitarist and 'talent' of Sex Bob-omb. He is 23 years old and went to university with Scott."
    },
    {
        "Name": "Neil Nordegraf",
        "ActorActress": "Johnny Simmons",
        "Description": "Neil 'Young Neil' Nordegraf is Sex Bob-omb's biggest fan.He is very quiet and is most often seen just observing the dialogue of his friends and the events around him."
    },
    {
        "Name": "Stacey Pilgrim",
        "ActorActress": "Anna Kendrick",
        "Description": "Stacey Pilgrim is Scott's 19-year-old younger sister. She works at the same Second Cup with Julie Powers and is also friends with Ramona."
    },
    {
        "Name": "Julie Powers",
        "ActorActress": "Aubrey Plaza",
        "Description": "Julie is known to be snarky and mean, particularly to Scott.The only person she is likely to show any kindness to is Envy Adams, though she doesn't care much for Julie and tends to ignore her."
    },
    {
        "Name": "Envy Adams",
        "ActorActress": "Brie Larson",
        "Description": "Natalie V. 'Envy' Adams is Scott Pilgrim's ex-girlfriend who brutally dumped Scott in college prior to the events in the film. Now she is the lead singer of The Clash at Demonhead."
    },
    {
        "Name": "Matthew Patel",
        "ActorActress": "Satya Bhabha",
        "Description": "Matthew Patel is Ramona's first Evil Ex boyfriend and the first Evil Ex whom Scott battles. Ramona Flowers and he dated for only a week and a half, during which Ramona pretty much used Matthew and his mystical powers to ward off flocks of jocks interested in her."
    },
    {
        "Name": "Lucas Lee",
        "ActorActress": "Chris Evans",
        "Description": "Lucas Lee is Ramona Flowers' second evil ex. Lucas is a skateboarder turned sell-out actor who is shown as the star in a number of cheesy action movies."
    },
    {
        "Name": "Todd Ingram",
        "ActorActress": "Brandon Routh",
        "Description": "Todd Ingram is Ramona Flowers's third ex-boyfriend. He is a vegan and the bass player for The Clash at Demonhead."
    },
    {
        "Name": "Roxie Richter",
        "ActorActress": "Mae Whitman",
        "Description": "Roxie could move at near-ninja like speed, attaining a velocity where she became visible to the human eye only as a black blur."
    },
    {
        "Name": "Gideon Graves",
        "ActorActress": "Jason Schwartzman",
        "Description": "Gideon Gordon Graves is Ramona Flowers' seventh evil ex-boyfriend, the leader and founder of the League of Ramona's Evil Ex-Boyfriends, and the primary antagonist of the film."
    }
]

let commentsList = [
    {
        "id": 0,
        "userName": "Tom Jones",
        "date": "15.1.2021",
        "rating": "Liked",
        "body": "Bread makes you fat? This is one of Edgar Wright's best. \"Scott Pilgrim\" is truly one of the (if not the) best graphic novel adaptations I have ever seen. I listened to the director's commentary and (fun fact), for scenes that took place in the music store, they actually organized all the posters in the background to make it look more like the original comic. It's these tiny details that make the movie great.",
        "likes":6
    },
    {
        "id": 1,
        "userName": "Louis Armstrong",
        "date": "14.1.2021",
        "rating": "Liked",
        "body": "An absolute masterpiece of a film. Edgar Wright is such a talented director and personally I think the casting choice is absolutely perfect based on the graphic novel. I love this film to high heavens. Years later it's still my all time favourite.",
        "likes":4
    },
    {
        "id": 2,
        "userName": "Neil Diamond",
        "date": "14.1.2021",
        "rating": "Liked",
        "body": "In my opinion, this is the most perfect teenage movie of all time. It has all the things i want for a movie: Action, Comedy, Romance and it's all blended together perfectly with no absolute miscalculations. To this day it still blows my mind of how perfect the casting is, but everyone had mixed reactions from Cera. I think Cera is perfect for Pilgrim. I mean i can't really imagine anyone else playing this role.",
        "likes":5
    },
    {
        "id": 3,
        "userName": "Elvis Presley",
        "date": "15.1.2021",
        "rating": "Liked",
        "body": "I love how the whole movie is like a video game. From the 8-bit sound effects, the eye-opening, action packed fight scenes, and having Chris Evans before he was Captain America and Brie Larson before she was Captain Marvel make it even better.",
        "likes":8
    },
    {
        "id": 4,
        "userName": "Frankie Valli",
        "date": "13.1.2021",
        "rating": "Disliked",
        "body": "Jesus it’s dull. I felt compelled to review just because the others were so positive. The relationships between some of the main characters are interesting and well developed but my god the fight scenes are boring. It’s amazing I’m awake to write this.",
        "likes":1
    },
    {
        "id": 5,
        "userName": "Paul McCartney",
        "date": "12.1.2021",
        "rating": "Disliked",
        "body": "Please stop using a socially awkward bad actor like michael cera for every alternative post teenager role",
        "likes":1
    },
    {
        "id": 6,
        "userName": "Paul Anka",
        "date": "17.1.2021",
        "rating": "Liked",
        "body": "From the start of the movie to the end I found my self laughing with incredible visuals and great cast this movie is a must watch for any movie fan. This movie also stays true to the comic and as a Canadian I find this movies comedy funny,and the songs surprisingly good.",
        "likes":6
    }
]