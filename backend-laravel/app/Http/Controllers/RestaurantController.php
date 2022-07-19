<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Restaurant;
use App\Models\Review;
use App\Models\Location;
use App\Models\Collection;

class RestaurantController extends Controller
{

    public function getRestaurants($id = null)
    {
        if($id != null){
            $restaurants = Restaurant::find($id);
            $restaurants -> location_name = Location::find($restaurants->location_id)->city;
        }
        else{
            $location = [];
            $restaurants = Restaurant::all();
            foreach ($restaurants as $restaurant) {
                $restaurant -> location_name = Location::find($restaurant->location_id)->city;
            }
        }

        if(!isset($restaurants)){
            return response()->json(['data' => 'Not Found!'], 404);
        }

        return response()->json([
            "status" => "Success",
            "restaurants" => $restaurants,
        ], 200);
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

    public function getCollections()
    {
        $collections = Collection::all();

        if(!isset($collections)){
            return response()->json(['data' => 'Not Found!'], 404);
        }

        return response()->json([
            "status" => "Success",
            "collections" => $collections
        ], 200);
    }

    public function getRestaurantsByCollection($id)
    {
        $restaurants = Restaurant::where('restaurants.collection_id','=',$id)->get();  
        foreach ($restaurants as $restaurant) {
            $restaurant -> location_name = Location::find($restaurant->location_id)->city;
        }

        if(!isset($restaurants)){
            return response()->json(['data' => 'Not Found!'], 404);
        }

        return response()->json([
            "status" => "Success",
            "restaurants" => $restaurants
        ], 200);


    }
}
