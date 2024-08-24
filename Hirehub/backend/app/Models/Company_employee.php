<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Company_employee extends Model
{
    use HasFactory;

    protected $table = 'company_employee';

    protected $fillable = ['employee_id','company_id'];
}
