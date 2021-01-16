let characterlist = [];
let commentsLength = 0; // length of the comments JSON
window.addEventListener('load', async function(event){
    try{
        let response = await fetch("http://127.0.0.1:8090/characters");
        characterlist = await response.json();
        characterlist = JSON.parse(JSON.stringify(characterlist));
        response = await fetch("http://127.0.0.1:8090/comments/list");
        let comments = await response.json();
        comments = JSON.parse(JSON.stringify(comments));
        commentsLength = comments.length;
        render3Comments(comments);
    }
    catch(e){
        alert(e+": Please Try Again Later")
    }
  });

let scott = document.getElementById("ScottBox");
let ramona = document.getElementById("RamonaBox");
let wallace = document.getElementById("WallaceBox");
let knives = document.getElementById("KnivesBox");
let kim = document.getElementById("KimBox");
let stephen = document.getElementById("StephenBox");
let neil = document.getElementById("NeilBox");
let stacey = document.getElementById("StaceyBox");
let julie = document.getElementById("JulieBox");
let envy = document.getElementById("EnvyBox");
let matthew = document.getElementById("MatthewBox");
let lucas = document.getElementById("LucasBox");
let todd = document.getElementById("ToddBox");
let roxie = document.getElementById("RoxieBox");
let gideon = document.getElementById("GideonBox");

function renderCharacter(name){
    let data = characterlist;
    var output = document.getElementById(name); 
    for (let i = 0;i<data.length;i++){
        var splitname = data[i].Name.split(' ');
        if (splitname[0] === name){
            var htmlstring = "<table><tr> <td><img class='display-picture' src='images/"+splitname[0]+".jpg'></img></td><td><br><p><strong>Name: </strong>"+data[i].Name +"</p> <p><strong> Actor/Actress:  </strong>"+data[i].ActorActress +"</p><p> <strong> Description:  </strong>"+data[i].Description +"</p><br></tr></table>";
            output.innerHTML = htmlstring;
        }
    }
};


let displayed = 0; //counts how many comments are loaded and displayed. Needs to be global

function render3Comments(comments){
    let sortedcomments = comments.sort(function(a, b) {return b.likes - a.likes}); // sorts comments into order of most likes
    let container = document.getElementById("commentSection");
    let htmlstring="";
    if (displayed <= commentsLength){
        let counter = 0;
        for (let i=displayed;i<displayed+3;i++){
            if (displayed+counter < commentsLength){
                let thumb = ""
                if (sortedcomments[i].rating === "Liked"){
                    thumb = "Up"
                }
                else{
                    thumb = "Down"
                }
                htmlstring += "<div class='comments'><h2><img src='images/Thumbs_"+thumb+".png' class='small-thumbs'>"+sortedcomments[i].userName+"</h2><div class='comment-body'>"+sortedcomments[i].body+"</div><div class='comment-footer'><div class='datepost'>Posted on "+sortedcomments[i].date+"</div><div class='like-section'><img src='images/Like.png' class='like-button small-thumbs' id='thumbup"+sortedcomments[i].id+"'>Likes: "+sortedcomments[i].likes+"</div></div></div><br><br>";
                counter++;
            }
            else{
                load_more.classList.add("hidden")
            }
            
        }
        displayed += counter;
        container.insertAdjacentHTML('beforeend',htmlstring);
    }
    else{
        alert("There are no more comments");
    }
};

let load_more = document.getElementById("load-more");

load_more.addEventListener("click", async function(){
    let response = await fetch("http://127.0.0.1:8090/comments/list");
    let comments = await response.json();
    comments = JSON.parse(JSON.stringify(comments));
    commentsLength = comments.length;
    render3Comments(comments);
    
});

function clearForm(){
    document.getElementById("new_comment_body").value = "";
    document.getElementById("new_comment_name").value = "";
    document.getElementsByName("rating")[0].checked = false;
    document.getElementsByName("rating")[1].checked = false;
}

let submit = document.getElementById("post_new_comment");

submit.addEventListener("click", async function(event){
    event.preventDefault();
    try{
        //Get comment body
        let body = document.getElementById("new_comment_body").value;
        //Get userName
        let userName = document.getElementById("new_comment_name").value;
        //Get rating of new comment
        let new_rating = document.getElementsByName("rating");
        if(new_rating[0].checked){
            var user_rated = new_rating[0].value;
        }
        else if(new_rating[1].checked){
            var user_rated = new_rating[1].value;
        }
        else{
            var user_rated = null
        }

        if (userName == "" || body == "" || user_rated == null){
            alert("Please Fill All The Fields")
        }
        else{
            //Get Id for comment
            let commentId = commentsLength + 1;
            
            //Get Date
            const currentDate = new Date();
            const currentDayOfMonth = currentDate.getDate();
            const currentMonth = currentDate.getMonth();
            const currentYear = currentDate.getFullYear();
            const dateString = currentDayOfMonth + "." + (currentMonth + 1) + "." + currentYear;
            
            let newComment ={
                "id": commentId,
                "userName": userName,
                "date": dateString,
                "rating": user_rated,
                "body": body,
                "likes":0
            }
            console.log(newComment)
            commentsLength ++;
            let parameters = {'newComment': newComment};
            let response = await fetch('http://127.0.0.1:8090/comments/new', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(parameters)
            });
        let newCommentList = await response.json();
        clearForm();
        //renderNewComment(newCommentList);
        }
    }
    catch(e){
        alert(e+": Please Try Again Later")
    }
});

scott.addEventListener('click', function(event){
    renderCharacter("Scott");
})
ramona.addEventListener('click', function(event){
    renderCharacter("Ramona");
})
wallace.addEventListener('click', function(event){
    renderCharacter("Wallace");
})
knives.addEventListener('click', function(event){
    renderCharacter("Knives");
})
kim.addEventListener('click', function(event){
    renderCharacter("Kim");
})
stephen.addEventListener('click',function(event){
    renderCharacter("Stephen");
})
neil.addEventListener('click', function(event){
    renderCharacter("Neil");
})
stacey.addEventListener('click', function(event){
    renderCharacter("Stacey");
})
julie.addEventListener('click', function(event){
    renderCharacter("Julie");
})
envy.addEventListener('click', function(event){
    renderCharacter("Envy");
})
matthew.addEventListener('click', function(event){
    renderCharacter("Matthew");
})
lucas.addEventListener('click', function(event){
    renderCharacter("Lucas");
})
todd.addEventListener('click',function(event){
    renderCharacter("Todd");
})
roxie.addEventListener('click', function(event){
    renderCharacter("Roxie");
})
gideon.addEventListener('click', function(event){
    renderCharacter("Gideon");
})
