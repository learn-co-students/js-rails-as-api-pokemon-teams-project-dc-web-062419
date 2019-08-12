class PokemonsController < ApplicationController
    def index
        pokemons = Pokemon.all 
        render json: pokemons.to_json(pokemon_serializer_options) 
    end

    def create
        trainer = Trainer.find(params[:trainer_id])
        if trainer.pokemons.length < 6
            pokemon = Pokemon.create(nickname: Faker::Name.first_name,
            species: Faker::Games::Pokemon.name,
            trainer_id: params[:trainer_id])
            render json: pokemon.to_json(pokemon_serializer_options)
        else
            render json:  pokemon.to_json(pokemon_serializer_options)
        end
    end

    def destroy
        pokemon = Pokemon.find(params[:id])
        pokemon.destroy
        render json: pokemon.to_json(pokemon_serializer_options)
    end

    private

    def pokemon_serializer_options()
        { :except => [:created_at, :updated_at]}
    end
end
