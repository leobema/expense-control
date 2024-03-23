<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::all();
        return $products;
    }

    public function store(Request $request)
    {
         $product = new Product();
         $product->product = $request->product;
         $product->design = $request->design;
         $product->price = $request->price;
         $product->stock = $request->stock;
         $product->description = $request->description;
         
         $product->save();
    }

    public function show(string $id)
    {
        $product = Product::find($id);
        return $product;
    }

    public function update(Request $request, string $id)
    {
        $product = Product::findOrFail($request->id);
        $product->product = $request->product;
        $product->design = $request->design;
        $product->price = $request->price;
        $product->stock = $request->stock;
        $product->description = $request->description;

        $product->save();
        return $product;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $product = Product::destroy($id);
        return $product;
    }
}
