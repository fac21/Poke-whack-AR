const moles = Array.from(document.querySelectorAll(".mole"));
const holes = document.querySelectorAll(".hole");
let lastHole;
let count = 0;

let name = "bulbasaur"
 let pokepic = () => {
     fetch("https://pokeapi.co/api/v2/pokemon/bulbasaur")
        .then((response) => response.json())
        .then((pokemonData) => {
            console.dir(pokemonData);
            console.log(moles)
            moles.forEach(mole => mole.src = pokemonData.sprites.front_default);
          })
    }

pokepic();


function randomHole(){
    let index = Math.floor(Math.random()*holes.length);
    let hole = holes[index];
    if (hole === lastHole) {return randomHole()}
    lastHole = hole
    return hole;
}

function randomTime(min, max){
    let int = max-min;
    return Math.floor(Math.random()*int + min);
}

function peep (){
    let time = randomTime(1000, 5000);
    let hole = randomHole();
    let mole = hole.querySelector(".mole");
    mole.classList.add("up");
    setInterval(() => {mole.remove("up")}, time);
    return mole
}

function startGame(){
    count = 0;

    peep()
}

function bonk (){

}