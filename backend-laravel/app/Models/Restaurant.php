<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Restaurant extends Model
{
    use HasFactory;

    public function reviews()
    {
        return $this->hasMany(Review::class);
    } 
    
    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }

    public function location()
    {
        return $this->hasOne(Location::class);
    }
}
