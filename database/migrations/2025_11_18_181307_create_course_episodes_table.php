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
        Schema::create('course_episodes', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->integer('duration')->nullable(); // in seconds
            $table->enum('type', ['video', 'pdf']);
            $table->string('file_path');
            $table->foreignId('course_season_id')->constrained()->cascadeOnUpdate()->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('course_episodes');
    }
};
