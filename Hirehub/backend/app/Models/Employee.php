<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    use HasFactory;

    protected $fillable = ['first_name','last_name','phone_number',
    'country','user_id','domain_id','date'];

    public function domain()
    {
        return $this->belongsTo(Domain::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function company()
    {
        return $this->belongsToMany(Company::class);
    }

    public function cv()
    {
        return $this->hasOne(CV::class);
    }

    public function notification()
    {
        return $this->belongsToMany(Notification::class);
    }

    public function post()
    {
        return $this->belongsToMany(Post::class);
    }

    public function attach($company){
        $this->company()->attach($company);
    }

    public function get(){
        return $this->company()->get();
    }

    public function get2(){
        return $this->notification()->get();
    }

}
