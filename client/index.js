let characterList = [];
let characterNames = [];
let commentsLength = 0; // length of the comments JSON

//When the page is started up, all the information of the characters and some info about the comments is loaded and put into a global variable
window.addEventListener('load', async function(event){
    event.preventDefault();
    try{
        let response = await fetch("http://127.0.0.1:8090/characters");
        characterList = await response.json();
        characterList = JSON.parse(JSON.stringify(characterList));
        response = await fetch("http://127.0.0.1:8090/comments/list");
        let comments = await response.json();
        comments = JSON.parse(JSON.stringify(comments));
        commentsLength = comments.length;
        render3Comments(comments);
        for (let i = 0; i<characterList.length;i++){
            characterNames.push(characterList[i].Name.split(' ')[0]);
        }
        
    }
    catch(e){
        let container = document.getElementById("main");
        let error_message = "<div class='subtitle'><div class = 'gap'></div><p class='error big'> 404 Error - Page Not Found </p><p class='error big'> The Page You Requested Could Not Be Loaded... </p><div class = 'gap'></div></div><div class = 'gap'></div><div class = 'gap'></div><div class = 'gap'></div>";
        container.innerHTML = error_message;
    }
  });


// Error is not expected, however if there is an error with loading the wrong data then this error will occur
function renderCharacter(name){
    try{
        let data = characterList;
        let output = document.getElementById(name); 
        for (let i = 0;i<data.length;i++){
            let splitname = data[i].Name.split(' ');
            if (splitname[0] === name){
                let htmlstring = "<table><tr> <td><img class='display-picture' src='images/"+splitname[0]+".jpg' alt ='"+splitname[0]+"_Full_Image'></img></td><td><br><p><strong>Name: </strong>"+data[i].Name +"</p> <p><strong> Actor/Actress:  </strong>"+data[i].ActorActress +"</p><p> <strong> Description:  </strong>"+data[i].Description +"</p><br></tr></table>";
                output.innerHTML = htmlstring;
            }
        }
    }
    catch(e){
        let container = document.getElementById(name); 
        let error_message = "<div class = 'small-gap'></div><p> This character's information could not be loaded. Please Try Again Later </p> <div class = 'small-gap'></div>";
        container.innerHTML = error_message;
    }
}


let displayed = 0; //counts how many comments are loaded and displayed. Needs to be global
let clientdisplayed = 0; // counts how many comments are loaded that were just recently added

function render3Comments(comments){
    let sortedcomments = comments.sort(function(a, b) {return b.likes - a.likes}); // sorts comments into order of most likes
    let container = document.getElementById("commentSection");
    let htmlstring="";
    if (displayed < commentsLength-clientdisplayed){
        let counter = 0;
        for (let i=displayed;i<displayed+3;i++){
            if (displayed+counter < commentsLength-clientdisplayed){
                let thumb = "";
                if (sortedcomments[i].rating === "Liked"){
                    thumb = "Up"
                }
                else{
                    thumb = "Down"
                }
                htmlstring += "<div class='comments' id='comment"+sortedcomments[i].id+"'><h2><img src='images/Thumbs_"+thumb+".png' class='small-thumbs'>"+sortedcomments[i].userName+"</h2><div class='comment-body'>"+sortedcomments[i].body+"</div><div class='comment-footer'><div class='datepost'>Posted on "+sortedcomments[i].date+"</div><div class='like-section' id='like"+sortedcomments[i].id+"'><img src='images/Like.png' class='like-button small-thumbs' id='thumbup"+sortedcomments[i].id+"'>Likes: "+sortedcomments[i].likes+"</div></div></div><div class = 'small-gap'></div>";
                counter++;
            }
            else{
                load_more.classList.add("hidden")
            }
            
        }
        displayed += counter;
        container.insertAdjacentHTML('beforeend',htmlstring);
        if (displayed >= commentsLength-clientdisplayed){
            load_more.classList.add("hidden")
        }
    }
    else{
        load_more.classList.add("hidden")
    }
    
}

// Renders recently posted comment on top of list, for user to see. And it is not rendered last when "Load more comments" is clicked
function renderNewComment(newCommentList){
    let index = newCommentList.length-1;
    let container = document.getElementById("clientcommentSection");
    let htmlstring="";
    let thumb = ""
        if (newCommentList[index].rating === "Liked"){
            thumb = "Up"
        }
        else{
            thumb = "Down"
        }
    htmlstring = "<div class='comments' id='comment"+newCommentList[index].id+"'><h2><img src='images/Thumbs_"+thumb+".png' class='small-thumbs'>"+newCommentList[index].userName+"</h2><div class='comment-body'>"+newCommentList[index].body+"</div><div class='comment-footer'><div class='datepost'>Posted on "+newCommentList[index].date+"</div><div class='like-section' id='like"+newCommentList[index].id+"'><img src='images/Like.png' class='like-button small-thumbs' id='thumbup"+newCommentList[index].id+"'>Likes: "+newCommentList[index].likes+"</div></div></div><div class = 'small-gap'></div>";
    container.insertAdjacentHTML('beforeend',htmlstring);
    
    clientdisplayed++;
}

