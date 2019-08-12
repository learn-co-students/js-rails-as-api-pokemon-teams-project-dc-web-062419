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
        
        
        // add Pokemon button
        const addButton = document.createElement('button')
        addButton.innerText = "Add Pokemon"
        addButton.dataset.trainerId = `${trainer.id}`
        addButton.addEventListener("click", (event) => addPokemon(event, trainer))
        trainerDiv.appendChild(addButton)
        const pokemonUl = document.createElement('ul')
        trainerDiv.append(trainerP, pokemonUl)
        
        trainer.pokemons.forEach(pokemon => renderPokemon(pokemon, pokemonUl, trainer))
        
    }
    
    function renderPokemon(pokemon, pokemonUl, trainer){
        
        
    
        const pokemonLi = document.createElement('li')
        pokemonUl.appendChild(pokemonLi)
        pokemonLi.innerText = `${pokemon.nickname} (${pokemon.species})` 
        
        const releaseButton = document.createElement('button')
        releaseButton.classList.add('release')
        releaseButton.dataset.pokemonId = `${pokemon.id}`
        releaseButton.innerText = 'Release'
        
        pokemonLi.appendChild(releaseButton)
        releaseButton.addEventListener("click", (event)=> releasePokemon(event, trainer))
        
        
        
    }
    
    function addPokemon(event, trainer) {
        event.preventDefault()
        // debugger
        
        let pokeUl = event.target.parentNode.querySelector('ul')
        let trainerId = event.target.dataset.trainerId 
        let data = {trainer_id: trainerId}
        
        if (trainer.pokemons.length < 6){ 
            fetch(POKEMONS_URL, {
                method: "POST",
                headers: {
                    'content-type': 'application/json',
                    'accept': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(poke => {
                renderPokemon(poke, pokeUl, trainer)})
            }
            else{
                alert("Get outta here!")
            }
        }
        
        
        
        
        function releasePokemon(event, trainer) {
            
            // let pokeId = event.target.dataset.pokemonId
            
            fetch(`${POKEMONS_URL}/${event.target.dataset.pokemonId}`, {
            
                method: "DELETE"})
                .then(res => res.json())
                .then(deletedPokemon => {
                   
            event.target.parentElement.remove()
            
        })
        // debugger
        
    }
    
    const BASE_URL = "http://localhost:3000"
    const TRAINERS_URL = `${BASE_URL}/trainers`
    const POKEMONS_URL = `${BASE_URL}/pokemons`
    
    
    