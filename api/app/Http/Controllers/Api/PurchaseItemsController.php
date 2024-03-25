<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PurchaseItemsMP;
use Illuminate\Http\Request;

class PurchaseItemsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $purchases = PurchaseItemsMP::all();
        return $purchases;
    }


    public function store(Request $request)
    {
        $purchase = new PurchaseItemsMP();
        $purchase->product = $request->product;
        $purchase->design = $request->design;
        $purchase->client = $request->client;
        $purchase->stock = $request->stock;
        $purchase->saleschannel = $request->saleschannel;
        $purchase->methodpay = $request->methodpay;
        $purchase->price = $request->price;
        $purchase->date = $request->date;
        $purchase->description = $request->description;
        
        $sale->save();
    }


    public function show(string $id)
    {
        $purchase = PurchaseItemsMP::find($id);
        return $purchase;
    }


    public function update(Request $request, string $id)
    {
        $purchase = PurchaseItemsMP::findOrFail($id);
        $purchase->product = $request->product;
        $purchase->design = $request->design;
        $purchase->client = $request->client;
        $purchase->stock = $request->stock;
        $purchase->saleschannel = $request->saleschannel;
        $purchase->methodpay = $request->methodpay;
        $purchase->price = $request->price;
        $purchase->date = $request->date;
        $purchase->description = $request->description;
        
        $purchase->save();
        return $purchase;
    }

    public function destroy(string $id)
    {
        $purchase = PurchaseItemsMP::destroy($id);
        return $purchase;
    }
}
