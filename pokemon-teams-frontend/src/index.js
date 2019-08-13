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
    div.innerHTML = `<div class="card" data-id='${trainer.id}'><p>${trainer.name}</p>
        <button data-trainer-id="${trainer.id}">Add Pokemon</button>    
        <ul id="pokemons "></ul>
        </div>`
    let addButton = div.querySelector("button")   
    addButton.addEventListener("click", addPokemon) 
    main.appendChild(div)
    let pokemonArray = trainer.pokemons
    pokemonArray.forEach(renderPokemon)

    function renderPokemon(pokemon){
        let li = document.createElement("li")
        let button = document.createElement("button")
        button.classList.add("release")
        button.dataset.pokemon_id=`${pokemon.id}`
        button.innerText= "Release"
        button.addEventListener("click", releasePokemon)
        let list = div.querySelector("ul")
        li.innerText= `${pokemon.nickname} (${pokemon.species})`
        li.appendChild(button)
        
        list.appendChild(li)

    }

    function releasePokemon(event){
        let id = event.target.dataset.pokemon_id
        fetch(`http://localhost:3000/pokemons/${id}`, {
            method: "DELETE"
        }).then(response => response.json())
        .then(releasedPokemon => {
            event.target.parentElement.remove()
            console.log("remove?", releasedPokemon)
        })
    }

    function addPokemon(event) {
        // debugger
       let data = {
           trainer_id: event.target.dataset.trainerId,
        }
        fetch("http://localhost:3000/pokemons", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        // .then(response => console.log(response))
        .then(data => {
            if (data['message']) 
                alert("TOO MANNNNNNNYYYY")
            else
                renderPokemon(data)
            }
        )
    }
}