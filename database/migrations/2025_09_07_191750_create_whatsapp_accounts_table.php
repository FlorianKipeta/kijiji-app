<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('whatsapp_accounts', function (Blueprint $table) {
            $table->id();
            $table->string('app_id')->unique();
            $table->string('phone_number_id')->unique();
            $table->string('business_account_id')->unique();
            $table->string('address')->nullable();
            $table->string('description')->nullable();
            $table->string('vertical')->nullable();
            $table->string('about')->nullable();
            $table->string('email')->nullable();
            $table->string('access_token', 255)->unique();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('whatsapp_accounts');
    }
};
