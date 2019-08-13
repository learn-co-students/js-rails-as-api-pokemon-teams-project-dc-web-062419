class PokemonsController < ApplicationController

    # def index
    #     pokemons = Pokemon.all 
    #     render json: pokemons.to_json(pokemon_serializer_options) 
    # end

    def create
        pokemon = Pokemon.create(
            nickname: Faker::Name.first_name,
            species: Faker::Games::Pokemon.name,
            trainer_id: pokemon_params[:trainer_id]
        )
        render json: pokemon 
    end

        # trainer = Trainer.find(params[:trainer_id])


        # if trainer.pokemons.length < 6
        #     pokemon = Pokemon.create(nickname: Faker::Name.first_name,
        #     species: Faker::Games::Pokemon.name,
        #     trainer_id: params[:trainer_id])
        #     render json: pokemon.to_json(pokemon_serializer_options)
        # else
        #     render json:  pokemon.to_json(pokemon_serializer_options)
        # end

    def destroy
        pokemon = Pokemon.find(params[:id])
        pokemon.destroy
        render json: pokemon # we do this here for the pessimistic rendering
    end

    private

    def pokemon_serializer_options()
        { :except => [:created_at, :updated_at] }
    end

    def pokemon_params
        params.require(:pokemon).permit(:trainer_id)
    end
end
