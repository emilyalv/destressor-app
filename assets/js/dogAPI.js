var saveDogBtn = document.getElementById("dogSaveBtn");

//fetches breed list
async function start() {
    const response = await fetch("https://dog.ceo/api/breeds/list/all");
    const data = await response.json();
    createBreedList(data.message);
}

start()

//creates select element
function createBreedList(breedlist) { 
    document.getElementById("breed").innerHTML = ` 
    <select onchange="loadByBreed(this.value)">
            <option>Choose a dog breed</option>
            ${Object.keys(breedlist).map(function (breed) {
                return `<option>${breed}</option>`
            }).join('')}
        </select>
    `
}

//fetches data according to breed selected by user
async function loadByBreed(breed) {
    if (breed != "Choose a dog breed") {
        const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`)
        const data = await response.json()
        createDogPic(data.message)
    }
}
var currentPic = "";
//renders a random dog from array based on what breed the user selects
//generates button to save dog
function createDogPic(images) {
    saveDogBtn.classList.remove("hidden");
    var getDogPic = images[Math.floor(Math.random() * images.length)]
    document.getElementById("dogPic").innerHTML=`
    <img class="dogPicImg" src=${getDogPic}></img>
    `
    console.log(getDogPic); 
    currentPic = getDogPic;   
}

//click button, runs function to save to local storage
saveDogBtn.addEventListener("click", dogFav);

//saves to local storage & adds to favorites
function dogFav(e) {
    localStorage.setItem("favoriteDogs", JSON.stringify(currentPic));
    document.getElementById('dogFaves').innerHTML = `<img src=${currentPic}></img>`;
}

function getFavorites () {
    var savedDog = localStorage.getItem("favoriteDogs");
    console.log(savedDog);
    document.getElementById('dogFaves').innerHTML = `<img src=${savedDog}></img>`;
}

//checks to see if user has saved a dog to local storage
//only runs getFavorites if they have saved previously
function storageCheck() {
    if (localStorage.getItem("favoriteDogs") == null) {
        console.log("nothing saved");
        return;
    } else {(localStorage.getItem("favoriteDogs") != null) 
        getFavorites();
    }
}

storageCheck();