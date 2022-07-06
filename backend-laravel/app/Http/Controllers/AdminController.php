<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Restaurant;
use App\Models\Collection;

class AdminController extends Controller
{
    
   public function __construct()
   {
       $this->middleware('checkUserType');
   }

    public function addRestaurant(Request $request)
    {
        if(auth()->user()){

            $restaurant = new Restaurant;
            $restaurant->name = $request->name;
            $restaurant->description = $request->description;
            $restaurant->location_id = $request->location_id;
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
}
