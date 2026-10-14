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
        Schema::create('order_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained()->cascadeOnUpdate()->noActionOnDelete();
            $table->unsignedBigInteger('status_changed_by_user_id');
            $table->foreign('status_changed_by_user_id')->references('id')->on('users')->cascadeOnUpdate()->noActionOnDelete();
            $table->enum('from_status', ['waiting', 'pending', 'sending', 'completed', 'canceled']);
            $table->enum('to_status', ['waiting', 'pending', 'sending', 'completed', 'canceled']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_logs');
    }
};
