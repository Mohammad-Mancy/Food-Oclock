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

            Route::get('/get-restaurants/{id?}',[RestaurantController::class,'getRestaurants']); 
            Route::get('/all-approved-reviews/{id}',[RestaurantController::class,'getApprovedReviews']);
            Route::get('/get-collections',[RestaurantController::class,'getCollections']);
            Route::get('/get-restaurants-by-collection/{id}',[RestaurantController::class,'getRestaurantsByCollection']); 

        });

        Route::group(['prefix' => 'admin'], function(){

            Route::post('/add-restaurant',[AdminController::class,'addRestaurant']); 
            Route::post('/add-collection',[AdminController::class,'addCollection']);
            Route::post('/all-on-progress-reviews',[AdminController::class,'getOnProgressReviews']);//sending the admin type using body
            Route::post('/get-users', [AdminController::class, 'getUsers']);

            Route::put('/approve-review', [AdminController::class, 'approveReview']);
            Route::put('/update-restaurant', [AdminController::class, 'updateRestaurant']);

            Route::delete('/reject-review', [AdminController::class, 'rejectReview']);
            Route::delete('/delete-restaurant', [AdminController::class, 'deleteRestaurant']);

        });
    });
});