const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", function(){
    fectchTrainers()
})

function fectchTrainers(){
    fetch("http://localhost:3000/trainers")
    .then(response => response.json())
    .then(trainerArray => trainerArray.forEach(renderTrainer))
}

function renderTrainer(trainer){
    let main = document.querySelector("main")
    let div = document.createElement("div")
    div.innerHTML = `<div class="card" data-id='${trainer.id}'><p>${trainer.name}</p></div>`
    main.appendChild(div)
}