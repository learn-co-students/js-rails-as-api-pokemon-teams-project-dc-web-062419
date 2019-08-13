class TrainersController < ApplicationController

    def index
        trainers = Trainer.all
        render json: trainers.to_json(trainer_serializer_options)
    end 

    private

    def trainer_serializer_options()
        { :include => {
            :pokemons => {
                :except => [:trainer_id, :created_at, :updated_at]
            } 
        }, :except => [:created_at, :updated_at] 
        }
    end

end
