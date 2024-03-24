<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Design;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        /* $products = Product::all();
        return $products; */

        $products = Product::with('designs')->get();
        return $products;
    }

    public function store(Request $request)
    {
         $product = new Product();
         $product->product = $request->product;
         $product->save();

        // Verificar si se proporciona un diseño en la solicitud
        if ($request->has('design')) {
            $design = new Design();
            $design->design = $request->design;
            $design->stock = $request->stock;
            $design->description = $request->description;
            $design->price = $request->price;

            $product->designs()->save($design);
        }
        
        return $product;
    }

    public function show(string $id)
    {
        $product = Product::with('designs')->find($id);
        return $product;
    }

    public function update(Request $request, string $id)
    {
        $product = Product::findOrFail($id);
        $product->product = $request->product;
        $product->save();

        // Verificar si se proporciona un diseño en la solicitud
        if ($request->has('design')) {
            $design = $product->designs->first();
            if (!$design) {
                $design = new Design();
                $design->product_id = $product->id; // Asignar el ID del producto al diseño
            }
            $design->design = $request->design;
            $design->stock = $request->stock;
            $design->description = $request->description;
            $design->price = $request->price;
            $design->save();
        }

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
