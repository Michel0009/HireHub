<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $fillable = ['work_time','work_type','requirements',
    'jop_description','salary','experience_years','company_Name','location','company_id','domain_id'];

    public function company(){
        return $this->belongsTo(Company::class);
    }
    
    public function domain(){
        return $this->belongsTo(Domain::class);
    }

    // public function notification(){
    //     return $this->hasMany(Notification::class);
    // }

    public function employee(){
        return $this->belongsToMany(Employee::class);
    }

    
}
