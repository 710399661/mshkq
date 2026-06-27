<?php

namespace App\Repositories;

use App\Models\Wallet;
use App\Models\WalletLog;
use Illuminate\Support\Facades\DB;

class WalletRepository extends BaseRepository
{
    public function __construct(Wallet $model)
    {
        parent::__construct($model);
    }

    public function getByUserId(int $userId)
    {
        return $this->model->where('user_id', $userId)->first();
    }

    public function getOrCreate(int $userId)
    {
        return $this->model->firstOrCreate(
            ['user_id' => $userId],
            [
                'balance' => 0,
                'frozen_balance' => 0,
                'total_income' => 0,
                'total_expense' => 0,
            ]
        );
    }

    public function getLogs(int $userId, int $perPage = 20)
    {
        return WalletLog::where('user_id', $userId)
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);
    }

    public function incrementBalance(int $userId, float $amount, string $description = '', string $relatedType = null, int $relatedId = null)
    {
        return DB::transaction(function () use ($userId, $amount, $description, $relatedType, $relatedId) {
            $wallet = $this->getOrCreate($userId);
            $wallet->increment('balance', $amount);
            $wallet->increment('total_income', $amount);
            $wallet->refresh();

            WalletLog::create([
                'user_id' => $userId,
                'type' => 'income',
                'amount' => $amount,
                'balance_after' => $wallet->balance,
                'description' => $description,
                'related_type' => $relatedType,
                'related_id' => $relatedId,
            ]);

            return $wallet;
        });
    }

    public function decrementBalance(int $userId, float $amount, string $description = '', string $relatedType = null, int $relatedId = null)
    {
        return DB::transaction(function () use ($userId, $amount, $description, $relatedType, $relatedId) {
            $wallet = $this->getOrCreate($userId);

            if ($wallet->balance < $amount) {
                return false;
            }

            $wallet->decrement('balance', $amount);
            $wallet->increment('total_expense', $amount);
            $wallet->refresh();

            WalletLog::create([
                'user_id' => $userId,
                'type' => 'expense',
                'amount' => $amount,
                'balance_after' => $wallet->balance,
                'description' => $description,
                'related_type' => $relatedType,
                'related_id' => $relatedId,
            ]);

            return $wallet;
        });
    }

    public function freeze(int $userId, float $amount, string $description = '', string $relatedType = null, int $relatedId = null)
    {
        return DB::transaction(function () use ($userId, $amount, $description, $relatedType, $relatedId) {
            $wallet = $this->getOrCreate($userId);

            if ($wallet->balance < $amount) {
                return false;
            }

            $wallet->decrement('balance', $amount);
            $wallet->increment('frozen_balance', $amount);
            $wallet->refresh();

            WalletLog::create([
                'user_id' => $userId,
                'type' => 'freeze',
                'amount' => $amount,
                'balance_after' => $wallet->balance,
                'description' => $description,
                'related_type' => $relatedType,
                'related_id' => $relatedId,
            ]);

            return $wallet;
        });
    }

    public function unfreeze(int $userId, float $amount, string $description = '', string $relatedType = null, int $relatedId = null)
    {
        return DB::transaction(function () use ($userId, $amount, $description, $relatedType, $relatedId) {
            $wallet = $this->getOrCreate($userId);

            if ($wallet->frozen_balance < $amount) {
                return false;
            }

            $wallet->increment('balance', $amount);
            $wallet->decrement('frozen_balance', $amount);
            $wallet->refresh();

            WalletLog::create([
                'user_id' => $userId,
                'type' => 'unfreeze',
                'amount' => $amount,
                'balance_after' => $wallet->balance,
                'description' => $description,
                'related_type' => $relatedType,
                'related_id' => $relatedId,
            ]);

            return $wallet;
        });
    }
}
