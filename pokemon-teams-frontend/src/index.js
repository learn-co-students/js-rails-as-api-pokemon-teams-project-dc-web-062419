const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
document.addEventListener("DOMContentLoaded", function() {
    fetchTrainers()
})

function fetchTrainers() {
    
    fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(data => data.forEach(trainer => renderTrainer(trainer)))
}

function renderTrainer(trainer) {
    const main = document.querySelector('main')
    let newCard = document.createElement('div')
    newCard.className = "card" 
    newCard.dataset.id = trainer.id
    let newP = document.createElement('p')
    newP.innerText = trainer.name
    newCard.appendChild(newP)
    main.appendChild(newCard)

    let newBttn = document.createElement('button')
    newBttn.innerText = "Add Pokemon"
    newBttn.dataset.trainerId = trainer.id
    newBttn.addEventListener("click", addPokemon)
    newCard.appendChild(newBttn)

    let newUl = document.createElement('ul')
    newCard.appendChild(newUl)
    trainer.pokemons.forEach((pokemon) => {renderPokemon(pokemon, newUl)})
}

function addPokemon(e) {
    let tId = e.target.dataset.trainerId
    let thisUl = e.currentTarget.parentElement.querySelector("ul")
    if (thisUl.childElementCount < 6) {
        fetch(POKEMONS_URL, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({trainer_id: tId})
        })
        .then(resp => resp.json())
        .then(data => renderPokemon(data, thisUl))
    } else {
        alert("ONLY 6 POKEMONS PER TRAINER.")
    }
}

function renderPokemon(pokemon, thisUl) {
    let newLi = document.createElement('li')
    newLi.innerText = `${pokemon.nickname} (${pokemon.species})`
    thisUl.appendChild(newLi)
    
    let releasebttn = document.createElement('button')
    releasebttn.innerText = "Release"
    releasebttn.className = "release"
    releasebttn.dataset.pokemonId = pokemon.id
    newLi.appendChild(releasebttn)

    releasebttn.addEventListener("click", removePokemon)
}

function removePokemon(e) {
    pId = e.target.dataset.pokemonId
    let thisUl = e.currentTarget.parentElement.querySelector("ul")
    fetch(`${POKEMONS_URL}/${pId}`, {
        method: "DELETE",
        headers: {"Content-Type": "application/json"}
    })
    .then(resp => resp.json())
    .then(json => e.target.parentElement.remove())
}

