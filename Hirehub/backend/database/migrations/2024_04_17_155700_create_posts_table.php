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
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->enum('work_time',['Full time','Part time']);
            $table->enum('work_type',['Remotly','On site']);
            $table->text('requirements');
            $table->longText('jop_description');
            $table->integer('salary');
            $table->integer('experience_years');
            $table->string('company_name');
            $table->string('location');
            $table->foreignId('company_id')
            ->constrained('companies')
            ->cascadeOnDelete()
            ->cascadeOnUpdate();
            $table->foreignId('domain_id')
            ->constrained('domains')
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
        Schema::dropIfExists('posts');
    }
};
