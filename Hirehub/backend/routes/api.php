<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\Task_2_Controller;
use App\Http\Controllers\TaskController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
  return $request->user();
});

  Route::post('/CreateUser', [AuthController::class, 'User_Register']);
  Route::get('/ReSendEmail/{username}', [AuthController::class, 'resend_email']);
  Route::post('/Verification/{username}', [AuthController::class, 'verification']);

  Route::post('/CreateCompany/{username}', [AuthController::class, 'create_company']);
  Route::post('/CreateEmployee/{username}', [AuthController::class, 'create_employee']);
  Route::post('/Login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {

  Route::get('/Logout', [AuthController::class, 'logout']);
  Route::post('/CreatePost', [PostController::class, 'create_post']);
  Route::post('/EditPost/{postID}', [PostController::class, 'edit_post']);
  Route::get('/DeleteCompanyPost/{postID}', [PostController::class, 'delete_post']);
  Route::post('/CreateCV', [TaskController::class, 'create_cv']);
  Route::get('/showCV', [TaskController::class, 'show_cv']);
  Route::get('/ShowPostsDomain', [PostController::class, 'show_with_domain']);
  Route::get('/ShowPostsCompany', [PostController::class, 'show_company_post']);
  Route::get('/ShowPostsDetails/{id}', [PostController::class, 'show_post_details']);

  Route::get('/ShowCompanyfollowed', [PostController::class, 'show_company_followed']);
  Route::get('/ShowAllCompanyDetails/{companyID}', [PostController::class, 'show_all_company_details']);
  Route::get('/Follow/{companyID}', [TaskController::class, 'follow']);
  //Route::get('/UnFollow/{companyID}', [Task_2_Controller::class, 'un_follow']);

  Route::post('/Search', [TaskController::class, 'search']);
  Route::post('/EditCV', [TaskController::class, 'edit_cv']);
  Route::get('/ShowProfile', [TaskController::class, 'show_profile']);
  Route::post('/EditProfile', [TaskController::class, 'edit_profile']);
  Route::post('/AddToWallet', [TaskController::class, 'add_to_wallet']);

  Route::get('/AddToFavourite/{postID}', [Task_2_Controller::class, 'save_post']);
  Route::get('/DeleteFromFavourite/{postID}', [Task_2_Controller::class, 'un_favourite']);
  Route::get('/ShowFavourite', [Task_2_Controller::class, 'show_favourite']);

  Route::get('/SubmitToPost/{posyID}', [Task_2_Controller::class, 'submit']);
  Route::get('/ShowSubmitter/{posyID}', [Task_2_Controller::class, 'show_submitter']);
  Route::get('/ShowSubmitterCV/{employeeID}', [Task_2_Controller::class, 'show_submitter_cv']);
  
  Route::get('/Report/{postID}', [Task_2_Controller::class, 'report']);

  //notifications
  Route::get('/Notifications', [Task_2_Controller::class, 'notifications']);
  Route::get('/NewNotifications', [Task_2_Controller::class, 'new_notifications']);

  //Admin tasks:
  Route::get('/BlockCompany/{companyID}', [AdminController::class, 'block_user']);
  //Route::get('/UnBlockCompany/{companyID}', [AdminController::class, 'un_block_user']);
  Route::get('/ShowReportedPost', [AdminController::class, 'show_reported_post']);
  Route::get('/ShowReportedPostDetails/{id}', [AdminController::class, 'details']);
  Route::get('/ShowAllCompanies', [AdminController::class, 'all_companies']);
  Route::get('/ShowCompanyDetails/{companyID}', [AdminController::class, 'show_company']);
  Route::get('/DeletePost/{postID}', [AdminController::class, 'delete']);
  Route::get('/ShowAllPosts', [AdminController::class, 'all_posts']);
  //domain
  Route::get('/ShowAllDomains', [AdminController::class, 'view_domains']);
  Route::post('/AddDomain', [AdminController::class, 'add_domain']);


});
