<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\Company_employee;
use App\Models\Domain;
use App\Models\Employee;
use App\Models\Employee_Notification;
use App\Models\Notification;
use App\Models\Post;
use App\Models\Report;
use App\Models\User;
use App\Models\Wallet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{

  public function create_post(Request $request)
  {

    $user = Auth::user();
    if ($user['user_type'] == 2) {
      return response()->json([
        'You are not allowed to add post'
      ]);
    }

    $request->validate([
      'salary' => 'required|numeric',
      'jop_description' => 'required',
      'work_type' => 'required',
      'work_time' => 'required',
      'requirements' => 'required',
      'experience_years' => 'required|numeric',
      'domain' => 'required',
      'location' => 'required'
    ]);

    $domain = Domain::query()->where('domain', $request['domain'])->first();
    $company = Company::query()->where('user_id', $user['id'])->first();
    $wallet = Wallet::query()->where('user_id', $user['id'])->first();
    $account = $wallet['account'];

    if ($account < 1000) {
      return response()->json([
        'massage' => 'you do not have enough money..please charge your wallet'
      ]);
    }

    $post = Post::query()->create([
      'salary' => $request['salary'],
      'jop_description' => $request['jop_description'],
      'work_type' => $request['work_type'],
      'work_time' => $request['work_time'],
      'requirements' => $request['requirements'],
      'experience_years' => $request['experience_years'],
      'domain_id' => $domain['id'],
      'company_id' => $company['id'],
      'company_Name' => $company['company_name'],
      'location' => $request['location']
    ]);

    $update = Wallet::query()->where('user_id', $user['id'])->update([
      'account' => $wallet['account'] - 1000
    ]);

    $AdminWallet = Wallet::query()->where('user_id', 1)->first();
    $updateAdmin = Wallet::query()->where('user_id', 1)->update([
      'account' => $AdminWallet['account'] + 1000
    ]);

    $domainNotification = Notification::query()->create([
      'company_id' => $company['id'],
      'post_id' => $post['id'],
      'message' => "New post same with your domain has been published",
      'message_type' => 'employee1'
    ]);
    
    $data1 = 'New post has been published by the company ';
    $data2 = $post['company_Name'];
    $message = $data1.$data2;

    $followNotification = Notification::query()->create([
      'company_id' => $company['id'],
      'post_id' => $post['id'],
      'message' => $message,
      'message_type' => 'employee2'
    ]);

    $employee = Employee::where('domain_id',$post['domain_id'])->get();
    $count = Employee::where('domain_id',$post['domain_id'])->count();

    for ($i = 0; $i < $count; $i++) {
    $employeeNotification1 = Employee_Notification::query()->create([
      'notification_id' => $domainNotification['id'],
      'employee_id' => $employee[$i]->id,
    ]);
    }
    $employee = Company_employee::where('company_id',$post['company_id'])->get();
    $count = Company_employee::where('company_id',$post['company_id'])->count();

    for ($i = 0; $i < $count; $i++) {
      $employeeNotification2 = Employee_Notification::query()->create([
        'notification_id' => $followNotification['id'],
        'employee_id' => $employee[$i]->employee_id,
      ]);
      }

    if (isset($post)) {
      return response()->json([
        'massage' => 'Post has been created successfully'
      ]);
    } else {
      return response()->json([
        'massage' => 'Post has not been created successfully'
      ]);
    }
  }

  public function edit_post($postID, Request $request)
  {

    $user = Auth::user();
    if ($user['user_type'] == 2) {
      return response()->json([
        'You are not allowed to edit post'
      ]);
    }

    $request->validate([
      'salary' => 'required|numeric',
      'jop_description' => 'required',
      'work_type' => 'required',
      'work_time' => 'required',
      'requirements' => 'required',
      'experience_years' => 'required|numeric',
      'domain' => 'required',
      'location' => 'required'
    ]);

    $company = Company::query()->where('user_id', $user['id'])->first();
    $domain = Domain::query()->where('domain', $request['domain'])->first();
    $update = Post::query()->where('id', $postID)->where('company_id', $company['id'])->update([
      'salary' => $request['salary'],
      'jop_description' => $request['jop_description'],
      'work_type' => $request['work_type'],
      'work_time' => $request['work_time'],
      'requirements' => $request['requirements'],
      'experience_years' => $request['experience_years'],
      'domain_id' => $domain['id'],
      'company_id' => $company['id'],
      'company_Name' => $company['company_name'],
      'location' => $request['location']
    ]);

    if ($update) {
      return response()->json([
        'message' => 'Post had beed edited Successfully.'
      ]);
    }

    return response()->json([
      'message' => 'Something went wrong..Please try again.'
    ]);
  }

  public function show_with_domain()
  {
    $user = Auth::user();
    if ($user['user_type'] == 2) {
      $employee = Employee::where('user_id', $user['id'])->first();
      $posts = post::where('domain_id', $employee['domain_id'])->latest()->get();
    } else {
      $company = Company::where('user_id', $user['id'])->first();
      // $companyID = $company[0]->id;
      // $company=Company::find($companyID);
      $posts = post::where('domain_id', $company['domain_id'])->latest()->get();
    }

    return response()->json([
      $posts
    ]);
  }

  public function show_company_post()
  {
    $user = Auth::user();

    $company = Company::where('user_id', $user['id'])->first();
    $post = post::where('company_id', $company['id'])->latest()->get();

    return response()->json([
      $post
    ]);
  }
  
  public function show_post_details(int $id)
  {
    $post = Post::query()->where('id', $id)->first();
    $domain = Domain::query()->where('id', $post['domain_id'])->select('domain')->first();
    $report = Report::query()->where('post_id', $id)->count();

    if (isset($post)) {
      return response()->json([
        'Post Details' => $post,
        'Domain' => $domain,
        'Posts Reports' => $report
      ]);
    }

    return response()->json([
      'message' => 'Something went wrong..Please try again'
    ]);
  }

  public function show_company_followed()
  {
    $user = Auth::user();
    $employee = Employee::where('user_id', $user['id'])->first();
    $company = $employee->company()->get();
    $company_count = $employee->company()->count();

    $companies = [];

    for ($i = 0; $i <= $company_count - 1; $i++) {

      $domain = Domain::query()->where('id', $company[$i]->domain_id)->select('domain')->first();
      $company[$i]->domain_name = $domain['domain'];
      $companies[$i] = $company[$i];
    }

    return response()->json([
      $companies
    ]);
  }

  public function show_all_company_details(int $companyID)
  {
    $user = Auth::user();
    $user_type = $user['user_type'];
    if($user_type == 2)
    $employee = Employee::where('user_id', $user['id'])->first();
    else if($user_type == 1)
    $com = Company::query()->where('user_id' , $user['id'])->first();
    $company = Company::find($companyID);
    $posts = post::where('company_id', $company['id'])->latest()->get();

    if(isset($employee)){
    $following = Company_employee::query()->where('employee_id',$employee['id'])
    ->where('company_id',$companyID)->first();

    if($following){
      $status = 'followed';
    }
    else{
      $status = 'unfollowed';
    }
    }
  $domain = Domain::query()->where('id', $company['domain_id'])->select('domain')->first();

  if($user_type == 2){
    return response()->json([
      $company,
      $status,
      $posts,
      $domain
    ]);
  }
  else {
    return response()->json([
      $company,
      $posts,
      $domain
    ]);
  }
  }

  public function delete_post($postID)
  {
    $user = Auth::user();

    if ($user['user_type'] == 2) {
      return response()->json([
        'message' => 'You can not delete post.'
      ]);
    }

    $company = Company::query()->where('user_id', $user['id'])->first();
    $post = Post::query()->where('id', $postID)->where('company_id', $company['id'])->first();
    $i = 0;
    if (isset($post)) {
      $delete = $post->delete();
      $i = 1;
    }

    if ($i == 1) {
      return response()->json([
        'message' => 'Post had been deleted Succeffuly.'
      ]);
    }

    return response()->json([
      'message' => 'Something went wrong..PLease try again.'
    ]);
  }

}
