<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Design extends Model
{
    use HasFactory;
    protected $fillable = ['design', 'description', 'price', 'stock'];
    
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
