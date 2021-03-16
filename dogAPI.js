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
        //got message from console
    }
}

//Generates random dog picture of the breed the user selects
function createDogPic(images) {
    document.getElementById("dogPic").innerHTML=`
    <div class="dogPicImg" style="background-image: url('${images[Math.floor(Math.random() * images.length)]}')"></div>
    `
}