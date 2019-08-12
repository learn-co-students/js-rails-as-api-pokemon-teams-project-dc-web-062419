const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


document.addEventListener("DOMContentLoaded", function(){
    thoseThatCatchThemAll()
    gottaCatchEmAll()
})




function thoseThatCatchThemAll(){
    fetch(`${TRAINERS_URL}`)
    .then(response => response.json())
    .then(trainersArray => trainersArray.forEach(renderTrainers))
   
}
function renderTrainers(trainer){
 let main = document.getElementById("main")
 let card = document.createElement("div")
 let pokeButton = document.createElement("button")
 main.appendChild(card)
 card.appendChild(pokeButton)
 pokeButton.classList.add(`button-${trainer.id}`)
 card.classList.add(`card-${trainer.id}`)
 card.innerText = trainer.name
 pokeButton.innerText = "Add Pokemon"
}

function gottaCatchEmAll(){
    fetch(`${POKEMONS_URL}`)
    .then(response => response.json())
    .then(pokemonArray => pokemonArray.forEach(renderPokemon))
    }
    
    function renderPokemon(pokemon){
        let card = document.querySelector("div")
        let list = document.createElement("ul")
        let listItem = document.createElement("li")
        let button = ocument.createElement("button")
        card.appendChild(list)
        list.appendChild(listItem)
        listItem.insertAdjacentHTML("beforeend", ` ${button}`)
    }






