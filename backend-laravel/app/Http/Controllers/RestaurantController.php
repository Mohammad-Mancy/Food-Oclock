<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Restaurant;
use App\Models\Review;
use App\Models\Location;
use App\Models\Collection;
use App\Models\User;
use App\Models\Reservation;
use Validator;

class RestaurantController extends Controller
{

    public function getRestaurants($id = null)
    {
        if($id != null){
            $restaurants = Restaurant::find($id);
            $restaurants -> longitude = Location::find($restaurants->location_id)->longitude;
            $restaurants -> latitude = Location::find($restaurants->location_id)->latitude;
            $restaurants -> cuisine = Collection::find($restaurants->collection_id)->name;
        }
        else{
            $location = [];
            $restaurants = Restaurant::all();
            foreach ($restaurants as $restaurant) {
                $restaurant -> longitude = Location::find($restaurant->location_id)->longitude;
                $restaurant -> latitude = Location::find($restaurant->location_id)->latitude;
                $restaurant -> cuisine = Collection::find($restaurant->collection_id)->name;
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
            $restaurant -> longitude = Location::find($restaurant->location_id)->longitude;
            $restaurant -> latitude = Location::find($restaurant->location_id)->latitude;
            $restaurant -> cuisine = Collection::find($restaurant->collection_id)->name;
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
        foreach ($restaurants as $restaurant) {
            $restaurant -> longitude = Location::find($restaurant->location_id)->longitude;
            $restaurant -> latitude = Location::find($restaurant->location_id)->latitude;
            $restaurant -> cuisine = Collection::find($restaurant->collection_id)->name;
        }
        return response()->json([
            "status" => "Success",
            "restaurants" => $restaurants
        ], 200);
    }

    public function reserve(Request $request)
    {
        if(auth()->user()){

            $validator = Validator::make($request->only('email','password'), [
                'email' => 'required|email',
                'password' => 'required|string|min:6',
            ]);
            if ($validator->fails()) {
                return response()->json($validator->errors(), 422);
            }
            if (! $token = auth()->attempt($validator->validated())) {
                return response()->json(['error' => 'wrong email or password'], 401);
            }
            
            $reservation = new Reservation;
            $reservation->note = $request->note;
            $reservation->number_of_guest = $request->number_of_guest;
            $reserve_date = date('Y-m-d', strtotime($request->reservation_date));
            $reservation->reservation_date = $reserve_date;
            $reservation->user_id = $request->user_id;
            $reservation->restaurant_id = $request->restaurant_id;
            $reservation->save();

            return response()->json([
                "status" => "Success",
                'reservation' => $reservation
            ], 200);

        }else{
            return response()->json(['error' => 'Unauthorized'],401);
        }

    }
}
