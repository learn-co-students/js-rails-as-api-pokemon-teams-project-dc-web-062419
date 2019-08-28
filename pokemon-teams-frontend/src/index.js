const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


document.addEventListener("DOMContentLoaded", function(){
    thoseThatCatchThemAll()
})


function thoseThatCatchThemAll(){
    fetch(`${TRAINERS_URL}`)
    .then(response => response.json())
    .then(trainersArray => trainersArray.forEach(renderTrainers))
    .then(gottaCatchEmAll())
   
}
function renderTrainers(trainer){
    let main = document.getElementById("main")
    let card = document.createElement("div")
    let pokeButton = document.createElement("button")
    main.appendChild(card)
    pokeButton.id = (`${trainer.id}`)
    pokeButton.innerText = "Add Pokemon"
    pokeButton.classList.add("button")
    card.classList.add('card')
    card.id = (`card-${trainer.id}`)
    card.innerText = trainer.name
    card.appendChild(pokeButton)
    pokeButton.addEventListener("click", addingPokemon)
}

function gottaCatchEmAll(){
    fetch(`${POKEMONS_URL}`)
    .then(response => response.json())
    .then(pokemonArray => {
        pokemonArray.forEach(renderPokemon)})
}
    
function renderPokemon(pokemon){
    if (pokemon.trainer_id != null) {
        let card = document.getElementById(`card-${pokemon.trainer_id}`)
        let list = document.createElement("ul")
        let listItem = document.createElement("li")
        let button = document.createElement("button")
        if (!card.innerHTML.includes(listItem)){
        card.appendChild(list)
        list.appendChild(listItem)
        listItem.id = `pokemon-${pokemon.id}`
        list.classList.add("list")
        listItem.classList.add("listItem")
        listItem.innerText = `${pokemon.nickname} (${pokemon.species})`
        console.log(pokemon.name)
        listItem.insertAdjacentHTML("beforeend", `<button class='release' id=button-${pokemon.id} data-pokemon-id=${pokemon.id}>Release</button>`)
        let releaseButton = document.getElementById(`button-${pokemon.id}`)
        releaseButton.addEventListener("click", releaseThatFool )
        } else {
            listItem.id = `pokemon-${pokemon.id}`
        listItem.innerText = `${pokemon.nickname} (${pokemon.species})`
        listItem.insertAdjacentHTML("beforeend", `<button class='release' id=button-${pokemon.id} data-pokemon-id=${pokemon.id}>Release</button>`)
         }
    } 
}
function addingPokemon(event){
    event.preventDefault()
    let data = {
        trainer_id: event.currentTarget.id
    }
    fetch('http://localhost:3000/pokemons', {
        method: "POST",
        headers: {
            "Content-Type":"application/json",
            "Accept":"application/json"
        },
        body: JSON.stringify(data)
    }).then(res => res.json())
    .then(data => {
        renderPokemon(data)
    })
}


function releaseThatFool(event){
    let id = event.target.id.split("-")[1]
    fetch(`http://localhost:3000/pokemons/${id}`, {
        method: "DELETE"
    }).then(res => res.json())
    .then(deletedPokemon => {
        let listItem = document.getElementById(`pokemon-${id}`)
        listItem.innerText = ""
    })
}