function likedComment(likedComment){
    let container = document.getElementById("like"+likedComment["id"]);
    let htmlstring = "<img src='images/Liked.png' class='like-button small-thumbs' id='liked"+likedComment["id"]+"'>Likes: "+likedComment["likes"] //likes
    container.innerHTML= htmlstring;
}
function unlikedComment(unlikedComment){
    let container = document.getElementById("like"+unlikedComment["id"]);
    let htmlstring = "<img src='images/Like.png' class='like-button small-thumbs' id='thumbup"+unlikedComment["id"]+"'>Likes: "+unlikedComment["likes"] //unlikes
    container.innerHTML= htmlstring;
}


let load_more = document.getElementById("load-more");

load_more.addEventListener("click", async function(){
    try{
        let response = await fetch("http://127.0.0.1:8090/comments/list");
        let comments = await response.json();
        comments = JSON.parse(JSON.stringify(comments));
        commentsLength = comments.length;
        render3Comments(comments);
    }
    catch(e){
        let container = document.getElementById("load-container"); 
        let error_message = "<p class='error'>"+e+". More Comments Could Not Be Loaded. Please Try Again Later...</p>";
        container.innerHTML = error_message;
    }
    
    
});

function clearForm(){
    document.getElementById("new_comment_body").value = "";
    document.getElementById("new_comment_name").value = "";
    document.getElementsByName("rating")[0].checked = false;
    document.getElementsByName("rating")[1].checked = false;
}

let submit = document.getElementById("post_new_comment");

//Submit the comment button
submit.addEventListener("click", async function(event){
    event.preventDefault();
    try{
        //Get comment body
        let body = document.getElementById("new_comment_body").value;
        //Get userName
        let userName = document.getElementById("new_comment_name").value;
        //Get rating of new comment
        let new_rating = document.getElementsByName("rating");
        let user_rated = null;
        if(new_rating[0].checked){
            user_rated = new_rating[0].value;
        }
        else if(new_rating[1].checked){
            user_rated = new_rating[1].value;
        }

        if (userName == "" || body == "" || user_rated == null){
            let container = document.getElementById("submit_error");
            let error_message = "<p class='error'>Please Fill in All The Fields</p>";
            container.innerHTML = error_message;
        }
        else{
            let container = document.getElementById("submit_error");
            let clear = "";
            container.innerHTML = clear;
            //Get Id for comment
            let commentId = commentsLength;
            
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
            let parameters = {'newComment': newComment};
            let response = await fetch('http://127.0.0.1:8090/comments/new', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(parameters)
            });
        let newCommentList = await response.json();
        newCommentList = JSON.parse(JSON.stringify(newCommentList));
        commentsLength = newCommentList.length;
        renderNewComment(newCommentList);
        clearForm();
        
        }
    }
    catch(e){
        let container = document.getElementById("submit_error");
        let error_message = "<p class='error'>"+e+". Could not post your comment. Please Try Again Later</p>";
        container.innerHTML = error_message;
        container = document.getElementById("postButton");
        let disablePost = "<button type='submit' class='post-button' id='post_new_comment' disabled>Post</button>";
        container.innerHTML = disablePost;
    }
});

//EventListener which sees with like/unlike button (of each comment) is clicked and then sends a post request to update the number of likes
document.addEventListener('click', async function(ele){
    for (let i=0;i<commentsLength+clientdisplayed;i++){
        if(ele.target && ele.target.id== ("thumbup"+i)){
            let parameters = {'id': i};
            let response = await fetch('http://127.0.0.1:8090/comments/like', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(parameters)
            });
            let editedComments = await response.json();
            editedComments = JSON.parse(JSON.stringify(editedComments));
            likedComment(editedComments[i])
       }
        if(ele.target && ele.target.id== ("liked"+i)){
            let parameters = {'id': i};
            let response = await fetch('http://127.0.0.1:8090/comments/unlike', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(parameters)
            });
            let editedComments = await response.json();
            editedComments = JSON.parse(JSON.stringify(editedComments));
            unlikedComment(editedComments[i])
        }
    }
 });

//EventListener which listens to all the faces clicked and renders each characters information
 document.addEventListener('click',async function(ele){
    let names = characterNames;
    for (let j=0;j<15;j++){
        if(ele.target && ele.target.id== (names[j]+"Box")){
            renderCharacter(names[j]);
        }
    }
});