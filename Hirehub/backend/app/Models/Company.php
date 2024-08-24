<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    use HasFactory;

    protected $fillable = ['company_Name','country','phone_number',
    'description','user_id','domain_id'];

    public function domain()
    {
        return $this->belongsTo(Domain::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function employee()
    {
        return $this->belongsToMany(Employee::class);
    }

    public function notification()
    {
        return $this->hasMany(Notification::class);
    }

    public function post()
    {
        return $this->hasMany(Post::class);
    }
    

}
