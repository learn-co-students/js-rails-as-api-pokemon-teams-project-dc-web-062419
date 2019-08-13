document.addEventListener("DOMContentLoaded", ()=>{
    console.log("hello, is it me you're looking for?")
    getAllTrainers()
})

function getAllTrainers(){
    fetch(TRAINERS_URL)
    .then(res => res.json())
    .then(trainers => trainers.forEach(renderTrainer))
}
    
function renderTrainer(trainer){
    const trainerDiv = document.createElement('div')
    trainerDiv.classList.add('card')
    trainerDiv.dataset.id = `${trainer.id}`
    
    const trainerMain = document.querySelector('main')
    const trainerP = document.createElement('p')
    trainerP.innerText = `${trainer.name}`
    
    trainerMain.appendChild(trainerDiv)
    
    const addButton = document.createElement('button')
    const pokemonUl = document.createElement('ul')
    
    addButton.innerText = "Add Pokemon"
    addButton.dataset.trainerId = trainer.id
    addButton.addEventListener("click", (event) => addPokemon(event, trainer))

    trainerDiv.appendChild(addButton)
    trainerDiv.append(trainerP, pokemonUl)
    
    trainer.pokemons.forEach(pokemon => renderPokemon(pokemon, pokemonUl, trainer))
}
    
function renderPokemon(pokemon, pokemonUl, trainer){
    
    const pokemonLi = document.createElement('li')
    pokemonUl.appendChild(pokemonLi)
    pokemonLi.innerText = `${pokemon.nickname} (${pokemon.species})` 
    
    const releaseButton = document.createElement('button')
    releaseButton.classList.add('release')
    releaseButton.dataset.pokemonId = pokemon.id
    releaseButton.innerText = 'Release'
    
    pokemonLi.appendChild(releaseButton)
    releaseButton.addEventListener("click", (event)=> releasePokemon(event, pokemonLi))        
}
    
function addPokemon(event, trainer) {
    let pokeUl = event.target.parentNode.querySelector('ul')
    let trainerId = event.target.dataset.trainerId 
    let data = { trainer_id: trainerId } // trainer_id is nice here because Ruby expects snakecase 

    if (event.target.parentNode.querySelectorAll('li').length < 6) { 
        fetch(POKEMONS_URL, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json' // always required for post and patch? 
                // accept is only required when the API/server specifies it 
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(poke => renderPokemon(poke, pokeUl, trainer)) // "wrapped" renderPokemon in an anonymous function
        } else {
            alert("You already have six Pokemons, friend. To add a new one, you're going to have to release a Pokemon.")
    }   
}
        
        
        
function releasePokemon(event, pokemonLi) {
    fetch(`${POKEMONS_URL}/${event.target.dataset.pokemonId}`, {
        method: "DELETE"})
        .then(res => res.json())
        .then(() => pokemonLi.remove())
}
    
const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
    
    
    