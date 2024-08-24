<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\Company_employee;
use App\Models\CV;
use App\Models\Domain;
use App\Models\Employee;
use App\Models\Notification;
use App\Models\Post;
use App\Models\Report;
use App\Models\Wallet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
  public function create_cv(Request $request)
  {
    $user = Auth::user();
    $employee = Employee::query()->where('user_id',$user['id'])->first();

    $existcv = CV::query()->where('employee_id', $employee['id'])->first();
    if (isset($existcv)) {
      return response()->json([
        'massage' => 'You have a cv .. you can not create a new one'
      ]);
    }

    $domain = Domain::query()->where('domain',$request['domain'])->first();
    $request -> validate([
      'first_name' => 'required',
      'last_name' => 'required',
      'email' => 'required',
      'phone_number' => 'required',
      'country' => 'required',
      'date' => 'required|date',
      'domain' => 'required',
      'skills' => 'required',
      'experience' => 'required',
      'education' => 'required',
      'language' => 'required',
      'license' => 'required',
      'description' => 'required',
    ]);

    $cv = CV::query()->create([
      'first_name' => $request['first_name'],
      'last_name' => $request['last_name'],
      'email' => $request['email'],
      'phone_number' => $request['phone_number'],
      'country' => $request['country'],
      'date' => $request['date'],
      'domain' => $request['domain'],
      'skills' => $request['skills'],
      'experience' => $request['experience'],
      'education' => $request['education'],
      'language' => $request['language'],
      'license' => $request['license'],
      'description' => $request['description'],
      'employee_id' =>$employee['id'],
    ]);

    if(isset($cv)) {
      return response()->json([
          'massage' => 'Your CV has been created successfully'
      ]);
    } else {
      return response()->json([
          'massage' => 'Something went wrong !'
      ]);
      }
  }

  public function show_cv()
  {
    $user = Auth::user();
    $employee = Employee::query()->where('user_id',$user['id'])->first();

    $cv = CV::query()->where('employee_id',$employee['id'])->first();

    if(isset($cv)){
      return response()->json([
        $cv
      ]);
    }

  }

  public function edit_cv(Request $request)
  {
    $user = Auth::user();
    $employee = Employee::query()->where('user_id',$user['id'])->first();

    $request -> validate([
      'first_name' => 'required',
      'last_name' => 'required',
      'email' => 'required',
      'phone_number' => 'required',
      'country' => 'required',
      'date' => 'required|date',
      'domain' => 'required',
      'skills' => 'required',
      'experience' => 'required',
      'education' => 'required',
      'language' => 'required',
      'license' => 'required',
      'description' => 'required',
    ]);

    $cv = CV::query()->where('employee_id',$employee['id'])->first();

    $update = CV::query()->where('id',$cv['id'])->update([
        'first_name' => $request['first_name'],
        'last_name' => $request['last_name'],
        'email' => $request['email'],
        'phone_number' => $request['phone_number'],
        'country' => $request['country'],
        'date' => $request['date'],
        'domain' => $request['domain'],
        'skills' => $request['skills'],
        'experience' => $request['experience'],
        'education' => $request['education'],
        'language' => $request['language'],
        'license' => $request['license'],
        'description' => $request['description'],
        'employee_id' =>$employee['id']
    ]);

    if(isset($update)){
        return response()->json([
          'message' => 'Your CV updated Succefully'
      ]);
    }

    else{
      return response()->json([
        'message' => 'Something went wrong..Please try again'
      ]);
    }
  }

  public function show_profile()
  {
    $user = Auth::user();

    if($user['user_type'] == 1){
      $company = Company::query()->where('user_id',$user['id'])->first();
      $wallet = Wallet::query()->where('user_id',$user['id'])->first();
      $Postcount = Post::query()->where('company_id',$company['id'])->count();
      $followers = Company_employee::query()->where('company_id',$company['id'])->count();

      return response()->json([
        'Company Information' => $company,
        'Wallet Information' => $wallet,
        'Companys Posts Number' => $Postcount,
        'Followers Number' => $followers
      ]);
    }
    elseif($user['user_type'] == 2){
      $employee = Employee::query()->where('user_id',$user['id'])->first();
      return response()->json([
        $employee
      ]);
    }

    return response()->json([
      'message' => 'Something went wrong..Please try again'
    ]);
  }

  public function edit_profile(Request $request)
  {
    $user = Auth::user();

    //Company
    if($user['user_type'] == 1){
      $request->validate([
        'company_Name' => 'required',
        'country' => 'required',
        'phone_number' => 'required|numeric',
        'description' => 'required',
        'domain' => 'required',
        'account_number' => 'required'
      ]);

      $domain = Domain::query()->where('domain', $request['domain'])->first();
      $company = Company::query()->where('user_id',$user['id'])->first();
      $update = Company::query()->where('id',$company['id'])->update([
        'company_Name' => $request['company_Name'],
        'country' => $request['country'],
        'phone_number' => $request['phone_number'],
        'description' => $request['description'],
        'user_id' => $user['id'],
        'domain_id' => $domain['id']
      ]);

      $update2 = Wallet::query()->where('user_id',$user['id'])->update([
        'account_number' => $request['account_number']
      ]);

      if(isset($update) && isset($update2))
      return response()->json([
        'message' => 'Your Profile Updated Succeffully.'
      ]);

      return response()->json([
        'message' => 'Something went wrong..Please Try again'
      ]);
    }
    //Employee
    elseif($user['user_type'] == 2){
      $request->validate([
        'first_name' => 'required',
        'last_name' => 'required',
        'phone_number' => 'required|numeric',
        'country' => 'required',
        'domain' => 'required',
        'date' => 'required|date'
      ]);

      $domain = Domain::query()->where('domain', $request['domain'])->first();
      $employee = Employee::query()->where('user_id',$user['id'])->first();
      $update = Employee::query()->where('id',$employee['id'])->update([
        'first_name' => $request['first_name'],
        'last_name' => $request['last_name'],
        'phone_number' => $request['phone_number'],
        'country' => $request['country'],
        'date' => $request['date'],
        'user_id' => $user['id'],
        'domain_id' => $domain['id']
      ]);

      if(isset($update))
      return response()->json([
        'message' => 'Your Profile Updated Succeffully.'
      ]);

      return response()->json([
        'message' => 'Something went wrong..Please Try again'
      ]);
    }

    return response()->json([
      'message' => 'Something went wrong..Please Try again'
    ]);
  }

  public function search(Request $request)
  {

    $domain = Domain::query()->where('domain', $request['domain'])->first();
    $country = Post::query()->where('location', $request['country'])->select('location')->first();


    if (isset($domain)) {
      if (isset($country)) {
        $post = Post::query()->where('domain_id', $domain['id'])
        ->where('location', $country['location'])->latest()->get();
      } else {
        $post = Post::query()->where('domain_id', $domain['id'])->latest()->get();
      }

      if (isset($post))
        return response()->json([
          $post
        ]);

      return response()->json([
        'message' => 'No Result'
      ]);
    }
    if (isset($country)) {
    $post = Post::query()->where('location', $country['location'])->latest()->get();
    }
    if (isset($post))
      return response()->json([
        $post
      ]);

    return response()->json([
      'message' => 'No Result'
    ]);
  }

  public function add_to_wallet(Request $request)
  {

    $request->validate([
      'account' => 'required',
      'account_number' => 'required'
    ]);

    $user = Auth::user();
    $wallet = Wallet::query()->where('user_id', $user['id'])->first();

    if ($wallet['account_number'] == $request['account_number']) {
      $update = Wallet::query()->where('user_id', $user['id'])->update([
        'account' => $wallet['account'] + $request['account']
      ]);

      if ($update) {
        return response()->json([
          'message' => 'Success'
        ]);
      }

      return response()->json([
        'message' => 'Something went wrong..please try again'
      ]);
    }

    return response()->json([
      'message' => 'Your account number is uncorrect..Please try again'
    ]);
  }

  public function follow(int $companyID)
  {
    $user = Auth::user();
      if($user['user_type'] == 1){
        return response()->json([
          'You are not allowed to follow company'
        ]);
      }
      else{

        $employee = Employee::where('user_id',$user['id'])->get();
        $employeeID = $employee[0]->id;
        $employee=Employee::find($employeeID);

            $company = Company::query()->where('id',$companyID)->get();
            $follow=Employee::where('id',$employee['id'])->get();

            //un follow
            $following = Company_employee::query()->where('employee_id',$employee['id'])
            ->where('company_id',$company[0]['id'])->first();

            if($following){

              $employee = Employee::query()->where('user_id', $user['id'])->first();
              $unfollow = Company_employee::query()->where('employee_id', $employee['id'])
              ->where('company_id', $companyID)->delete();

             if ($unfollow) {
             return response()->json([
             'massage' => 'you have unfollowed the company successffully.',
             ]);
             }

            return response()->json([
            'massage' => 'Something went wrong..Please try again.',
            ]);
            }


            //follow
            $follow->each->attach($company);

            $followNotification = Notification::query()->create([
              'company_id' => $companyID,
              'post_id' => 0,
              'message' => $employee['first_name']." has followed your company recently",
              'message_type' => 'company'
            ]);


            if($follow){
                return response()->json([
                    'massage'=>'you have followed the company successffully',
                ]);
            }
            else{
                return response()->json([
                    'massage'=>'you have not followed the company successffully',
                ]);
            }
        }
  }

}
