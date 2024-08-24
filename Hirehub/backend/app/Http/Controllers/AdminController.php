<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\Domain;
use App\Models\Post;
use App\Models\Report;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminController extends Controller
{

  public function block_user($CompanyID)
  {
    $company = Company::query()->where('id', $CompanyID)->first();
    $user = User::query()->where('id', $company['user_id'])->first();


    //unblock
    if($user['reporting_state'] == true){
      $update = User::query()->where('id', $user['id'])->update([
      'reporting_state' => false
    ]);

    if (isset($update)) {
      
      return response()->json([
        'message' => 'User had been unblocked Succeffuly.'
      ]);
    }

    return response()->json([
      'message' => 'Something went wrong..Please try again.'
    ]);
    }


    //block
    $update = User::query()->where('id', $user['id'])->update([
      'reporting_state' => true
    ]);

    if (isset($update)) {
      $user->tokens()->each(function($token){
        $token->delete();
      });
      return response()->json([
        'message' => 'User had been blocked Succeffuly.'
      ]);
    }

    return response()->json([
      'message' => 'Something went wrong..Please try again.'
    ]);
  }

  public function show_reported_post()
  {
    $report = Report::get();
    $count = Report::query()->count();

    $s = [];
    for ($i = 0; $i < $count; $i++) {
      $post = Post::where('id', $report[$i]->post_id)->first();
      $s[$i] = $post;
    }

    return response()->json([
      $s
    ]);
  }

  public function details($id)
  {
    $post = Post::query()->where('id', $id)->first();
    $count = Report::query()->where('post_id', $id)->count();
    return response()->json([
      $post,
      'Reports count' => $count
    ]);
  }

  public function all_companies()
  {
    $company = Company::query()->get();

    return response()->json([
      $company
    ]);
  }

  public function show_company($companyID)
  {
    $company = Company::query()->where('id', $companyID)->first();
    $post = Post::query()->where('company_id', $companyID)->get();
    $postCount = Post::query()->where('company_id', $companyID)->count();

    $user = User::where('id', $company['user_id'])->first();

    $number = 0;
    for ($i = 0; $i < $postCount; $i++) {
      $report = Report::query()->where('post_id', $post[$i]->id)->count();
      $number = $number + $report;
    }
    return response()->json([
      'Posts_count' => $postCount,
      'reports_count' => $number,
      $company,
      'company_status' => $user['reporting_state']
    ]);
  }

  public function delete($postID)
  {
    $post = Post::query()->where('id', $postID)->delete();

    return response()->json([
      'message' => 'Post has been deleted succeffuly'
    ]);
  }

  public function view_domains()
  {
    $domain = Domain::query()->get();

    return response()->json([
      $domain
    ]);
  }

  public function add_domain(Request $request)
  {
    $request->validate([   
      'domain' => 'required|unique:domains', 
    ]);

    $domain = Domain::query()->create([
      'domain' => $request['domain']
    ]);
    
    return response()->json([
      'massage' => 'new domain has been added successfully'
    ]);
  }
  public function all_posts()
  {
    $post = Post::query()->latest()->get();

    return response()->json([
      $post
    ]);
  }

}
