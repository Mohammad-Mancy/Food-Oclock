<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Restaurant;
use App\Models\Review;
use App\Models\Location;
use App\Models\Collection;
use App\Models\User;

class RestaurantController extends Controller
{

    public function getRestaurants($id = null)
    {
        if($id != null){
            $restaurants = Restaurant::find($id);
            $restaurants -> longitude = Location::find($restaurants->location_id)->longitude;
            $restaurants -> latitude = Location::find($restaurants->location_id)->latitude;
        }
        else{
            $location = [];
            $restaurants = Restaurant::all();
            foreach ($restaurants as $restaurant) {
                $restaurant -> longitude = Location::find($restaurant->location_id)->longitude;
                $restaurant -> latitude = Location::find($restaurant->location_id)->latitude;
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
        $reviews = Review::where('restaurant_id', '=', $id)->Where('status', '=', 1)->get();
        foreach ($reviews as $review) {
            $user = User::find($review->user_id);
            $review -> user_name = $user->name;
            $review -> user_image = $user->image;
        }
        return response()->json([
            "status" => "Success",
            "reviews" => $reviews
        ], 200);
    }

    public function getCollections($id = null)
    {
        if($id != null){
            $collections = Collection::find($id);
        }else{
            $collections = Collection::all();
        }

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

    public function getTrendRestaurants ()
    {
        $restaurants = Restaurant::where('restaurants.trend', '=', 1)->get();
        return response()->json([
            "status" => "Success",
            "restaurants" => $restaurants
        ], 200);
    }
}
