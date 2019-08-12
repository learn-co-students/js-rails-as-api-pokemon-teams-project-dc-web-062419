
function fetchTrainers(){
    fetch(TRAINERS_URL)
    .then(res => res.json())
    .then( trainer => trainer.forEach(renderTrainer))

}

function renderTrainer(){

}