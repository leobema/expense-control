<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Design extends Model
{
    use HasFactory;
    protected $fillable = ['design'];
    
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
