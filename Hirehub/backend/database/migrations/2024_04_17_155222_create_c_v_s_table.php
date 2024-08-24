<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('c_v_s', function (Blueprint $table) {
            $table->id();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('email');
            $table->integer('phone_number');
            $table->string('country');
            $table->date('date');
            $table->string('domain');
            $table->longText('skills');
            $table->longText('experience');
            $table->enum('education',
            ['high school','college','master','null of them']);
            $table->string('language');
            $table->longText('license');
            $table->longText('description');
            $table->foreignId('employee_id')
            ->constrained('employees')
            ->cascadeOnDelete()
            ->cascadeOnUpdate();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('c_v_s');
    }
};
