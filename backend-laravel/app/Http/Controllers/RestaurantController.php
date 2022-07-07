<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Restaurant;
use App\Models\Review;

class RestaurantController extends Controller
{

    public function getRestaurants($id = null)
    {
        if(auth()->user()){

            if($id != null){
                $restaurants = Restaurant::find($id);
            }
            else{
                $restaurants = Restaurant::all();
            }

            if(!isset($restaurants)){
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

    public function getApprovedReviews($id = null)
    {
        if(auth()->user()){

            $reviews = Review::where('restaurant_id', '=', $id)->Where('status', '=', 1)->get();
            return response()->json([
                "status" => "Success",
                "reviews" => $reviews
            ], 200);
        }
        else
        {
            return response()->json(['error' => 'Unauthorized'],401);
        }
    }
}
