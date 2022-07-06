<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::group(['prefix' => 'v1'], function(){
    
    Route::group(['middleware' => 'api','prefix' => 'auth'], function ($router) {
        
        Route::post('/login', [AuthController::class, 'login']);//login user and admin

        Route::group(['prefix' => 'user'], function(){

            Route::post('/register', [AuthController::class, 'register']);
            Route::post('/logout', [AuthController::class, 'logout']);
            Route::post('/refresh', [AuthController::class, 'refresh']);
            Route::get('/user-profile', [AuthController::class, 'userProfile']);  

        });


    });
});