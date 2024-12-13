class RatingsController < ApplicationController
    wrap_parameters format: []

    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

    def destroy
        rating = current_user.ratings.find_by(id: params[:id])
        if rating
            rating.destroy
            head :no_content
        end
    end

    def rating
        rating = Rating.create!(rating_params.merge!({'user_id': current_user.id}))
        render json: activity, status: :created
    end

    def update
        rating = current_user.ratings.find_by(id: params[:id])
        if rating
            rating.update!(rating_params)
            render json: rating, status: :accepted
        end
    end

    private

    def current_user
        User.find_by(id: session[:user_id])
    end

    def rating_params
        params.permit(:category, :rating, :time)
    end

    def render_unprocessable_entity_response(invalid)
        render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end

    def render_not_found_response
        render json: { error: "Rating not found" }, status: :not_found
    end
end
