<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Domain extends Model
{
    use HasFactory;

    protected $fillable = ['domain'];

    public function company()
    {
        return $this->hasMany(Company::class);
    }

    public function employee()
    {
        return $this->hasMany(Employee::class);
    }

    public function post(){
        return $this->hasMany(Post::class);
    }

}
