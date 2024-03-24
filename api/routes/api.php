<?php
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\SaleController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

/*      Route::controller(ProductController::class)->group(function (){
    //Route::get('/products', 'index');
    Route::get('/products', [ProductController::class, 'index']);
    Route::post('/product', 'store');
    Route::post('/product/{id}/design', 'storeDesgin');
    Route::get('/product/{id}', 'show');
    Route::put('/product/{id}', 'update');
    Route::delete('/product/{id}', 'destroy');
});

Route::controller(SaleController::class)->group(function (){
    Route::get('/sales', 'index');
    Route::post('/sale', 'store');
    Route::get('/sale/{id}', 'show');
    Route::put('/sale/{id}', 'update');
    Route::delete('/sale/{id}', 'destroy');
});  */

 Route::resource('products', ProductController::class)->only([
    'index', 'store', 'show', 'update', 'destroy'
]);

Route::post('/products/{id}/design', [ProductController::class, 'storeDesign']);

Route::resource('sales', SaleController::class)->only([
    'index', 'store', 'show', 'update', 'destroy'
]); 
