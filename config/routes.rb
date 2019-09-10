Rails.application.routes.draw do
  devise_for :users
  root 'message#index'
  resources :users, only: [:edit, :update]
end
