<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Restaurant;

class RestaurantController extends Controller
{

    public function getRestaurants()
    {
        if(auth()->user()){

            $restaurants = Restaurant::all();

            if($restaurants->isEmpty()){
                return response()->json(['data' => 'Not Found!'], 404);
            }

            return response()->json([
                "status" => "Success",
                "restaurants" => $restaurants
            ], 200);
        }
        else
        {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
    }
}
