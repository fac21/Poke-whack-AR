const moles = document.querySelectorAll(".mole");
const holes = document.querySelectorAll(".hole");
const score = document.querySelector(".score")
let lastHole;
let count = 0;
let timeLapsed = false;
let pokemonList = ["charizard", "charmander", "squirtle", "pikachu", "ivysaur", "jigglypuff"]

let chosenPokemon = "bulbasaur";
let pokepic = () => {
  fetch(`https://pokeapi.co/api/v2/pokemon/${chosenPokemon}`)
    .then((response) => response.json())
    .then((pokemonData) => {
      moles.forEach((mole) => (mole.src = pokemonData.sprites.front_default));
    });
};

pokepic();

function randomPokeNo(){
    let index = Math.floor(Math.random()*pokemonList.length)
    return pokemonList[index];
}

function randomHole() {
  let index = Math.floor(Math.random() * holes.length);
  let hole = holes[index];
  if (hole === lastHole) {
    return randomHole();
  }
  lastHole = hole;
  return hole;
}

function randomTime(min, max) {
  let int = max - min;
  return Math.floor(Math.random() * int + min);
}

function peep() {
  let time = randomTime(1000, 5000);
  let hole = randomHole();
  let mole = hole.querySelector(".mole");
  console.log(hole, mole);

  mole.classList.add("up");
  setInterval(() => {
    mole.classList.remove("up");
    if (!timeLapsed && document.querySelectorAll(".up").length < 4) {
      peep();
    }
  }, time);
  //return mole;
}

function startGame() {
  timeLapsed = false;
  count = 0;
  peep();

  let intStart = setInterval(() => {
    timeLapsed = true;
    moles.forEach((mole) => mole.classList.remove("up"))
    alert(`Game over! You scored ${count}!`);
    clearInterval(intStart);
  }, 10000);
}

document.querySelector("button").addEventListener("click", startGame);


function bonk(e) {
if (!e.isTrusted) return;
count ++;
this.classList.remove("up");
score.textContent = count;
console.log(count)
}

moles.forEach((mole) => mole.addEventListener("click", bonk))