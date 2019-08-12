class TrainersController < ApplicationController

    def index 
       render json: Trainer.all.to_json(trainer_serializer_options)
    end

    private 

    def trainer_serializer_options()
        {
            :include => {
                :pokemons => {
                    :except => [:created_at, :updated_at]
                }
            },
            :except => [:created_at, :updated_at]
        }

    end
end
