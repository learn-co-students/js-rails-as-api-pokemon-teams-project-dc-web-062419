class PokemonsController < ApplicationController

    def index
        pokemons = Pokemon.all
        
        render json: pokemons.to_json(pokemon_options)
    end

    def show
        pokemon = Pokemon.find(params[:id])
        render json: pokemon.to_json(pokemon_options)
    end

    def create
        tId = pokemon_params[:trainer_id].to_i
        pokemon = Pokemon.create(
            nickname: Faker::Name.first_name,
            species: Faker::Games::Pokemon.name,
            trainer_id: tId
        )
        render json: pokemon.to_json(pokemon_options)
    end

    def destroy
        pokemon = Pokemon.find(params[:id]).destroy
        render json: pokemon
    end

    private

    def pokemon_params
        params.require(:pokemon).permit(:nickname, :species, :trainer_id)
    end

    def pokemon_options
        {:include =>  {
            :trainer => {:only => [:name]}
        },
        :except => [:updated_at, :created_at, :trainer_id]}
    end

end
