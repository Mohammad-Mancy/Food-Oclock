<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Restaurant;
use App\Models\Collection;
use App\Models\Location;
use App\Models\Review;
use app\Models\User;

class AdminController extends Controller
{
    
   public function __construct()
   {
       $this->middleware('checkUserType');
   }

    public function addRestaurant(Request $request)
    {
        if(auth()->user()){
            
            $location = new Location;
            $location->latitude = $request->latitude;
            $location->longitude = $request->longitude;
            $location->city = $request->city;
            $location->save();
            $location_id = $location->id; // Get back the id after genarating it
            
            $restaurant = new Restaurant;
            $restaurant->name = $request->name;
            $restaurant->description = $request->description;
            $restaurant->location_id = $location_id;
            $restaurant->capacity = $request->capacity;
            $restaurant->rate = 0; // if 0 then in frontend make it "new"
            $restaurant->image = $request->image;
            $restaurant->collection_id = $request->collection_id;
            $restaurant->save();
    
            return response()->json([
                "status" => "Success"
            ], 200);
        }
        else
        {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
    }

    public function addCollection(Request $request)
    {
        if(auth()->user()){
            $collection = new Collection;
            $collection->name = $request->name;
            $collection->image = $request->image;
            $collection->save();

            return response()->json([
                "status" => "Success"
            ], 200);
        }
        else
        {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
    }

    public function getOnProgressReviews(Request $request)
    {
        if(auth()->user()){

            $reviews = Review::Where('status', '=', 0)->get();
            foreach ($reviews as $review) {
                $review -> user_name = User::find($review->user_id)->name;
                $review -> restaurant_name =Restaurant::find($review->restaurant_id)->name;
            }
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

    public function approveReview(Request $request)
    {
        if(auth()->user()){

            $review = Review::find($request->id);
            $review->status = 1;
            $review->save();

            return response()->json([
                "status" => "Success",
            ], 200);
        }
        else
        {
            return response()->json(['error' => 'Unauthorized'],401);
        }
    }

    public function rejectReview(Request $request)
    {
        if(auth()->user()){
            
            $review = Review::find($request->id);
            $review->delete();

            return response()->json([],204);
        }
        else
        {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
    }

    public function deleteRestaurant(Request $request)
    {
        if(auth()->user()){

            $restaurant = Restaurant::find($request->id);
            $restaurant->delete();

            return response()->json([],204);
        }
        else
        {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
    }

    public function updateRestaurant(Request $request)
    {
        if(auth()->user()){

            $restaurant = Restaurant::find($request->id);
            $restaurant->update($request->except('id', 'type','logitude','latitude','city'));    
            $restaurant->location()->update($request->only('logitude','latitude','city'));

            return response()->json([],204);
        }
        else
        {
            return response()->json(['error' => 'Unauthorized'], 401);
        }        
    }

    public function getUsers(Request $request)
    {
        if(auth()->user()){

            $users = User::where('type','=',0)->get();

            return response()->json([
            "status" => "Success",
            "users" => $users
            ], 200);
        }
        else
        {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
    }

    public function deleteUserAccount(Request $request)
    {
        if(auth()->user()){
            
            $user = User::find($request->id);
            $user->delete();

            return response()->json([],204);
        }
        else
        {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
    }
}
