<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Restaurant;
use App\Models\Review;

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

    public function addReview(Request $request)
    {
        if(auth()->user()){

            $review = new Review;
            $review->rate = $request->rate;
            $review->description = $request->description;
            $review->status = 0;
            $review->user_id = $request->user_id;
            $review->restaurant_id = $request->restaurant_id;
            $review->save();
                
            return response()->json([
                "status" => "Success"
            ], 200);
        }
        else
        {
            return response()->json(['error' => 'Unauthorized'],401);
        }
    }
}
