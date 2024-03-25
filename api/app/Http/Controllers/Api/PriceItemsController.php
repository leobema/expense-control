<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PriceItemsMP;
use Illuminate\Http\Request;

class PriceItemsController extends Controller
{

    public function index()
    {
        $prices = PriceItemsMP::all();
        return $prices;
    }


    public function store(Request $request)
    {
        $price = new PriceItemsMP();
         $price->name = $request->name;
         $price->price = $request->price;
         
         $price->save();
    }


    public function show(string $id)
    {
        $price = PriceItemsMP::find($id);
        return $price;
    }


    public function update(Request $request, string $id)
    {
         $price= PriceItemsMP::findOrFail($id);
         $price->name = $request->name;
         $price->price = $request->price;
         
         $price->save();
         return $price;
    }


    public function destroy(string $id)
    {
        $price = PriceItemsMP::destroy($id);
        return $price;
    }
}
