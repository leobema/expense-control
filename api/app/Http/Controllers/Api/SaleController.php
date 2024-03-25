<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Sale;
use Illuminate\Http\Request;

class SaleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $sales = Sale::all();
        return $sales;
    }

    
    public function store(Request $request)
    {
         $sale = new Sale();
         $sale->product = $request->product;
         $sale->design = $request->design;
         $sale->client = $request->client;
         $sale->stock = $request->stock;
         $sale->saleschannel = $request->saleschannel;
         $sale->methodpay = $request->methodpay;
         $sale->price = $request->price;
         $sale->date = $request->date;
         $sale->description = $request->description;
         
         $sale->save();
    }

   
    public function show(string $id)
    {
        $sale = Sale::find($id);
        return $sale;
    }

    
    public function update(Request $request, string $id)
    {
         $sale = Sale::findOrFail($id);
         $sale->product = $request->product;
         $sale->design = $request->design;
         $sale->client = $request->client;
         $sale->stock = $request->stock;
         $sale->price = $request->price;
         $sale->saleschannel = $request->saleschannel;
         $sale->methodpay = $request->methodpay;
         $sale->date = $request->date;
         $sale->description = $request->description;
         
         $sale->save();
         return $sale;
    }

    
    public function destroy(string $id)
    {
        $sale = Sale::destroy($id);
        return $sale;
    }
}
