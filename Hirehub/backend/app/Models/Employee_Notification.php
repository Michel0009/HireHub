<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employee_Notification extends Model
{
    use HasFactory;

    protected $table = 'employee_notification';
    protected $fillable = ['employee_id','notification_id','message_status'];
}
