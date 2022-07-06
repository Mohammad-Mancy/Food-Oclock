<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\RestaurantController;
use App\Http\Controllers\AdminController;

Route::group(['prefix' => 'v1'], function(){
    
    Route::group(['middleware' => 'api','prefix' => 'auth'], function ($router) {
        
        Route::post('/login', [AuthController::class, 'login']);//login user and admin

        Route::group(['prefix' => 'user'], function(){

            Route::post('/register', [AuthController::class, 'register']);
            Route::post('/logout', [AuthController::class, 'logout']);
            Route::post('/refresh', [AuthController::class, 'refresh']);

            Route::get('/user-profile', [AuthController::class, 'userProfile']);

        });

        Route::group(['prefix' => 'restaurant'], function(){

            Route::post('/add-review', [RestaurantController::class, 'addReview']);

            Route::get('/get-all-restaurants',[RestaurantController::class,'getRestaurants']); 
            Route::get('/all-approved-reviews/{id}',[RestaurantController::class,'getApprovedReviews']);

        });

        Route::group(['prefix' => 'admin'], function(){

            Route::post('/add-restaurant',[AdminController::class,'addRestaurant']); 
            Route::post('/add-collection',[AdminController::class,'addCollection']); 

        });
    });
});