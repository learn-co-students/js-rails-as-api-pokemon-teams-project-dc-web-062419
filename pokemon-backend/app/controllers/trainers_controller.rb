class TrainersController < ApplicationController

    def index
        trainers = Trainer.all
        render json: trainers.to_json(trainer_options)
    end

    def show
        trainer = Trainer.find(params[:id])
        render json: trainer.to_json(trainer_options)
    end

    private

    def trainer_options
        {:include => {:pokemons => {:only => [:nickname, :species, :id]}},
        :except => [:updated_at, :created_at]
        }
    end
end
