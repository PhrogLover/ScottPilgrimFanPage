
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
    var xhr = new XMLHttpRequest();
    xhr.open('GET',"characters.json");
    xhr.onload = function(){
        var data = JSON.parse(xhr.responseText);
        var output = document.getElementById(name); 
        for (let i = 0;i<data.length;i++){
            var splitname = data[i].Name.split(' ');
            if (splitname[0] === name){
                var htmlstring = "<table><tr> <td><img class='display-picture' src='images/"+splitname[0]+".jpg'></img></td><td><br><p><strong>Name: </strong>"+data[i].Name +"</p> <p><strong> Actor/Actress:  </strong>"+data[i].ActorActress +"</p><p> <strong> Description:  </strong>"+data[i].Description +"</p><br></tr></table>";
                output.innerHTML = htmlstring;
            }
        }
    };
    xhr.send();

}

scott.addEventListener('click', async function(event){
    event.preventDefault();
    renderCharacter("Scott");
})
ramona.addEventListener('click', async function(event){
    event.preventDefault();
    renderCharacter("Ramona");
})
wallace.addEventListener('click', async function(event){
    event.preventDefault();
    renderCharacter("Wallace");
})
knives.addEventListener('click', async function(event){
    event.preventDefault();
    renderCharacter("Knives");
})
kim.addEventListener('click', async function(event){
    event.preventDefault();
    renderCharacter("Kim");
})
stephen.addEventListener('click', async function(event){
    event.preventDefault();
    renderCharacter("Stephen");
})
neil.addEventListener('click', async function(event){
    event.preventDefault();
    renderCharacter("Neil");
})
stacey.addEventListener('click', async function(event){
    event.preventDefault();
    renderCharacter("Stacey");
})
julie.addEventListener('click', async function(event){
    event.preventDefault();
    renderCharacter("Julie");
})
envy.addEventListener('click', async function(event){
    event.preventDefault();
    renderCharacter("Envy");
})
matthew.addEventListener('click', async function(event){
    event.preventDefault();
    renderCharacter("Matthew");
})
lucas.addEventListener('click', async function(event){
    event.preventDefault();
    renderCharacter("Lucas");
})
todd.addEventListener('click', async function(event){
    event.preventDefault();
    renderCharacter("Todd");
})
roxie.addEventListener('click', async function(event){
    event.preventDefault();
    renderCharacter("Roxie");
})
gideon.addEventListener('click', async function(event){
    event.preventDefault();
    renderCharacter("Gideon");
})





