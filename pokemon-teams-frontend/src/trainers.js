
function fetchTrainers(){
    fetch(TRAINERS_URL)
    .then(res => res.json())
    .then( trainer => trainer.forEach(renderTrainer))

}

function renderTrainer(trainer){
    const trainerDiv = document.createElement("div");
    trainerDiv.classList.add("card");
    console.log(trainerDiv)
    const main = document.querySelector("main")
    main.appendChild(trainerDiv)
    const trainerP = document.createElement("p")
    trainerDiv.appendChild(trainerP)
    trainerP.innerText = trainer.name
    const addButton = document.createElement("button")
    trainerDiv.appendChild(addButton)
    addButton.innerText = "Add Pokemon"

    //ul for trainers pokemons
    const trainerUl = document.createElement("ul")
    trainerDiv.appendChild(trainerUl)
    trainer.pokemons.forEach( function(pokemon){
        renderPokemons(pokemon, trainerUl)
    })
}

function renderPokemons(pokemon, trainerUl){
    const pokemonLi = document.createElement("li")
    trainerUl.appendChild(pokemonLi)
    pokemonLi.innerText = `${pokemon.nickname} (${pokemon.species})`
    const releaseButton = document.createElement("button")
    pokemonLi.appendChild(releaseButton)
    releaseButton.classList.add("release")
    releaseButton.innerText = "Release"
}

