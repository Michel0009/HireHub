<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    use HasFactory;

    protected $fillable = ['message','company_id','post_id','message_type','message_status'];

    public function company(){
        return $this->belongsTo(Company::class);
    }

    public function employee(){
        return $this->belongsToMany(Employee::class);
    }

    // public function post(){
    //     return $this->belongsTo(Post::class);
    // }
}
