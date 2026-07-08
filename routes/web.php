<?php

use App\Http\Controllers\YandrixaController;
use Illuminate\Support\Facades\Route;

Route::get('/', [YandrixaController::class, 'home'])->name('home');
Route::get('/about', fn () => app(YandrixaController::class)->section('about'))->name('about');
Route::get('/services', fn () => app(YandrixaController::class)->section('services'))->name('services');
Route::get('/work', fn () => app(YandrixaController::class)->section('work'))->name('work');
Route::get('/partners', fn () => app(YandrixaController::class)->section('partners'))->name('partners');
Route::post('/partners', [YandrixaController::class, 'submitPartner'])->name('partners.submit');
Route::get('/contact', fn () => app(YandrixaController::class)->section('contact'))->name('contact');
Route::post('/contact', [YandrixaController::class, 'submitContact'])->name('contact.submit');
Route::get('/privacy', fn () => app(YandrixaController::class)->section('privacy'))->name('privacy');
Route::get('/terms', fn () => app(YandrixaController::class)->section('terms'))->name('terms');
Route::get('/landing/{slug}', [YandrixaController::class, 'landingPage'])->name('landing.page');

Route::prefix('admin')->group(function (): void {
    Route::get('/login', [YandrixaController::class, 'adminLogin'])->name('admin.login');
    Route::post('/login', [YandrixaController::class, 'adminAuthenticate'])->name('admin.authenticate');
});

Route::prefix('admin')->middleware('yandrixa.admin')->group(function (): void {
    Route::get('/', [YandrixaController::class, 'adminDashboard'])->name('admin.dashboard');
    Route::post('/logout', [YandrixaController::class, 'adminLogout'])->name('admin.logout');
    Route::get('/profile', [YandrixaController::class, 'adminProfile'])->name('admin.profile');
    Route::get('/settings', [YandrixaController::class, 'adminSettings'])->name('admin.settings');
    Route::put('/settings', [YandrixaController::class, 'adminUpdateSettings'])->name('admin.settings.update');
    Route::get('/{module}', [YandrixaController::class, 'adminModule'])->name('admin.module');
    Route::get('/{module}/{id}', [YandrixaController::class, 'adminRecord'])->name('admin.record');
    Route::get('/{module}/{id}/edit', [YandrixaController::class, 'adminEdit'])->name('admin.edit');
    Route::put('/{module}/{id}', [YandrixaController::class, 'adminUpdate'])->name('admin.update');
    Route::post('/{module}/{id}/delete', [YandrixaController::class, 'adminDelete'])->name('admin.delete');
    Route::post('/{module}/{id}/restore', [YandrixaController::class, 'adminRestore'])->name('admin.restore');
    Route::delete('/{module}/{id}', [YandrixaController::class, 'adminPermanentDelete'])->name('admin.destroy');
});
