<?php

namespace App\Http\Controllers;

use App\Models\Application;
use App\Models\Company;
use App\Models\Company_employee;
use App\Models\CV;
use App\Models\Employee;
use App\Models\Employee_Notification;
use App\Models\Favourite;
use App\Models\Notification;
use App\Models\Post;
use App\Models\Report;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class Task_2_Controller extends Controller
{

  public function save_post(int $postID)
  {
    $user = Auth::user();
    if ($user['user_type'] == 1) {
      return response()->json([
        'You are not allowed to add post to favourite list'
      ]);
    } else {

      $employee = Employee::where('user_id', $user['id'])->get();
      $employeeID = $employee[0]->id;
      $employee = Employee::find($employeeID);

      $employee = Employee::where('id', $employee['id'])->first();
      $post = Post::query()->where('id', $postID)->first();

      $isfavourite = Favourite::query()->where('employee_id', $employee['id'])
        ->where('post_id', $postID)->first();

      if (isset($isfavourite)) {
        return response()->json([
          'massage' => 'you have added this post before',
        ]);
      }

      $favourite = Favourite::query()->create([
        'post_id' => $post['id'],
        'employee_id' => $employee['id'],
      ]);

      if ($favourite) {
        return response()->json([
          'massage' => 'you have added this post successffully',
        ]);
      } else {
        return response()->json([
          'massage' => 'you have not added this post successffully',
        ]);
      }
    }
  }

  public function un_favourite($postID)
  {
    $user = Auth::user();

    if ($user['user_type'] == 1) {
      return response()->json([
        'You can not do this operation.'
      ]);
    }
  
    $employee = Employee::where('user_id', $user['id'])->first();
    $unfavourite = Favourite::query()->where('employee_id', $employee['id'])
      ->where('post_id', $postID)->delete();

    if ($unfavourite) {
      return response()->json([
        'You have deleted this post from your favourite list.'
      ]);
    }

    return response()->json([
      'Something went wrong..Please try again.'
    ]);
  }

  public function show_favourite()
  {
    $user = Auth::user();
    $employee = Employee::where('user_id', $user['id'])->first();
    $favourites = Favourite::where('employee_id', $employee['id'])->select('post_id')->get();
    $count = Favourite::where('employee_id', $employee['id'])->count();

    $s = [];

    for ($i = 0; $i <= $count - 1; $i++) {
      $post = Post::where('id', $favourites[$i]->post_id)->first();
      $s[$i] = $post;
    }

    return response()->json([
      $s
    ]);
  }

  public function submit($postID)
  {
    $user = Auth::user();
    if ($user['user_type'] == 1) {
      return response()->json([
        'You can not applicate to this job.'
      ]);
    } else {

      $employee = Employee::where('user_id', $user['id'])->first();

      $cv = CV::where('employee_id', $employee['id'])->first();
      if (!isset($cv)) {
        return response()->json([
          'massage' => 'you do not have cv.. please create one and try again',
        ]);
      }

      $post = Post::query()->where('id', $postID)->first();
      

      $issubmitted = Application::query()->where('employee_id', $employee['id'])
        ->where('post_id', $postID)->first();

      if (isset($issubmitted)) {
        return response()->json([
          'massage' => 'you have submitted this jop before',
        ]);
      }

      $submit = Application::query()->create([
        'post_id' => $post['id'],
        'employee_id' => $employee['id'],
      ]);

      $applyNotification = Notification::query()->create([
        'company_id' => $post['company_id'],
        'post_id' => $post['id'],
        'message' => $employee['first_name']." has applied on one of your posts",
        'message_type' => 'company'
      ]);

      if ($submit) {
        return response()->json([
          'massage' => 'you have submitted this jop',
        ]);
      } else {
        return response()->json([
          'massage' => 'Something went wrong',
        ]);
      }
    }
  }

  public function show_submitter($postID)
  {
    $application = Application::query()->where('post_id', $postID)->get();
    $count = Application::query()->where('post_id', $postID)->count();

    $s = [];
    for ($i = 0; $i < $count; $i++) {
      $employee = Employee::query()->where('id', $application[$i]->employee_id)->first();
      $s[$i] = $employee;
    }

    return response()->json([
      $s
    ]);
  }

  public function show_submitter_cv($employeeID)
  {

    $employee = Employee::query()->where('id', $employeeID)->first();

    $cv = CV::query()->where('employee_id', $employee['id'])->first();

    if (isset($cv)) {
      return response()->json([
        $cv
      ]);
    }
  }

  public function report($postID)
  {
    $user = Auth::user();
    if ($user['user_type'] == 1) {
      return response()->json([
        'You can not reporst this job.'
      ]);
    } else {

      $employee = Employee::where('user_id', $user['id'])->first();
      $post = Post::query()->where('id', $postID)->first();

      $st = Report::query()->where('post_id', $postID)->where('employee_id', $employee['id'])->first();

      if (isset($st)) {
        return response()->json([
          'massage' => 'you have reported this post before',
        ]);
      }

      $report = Report::query()->create([
        'post_id' => $post['id'],
        'employee_id' => $employee['id'],
      ]);

      if ($report) {
        return response()->json([
          'massage' => 'you reported this post',
        ]);
      } else {
        return response()->json([
          'massage' => 'Something went wrong',
        ]);
      }
    }
  }

  
  public function notifications()
  {
    $user = Auth::user();
    if ($user['user_type'] == 2) {
      $employee = Employee::where('user_id', $user['id'])->first();
      $EmpNotification = Employee_Notification::where('employee_id', $employee['id'])->latest()->get();
      $count = Employee_Notification::where('employee_id', $employee['id'])->count();

      $update = Employee_Notification::query()->where('employee_id', $employee['id'])
      ->update([
        'message_status' => true
      ]);
      $s=[];
    for ($i = 0; $i < $count; $i++) {
      $notification = Notification::query()
      ->where('id', $EmpNotification[$i]->notification_id)->first();
      $s[$i] = $notification;
    }

    } else {
      $company = Company::where('user_id', $user['id'])->first();
      $s = Notification::where('company_id', $company['id'])
      ->where('message_type','company')->latest()->get();
      $count = Notification::where('company_id', $company['id'])
      ->where('message_type','company')->count();
      $update = Notification::where('company_id', $company['id'])
      ->where('message_type','company')->update([
        'message_status' => true
      ]);
    }

    return response()->json([
      $s,
      'count' => $count
    ]);
  }

  public function new_notifications()
  {
    $user = Auth::user();
    if ($user['user_type'] == 2) {
      $employee = Employee::where('user_id', $user['id'])->first();
      $count = Employee_Notification::where('employee_id', $employee['id'])->
      where('message_status', false)->count();

    } else {
      $company = Company::where('user_id', $user['id'])->first();
      $count = Notification::where('company_id', $company['id'])
      ->where('message_type','company')->where('message_status', false)->count();
    }
    return response()->json([
      'count' => $count
    ]);

  }

}
