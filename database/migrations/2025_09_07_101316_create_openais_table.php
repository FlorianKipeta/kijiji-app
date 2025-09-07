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
        Schema::create('openais', function (Blueprint $table) {
            $table->id();
            $table->string('model');
            $table->longText('instructions');
            $table->string('vector_store');
            $table->integer('temperature')->default(0);
            $table->integer('max_tokens')->default(25);
            $table->text('key');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('openais');
    }
};
