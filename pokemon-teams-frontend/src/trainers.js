
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

    // current pokemon count
    trainerDiv.dataset.poke_count = trainer.pokemons.length

    // creating event listener for add button
    addButton.addEventListener("click", addPokemon)
    addButton.dataset.trainer_id = trainer.id

    trainerDiv.appendChild(addButton)
    addButton.innerText = "Add Pokemon"

    //ul for trainers pokemons
    const trainerUl = document.createElement("ul")
    trainerDiv.appendChild(trainerUl)
    trainer.pokemons.forEach( function(pokemon){
        renderPokemon(pokemon, trainerUl)
    })
}

function renderPokemon(pokemon, trainerUl){
    const pokemonLi = document.createElement("li")
    trainerUl.appendChild(pokemonLi)
    pokemonLi.innerText = `${pokemon.nickname} (${pokemon.species})`
    const releaseButton = document.createElement("button")
    pokemonLi.appendChild(releaseButton)
    releaseButton.classList.add("release")
    releaseButton.innerText = "Release"
}


function addPokemon(){
    event.preventDefault()

    let poke_count = parseInt(event.target.parentElement.dataset.poke_count)
    if (poke_count <= 5){
        let data = {
            "trainer_id": parseInt(event.target.dataset.trainer_id)
        }
        let trainerUl = event.target.parentElement.querySelector("ul")
        postPokemon(data, trainerUl)
    }
    else{
        alert("You have no more pokeballs left")
    }
    
}

function postPokemon(data, trainerUl){
    fetch(POKEMONS_URL, {
        method: "POST",
        headers:{
            "Content-Type": "application/json",
            "Accept":"application/json"
        },
        body: JSON.stringify(data)
    }).then(res => res.json())
    .then(data => {
        renderPokemon(data, trainerUl)
    })

}

