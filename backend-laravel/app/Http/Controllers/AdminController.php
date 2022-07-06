<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Restaurant;
use App\Models\Collection;
use App\Models\Location;
use App\Models\Review;

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
