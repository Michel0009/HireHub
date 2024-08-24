<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\CV;
use App\Models\Domain;
use App\Models\Employee;
use App\Models\User;
use App\Models\Wallet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;


class AuthController extends Controller
{

  public function User_Register(Request $request): \Illuminate\Http\JsonResponse
  {
    $request->validate([
      'username' => 'required|unique:users',
      'email' => 'required|email|unique:users',
      'password' => 'required|min:8',
      'user_type' => 'required',
    ]);
    $code = rand(111111, 999999);

    $user = User::query()->create([
      'username' => $request['username'],
      'email' => $request['email'],
      'password' => $request['password'],
      'user_type' => $request['user_type'],
      'verification_code' => $code
    ]);

    $user['token'] = $user->createToken('AccessToken')->plainTextToken;

    if ($user['user_type'] == 1) {
      $wallet = Wallet::query()->create([
        'account_number' => 0,
        'user_id' => $user['id']
      ]);
    }

    $emailBody = "Hello {$user->username}!
    \n\nWelcome to HireHub! There is just one more step befor you reach the site.
    \nverify your email address by this verification code:
    \n\n                     {$code} 
    \n\nThank you for registering at our site.\n\nBest regards.";

    Mail::raw($emailBody, function ($message) use ($user) {
        $message->to($user->email)
                ->subject('Hire Hub - email verification');
    });

    return response()->json([
      'message' => 'User Created Successfully',
      'token' => $user['token']
    ]);
  }

  public function resend_email(string $username)
  {
    $user = User::query()->where('username', $username)->first();
    $emailBody = "Hello {$user->username}!
    \n\nWelcome to HureHub! There is just one more step befor you reach the site.
    \nverify your email address by this verification code:
    \n\n                     {$user->verification_code} 
    \n\nThank you for registering at our site.\n\nBest regards.";

    Mail::raw($emailBody, function ($message) use ($user) {
        $message->to($user->email)
                ->subject('HIRE HUB - email verification');
    });

    return response()->json([
      'message' => 'We have sent the code to your email address'
    ]);
  }

  public function verification(Request $request, string $username)
  {
    $user = User::query()->where('username', $username)->first();
    $request->validate([
      'verification_code' => 'required|min:6|max:6',
    ]);
    if($request['verification_code'] == $user['verification_code']){
      return response()->json([
        'message' => 'your email has been verified successfully'
      ]);
    }
    return response()->json([
      'message' => 'the code is wrong, pleaze try again'
    ]);
  }

  public function create_company(Request $request, string $username)
  {

    $user = User::query()->where('username', $username)->first();
    if ($user['user_type'] == 2) {
      return response()->json([
        'something went wrong'
      ]);
    }

    $id = $user['id'];
    $com = Company::query()->where('user_id', $id)->first();
    if ($com) {
      return response()->json([
        'You already have a company.'
      ]);
    }

    $request->validate([
      'company_Name' => 'required',
      'country' => 'required',
      'phone_number' => 'required|numeric',
      'description' => 'required',
      'domain' => 'required',
      'account_number' => 'required'
    ]);

    $domain = Domain::query()->where('domain', $request['domain'])->first();
    $company = Company::query()->create([
      'company_Name' => $request['company_Name'],
      'country' => $request['country'],
      'phone_number' => $request['phone_number'],
      'description' => $request['description'],
      'user_id' => $user['id'],
      'domain_id' => $domain['id']
    ]);

    $wallet = Wallet::query()->where('user_id',$id)->update([
      'account_number' => $request['account_number']
    ]);

    return response()->json([
      'message' => 'Company has created Succefully.',
      'data' => $company,
    ]);
  }

  public function create_employee(Request $request, string $username)
  {

    $user = User::query()->where('username', $username)->first();
    if ($user['user_type'] == 1) {
      return response()->json([
        'some thing went wrong'
      ]);
    }

    $id = $user['id'];
    $emp = Employee::query()->where('user_id', $id)->first();
    if ($emp) {
      return response()->json([
        'You already have an account.'
      ]);
    }

    $request->validate([
      'first_name' => 'required',
      'last_name' => 'required',
      'phone_number' => 'required|numeric',
      'country' => 'required',
      'domain' => 'required',
      'date' => 'required|date'
    ]);

    $domain = Domain::query()->where('domain', $request['domain'])->first();
    $employee = Employee::query()->create([
      'first_name' => $request['first_name'],
      'last_name' => $request['last_name'],
      'phone_number' => $request['phone_number'],
      'country' => $request['country'],
      'date' => $request['date'],
      'user_id' => $user['id'],
      'domain_id' => $domain['id']
    ]);

    return response()->json([
      'message' => 'Employee has created Succefully.',
      'data' => $employee,
    ]);
  }

  public function login(Request $request)
  {

    $request->validate([
      'login_type' => 'required',
      'password' => 'required'
    ]);

    $user = User::query()->where('email', $request['login_type'])
      ->orWhere('username', $request['login_type'])->first();

    if ($user) {
      if ($user['password'] == $request['password']) {
        if ($user['reporting_state'] == true) {
          return response()->json([
            'message' => 'You are panned from using this web application.'
          ]);
        }
        if(!($user['user_type'] == 3)){
        $employee = Employee::where('user_id', $user['id'])->first();
        $company = Company::where('user_id', $user['id'])->first();
        if (!isset($employee) && !isset($company)) {
          return response()->json([
            'massage' => 'you have not complete your register before .. you can not reach this account',
          ]);
        }
      }


        $user['token'] = $user->createToken('AccessToken')->plainTextToken;
        return response()->json([
          'message' => 'Welcome',
          'token' => $user['token'],
          'user type' => $user['user_type'],
          'user name' => $user['username']
        ]);
      } else {
        return response()->json([
          'Your Password is incorrect..Please try again'
        ]);
      }
    }
    return response()->json([
      'Email or Username does not match with Password..Please try again'
    ]);
  }

  public function logout()
  {
    Auth::user()->currentAccessToken()->delete();
    return response()->json([
      'message' => 'You logged out successfully'
    ]);
  }

  public function create_cv(Request $request)
  {
    $employee = Auth::user();
    $domain = Domain::query()->where('domain', $request['domain'])->first();
    $request->validate([
      'first_name' => 'required',
      'last_name' => 'required',
      'email' => 'required|unique:users',
      'phone_number' => 'required|unique:employees|unique:companies',
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
      'employee_id' => $employee['id']
    ]);

    if (isset($cv)) {
      return response()->json([
        'massage' => 'Your CV has been created successfully'
      ]);
    } else {
      return response()->json([
        'massage' => 'Something went wrong !'
      ]);
    }
  }
  
}
