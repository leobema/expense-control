<?php
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\SaleController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

 Route::resource('products', ProductController::class)->only([
    'index', 'store', 'show', 'update', 'destroy'
]);

Route::post('/products/{id}/design', [ProductController::class, 'storeDesign']);

Route::resource('sales', SaleController::class)->only([
    'index', 'store', 'show', 'update', 'destroy'
]); 
