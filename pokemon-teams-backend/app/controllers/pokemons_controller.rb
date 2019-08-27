class PokemonsController < ApplicationController


    def index
        render json:  Pokemon.all.to_json(pokemon_serializer_options)
    end

    def create
        #  byebug
        trainer_id = params["trainer_id"].to_i
        if (Trainer.find(trainer_id).pokemons.count < 6)
            pokemon = Pokemon.create(
                nickname: Faker::Name.first_name,
                species: Faker::Games::Pokemon.name,
                trainer_id: params["trainer_id"].to_i)
            render json: pokemon 
        else 
            # alert("Too many Pokemon, don't be greedy")
            render json: {
                message: "error"
            }
        end   
        
    end

    def destroy
        pokemon = Pokemon.find(params[:id])
        pokemon.destroy
        render json: pokemon
    end

    private

    def pokemon_serializer_options
        {
        :except => [:created_at, :updated_at]
        }
    end


end
