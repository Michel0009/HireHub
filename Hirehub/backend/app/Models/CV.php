<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CV extends Model
{
    use HasFactory;

    protected $table = 'c_v_s';
    protected $fillable = ['first_name','last_name','email',
    'phone_number','country','date','domain','skills','experience',
    'education','language','license','description','employee_id'];

    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }
}
