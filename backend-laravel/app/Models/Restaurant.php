<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Restaurant extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'description',
        'capacity',
        'image',
        'location_id'
    ];

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
        return $this->belongsTo(Location::class);
    }

    public function collection()
    {
        return $this->belongsTo(Collection::class);
    }
}
