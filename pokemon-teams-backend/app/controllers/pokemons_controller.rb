class PokemonsController < ApplicationController
    

    def index
        render json:  Pokemon.all.to_json(pokemon_serializer_options)
    end

    def create
        # byebug
        pokemon = Pokemon.create(
            nickname: Faker::Name.first_name,
            species: Faker::Games::Pokemon.name,
            trainer_id: params["trainer_id"].to_i)
    end

    private

    def pokemon_serializer_options
        {
        :except => [:created_at, :updated_at]
        }
    end


end
